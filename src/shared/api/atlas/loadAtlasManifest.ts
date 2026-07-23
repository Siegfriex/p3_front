import {
  AtlasSchemaError,
  parseFrontendManifest,
  type FrontendManifestTransport,
} from '@/shared/api/atlas/atlasTransportSchema';

export type AtlasUnavailableReason =
  | 'NO_APPROVED_RELEASE_CONFIGURED'
  | 'APPROVED_MANIFEST_NOT_FOUND';

export type AtlasManifestLoadResult =
  | { status: 'ready'; manifest: FrontendManifestTransport; baseUrl: string }
  | { status: 'unavailable'; reason: AtlasUnavailableReason };

export class AtlasLoadError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'AtlasLoadError';
  }
}

function validReleaseId(value: string): boolean {
  return /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(value);
}

export function configuredAtlasReleaseId(): string | null {
  const releaseId = import.meta.env.VITE_ATLAS_RELEASE_ID?.trim();
  return releaseId && validReleaseId(releaseId) ? releaseId : null;
}

export async function loadAtlasManifest(
  releaseId = configuredAtlasReleaseId(),
  fetchImpl: typeof fetch = fetch,
  signal?: AbortSignal,
): Promise<AtlasManifestLoadResult> {
  if (!releaseId) return { status: 'unavailable', reason: 'NO_APPROVED_RELEASE_CONFIGURED' };
  if (!validReleaseId(releaseId)) throw new AtlasLoadError('Configured Atlas release ID is invalid');

  const baseUrl = `/data/releases/${encodeURIComponent(releaseId)}`;
  let response: Response;
  try {
    response = await fetchImpl(`${baseUrl}/frontend-manifest.json`, {
      signal,
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new AtlasLoadError('Approved Atlas manifest request failed', { cause: error });
  }

  if (response.status === 404) {
    return { status: 'unavailable', reason: 'APPROVED_MANIFEST_NOT_FOUND' };
  }
  if (!response.ok) {
    throw new AtlasLoadError(`Approved Atlas manifest returned HTTP ${response.status}`);
  }

  try {
    const manifest = parseFrontendManifest(await response.json());
    if (manifest.release_id !== releaseId) {
      throw new AtlasSchemaError('manifest.release_id does not match configured release');
    }
    return { status: 'ready', manifest, baseUrl };
  } catch (error) {
    if (error instanceof AtlasSchemaError) throw error;
    throw new AtlasLoadError('Approved Atlas manifest is not valid JSON', { cause: error });
  }
}
