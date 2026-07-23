import { useMemo, useState } from 'react';

import { ANSWER_TYPES, type AtlasQueryState, type AtlasViewModelBundle } from '@/shared/types/atlas';
import type { NodeFilterState } from '@/shared/config/atlas/atlasEncoding';
import { atlasNodeAccessibleName } from '@/shared/lib/atlas/atlasAccessibility';
import { AtlasEmptyState, AtlasProjectionNote } from '@/shared/ui/atlas';
import { AtlasControls } from './AtlasControls';
import { AtlasDomMirror } from './AtlasDomMirror';
import { AtlasInspector } from './AtlasInspector';
import { AtlasLegend } from './AtlasLegend';
import { AtlasScene } from './AtlasScene';

interface AtlasExplorerProps {
  bundle: AtlasViewModelBundle;
  query: AtlasQueryState;
  queryIssues: readonly string[];
  fixtureProvenance?: 'CONTRACT_FIXTURE';
  onQueryChange: (query: AtlasQueryState) => void;
}

export function AtlasExplorer({ bundle, query, queryIssues, fixtureProvenance, onQueryChange }: AtlasExplorerProps) {
  const [previewNodeId, setPreviewNodeId] = useState<string | null>(null);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const filteredNodes = useMemo(
    () => bundle.nodes.filter((node) => (query.status === 'all' || node.status === query.status) && query.types.includes(node.answerType)),
    [bundle.nodes, query.status, query.types],
  );
  const matchedNodeIds = useMemo(() => new Set(filteredNodes.map((node) => node.id)), [filteredNodes]);
  const nodeFilterStates = useMemo(
    () => new Map(bundle.nodes.map((node): [string, NodeFilterState] => [node.id, matchedNodeIds.has(node.id) ? 'matched' : 'excluded'])),
    [bundle.nodes, matchedNodeIds],
  );
  const selectedNode = query.nodeId ? bundle.nodes.find((node) => node.id === query.nodeId) ?? null : null;
  const previewNode = previewNodeId ? bundle.nodes.find((node) => node.id === previewNodeId) ?? null : null;
  const invalidNode = query.nodeId !== null && selectedNode === null;
  const inspectorNode = selectedNode ?? previewNode;
  const focusedNode = focusNodeId ? bundle.nodes.find((node) => node.id === focusNodeId) ?? null : null;
  const announce = invalidNode
    ? `존재하지 않는 node ${query.nodeId}`
    : selectedNode
      ? `${atlasNodeAccessibleName(selectedNode)} 선택됨`
      : focusedNode
        ? `${atlasNodeAccessibleName(focusedNode)} 포커스`
        : `${filteredNodes.length}개 node 표시`;

  const clearSelection = () => onQueryChange({ ...query, nodeId: null });
  const selectNode = (nodeId: string) => onQueryChange({ ...query, nodeId });
  const reset = () => onQueryChange({ status: 'all', types: [...ANSWER_TYPES], nodeId: null, view: 'nodes' });

  return (
    <div className="space-y-5" onKeyDown={(event) => { if (event.key === 'Escape' && query.nodeId) clearSelection(); }}>
      {fixtureProvenance ? (
        <p className="border border-[var(--status-active)] bg-[var(--color-behavior-amber-bg)] px-4 py-3 font-mono text-xs" data-testid="fixture-provenance">
          CONTRACT_FIXTURE / 개발·테스트 전용 / 실제 분석 결과가 아님
        </p>
      ) : null}
      {queryIssues.length > 0 ? (
        <div className="border border-[var(--status-active)] px-4 py-3 text-sm" role="status">잘못된 URL 값 {queryIssues.length}개를 안전한 기본값으로 해석했습니다.</div>
      ) : null}

      <section className="flex flex-col gap-3 border-y border-[var(--color-neutral-200)] py-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Atlas release 상태">
        <div>
          <p className="font-mono text-[11px] font-bold tracking-[0.1em] text-[var(--color-neutral-500)]">APPROVED RELEASE</p>
          <p className="mt-1 font-mono text-sm font-bold">{bundle.releaseId}</p>
        </div>
        <p className="inline-flex min-h-11 items-center border border-[var(--atlas-state-ready)] bg-[var(--color-behavior-blue-bg)] px-4 font-mono text-xs font-bold">
          aggregate nodes {bundle.nodes.length}개
        </p>
      </section>

      <AtlasControls
        status={query.status}
        types={query.types}
        onStatusChange={(status) => onQueryChange({ ...query, status, nodeId: null })}
        onTypesChange={(types) => onQueryChange({ ...query, types, nodeId: null })}
        onReset={reset}
      />
      <p className="sr-only" aria-live="polite" aria-atomic="true" data-testid="atlas-live-region">{announce}</p>

      {bundle.nodes.length === 0 ? (
        <AtlasEmptyState
          title="표시할 승인 node가 없습니다"
          description="manifest와 bundle은 유효하지만 공개 가능한 aggregate node가 0개입니다. 가짜 점을 대신 표시하지 않습니다."
        />
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
            <AtlasScene nodes={bundle.nodes} nodeFilterStates={nodeFilterStates} selectedNodeId={query.nodeId} previewNodeId={previewNodeId} focusNodeId={focusNodeId} onSelectNode={selectNode} onPreviewNode={setPreviewNodeId} />
            <AtlasInspector node={invalidNode ? null : inspectorNode} invalidNodeId={invalidNode ? query.nodeId : null} onClearInvalidNode={invalidNode ? clearSelection : undefined} />
          </div>
          {filteredNodes.length === 0 ? (
            <AtlasEmptyState
              title="조건에 맞는 node가 없습니다"
              description="선택한 처리 상태와 답변 유형의 교집합이 비어 있습니다. projection과 viewport는 유지됩니다."
              onReset={reset}
              testId="atlas-filter-empty-state"
            />
          ) : null}
        </>
      )}

      {filteredNodes.length > 0 ? <AtlasDomMirror nodes={filteredNodes} selectedNodeId={query.nodeId} onSelectNode={selectNode} onClearSelection={clearSelection} onPreviewNode={setPreviewNodeId} onFocusNode={setFocusNodeId} /> : null}
      <AtlasLegend />
      <AtlasProjectionNote />
    </div>
  );
}
