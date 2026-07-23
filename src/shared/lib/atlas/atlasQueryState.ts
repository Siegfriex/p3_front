import {
  ANSWER_TYPES,
  ATLAS_STATUSES,
  type AnswerType,
  type AtlasQueryState,
  type AtlasStatus,
} from '@/shared/types/atlas';

export const ATLAS_QUERY_KEYS = ['status', 'types', 'node', 'view'] as const;

export interface AtlasQueryParseResult {
  state: AtlasQueryState;
  issues: string[];
  canonicalSearch: string;
  wasNormalized: boolean;
}

const DEFAULT_STATE: AtlasQueryState = {
  status: 'all',
  types: [...ANSWER_TYPES],
  nodeId: null,
  view: 'nodes',
};

function isAtlasStatus(value: string): value is AtlasStatus {
  return (ATLAS_STATUSES as readonly string[]).includes(value);
}

function isAnswerType(value: string): value is AnswerType {
  return (ANSWER_TYPES as readonly string[]).includes(value);
}

function isNodeId(value: string): boolean {
  return /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(value);
}

function toSearchParams(input: URLSearchParams | string): URLSearchParams {
  if (input instanceof URLSearchParams) return new URLSearchParams(input);
  return new URLSearchParams(input.startsWith('?') ? input.slice(1) : input);
}

function sameTypes(left: readonly AnswerType[], right: readonly AnswerType[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function serializeAtlasQueryState(state: AtlasQueryState): string {
  const params = new URLSearchParams();
  const canonicalTypes = ANSWER_TYPES.filter((value) => state.types.includes(value));
  const isDefault = state.status === 'all'
    && sameTypes(canonicalTypes, ANSWER_TYPES)
    && state.nodeId === null
    && state.view === 'nodes';
  if (isDefault) return '';

  if (state.status !== 'all') params.set('status', state.status);
  if (!sameTypes(canonicalTypes, ANSWER_TYPES)) params.set('types', canonicalTypes.join(','));
  if (state.nodeId) params.set('node', state.nodeId);
  params.set('view', 'nodes');
  return params.toString();
}

export function parseAtlasQueryState(input: URLSearchParams | string): AtlasQueryParseResult {
  const source = toSearchParams(input);
  const issues: string[] = [];

  const rawStatus = source.get('status');
  const status = rawStatus === null || rawStatus === ''
    ? DEFAULT_STATE.status
    : isAtlasStatus(rawStatus)
      ? rawStatus
      : (issues.push(`invalid status: ${rawStatus}`), DEFAULT_STATE.status);

  const rawTypes = source.get('types');
  let types = [...ANSWER_TYPES];
  if (rawTypes !== null && rawTypes !== '') {
    const requested = new Set(rawTypes.split(',').filter(Boolean));
    const invalid = [...requested].filter((value) => !isAnswerType(value));
    invalid.forEach((value) => issues.push(`invalid answer type: ${value}`));
    const normalized = ANSWER_TYPES.filter((value) => requested.has(value));
    if (normalized.length > 0) types = normalized;
    else issues.push('types normalized to all because no valid answer type remained');
  }

  const rawNode = source.get('node');
  const nodeId = rawNode && isNodeId(rawNode)
    ? rawNode
    : (rawNode ? (issues.push(`invalid node: ${rawNode}`), null) : null);

  const rawView = source.get('view');
  if (rawView !== null && rawView !== 'nodes') issues.push(`invalid view: ${rawView}`);

  const state: AtlasQueryState = { status, types, nodeId, view: 'nodes' };
  const canonicalSearch = serializeAtlasQueryState(state);
  const atlasSource = new URLSearchParams();
  ATLAS_QUERY_KEYS.forEach((key) => {
    const value = source.get(key);
    if (value !== null) atlasSource.set(key, value);
  });

  return {
    state,
    issues,
    canonicalSearch,
    wasNormalized: atlasSource.toString() !== canonicalSearch,
  };
}

export function removeAtlasQueryParameters(input: URLSearchParams | string): string {
  const params = toSearchParams(input);
  ATLAS_QUERY_KEYS.forEach((key) => params.delete(key));
  return params.toString();
}

export function buildAtlasHrefFromPreview(
  status: AtlasStatus,
  types: readonly AnswerType[],
): string {
  const search = serializeAtlasQueryState({ status, types: [...types], nodeId: null, view: 'nodes' });
  return search ? `/atlas?${search}` : '/atlas';
}
