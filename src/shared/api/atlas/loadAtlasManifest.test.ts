import { describe, expect, it, vi } from 'vitest';

import { loadAtlasManifest } from './loadAtlasManifest';

describe('approved Atlas manifest resolution', () => {
  it('does not make a request when no approved release is configured', async () => {
    const fetchMock = vi.fn<typeof fetch>();
    await expect(loadAtlasManifest(null, fetchMock)).resolves.toEqual({
      status: 'unavailable',
      reason: 'NO_APPROVED_RELEASE_CONFIGURED',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('maps a missing configured manifest to DataUnavailable without fixture fallback', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response('', { status: 404 }));
    await expect(loadAtlasManifest('contract-release-001', fetchMock)).resolves.toEqual({
      status: 'unavailable',
      reason: 'APPROVED_MANIFEST_NOT_FOUND',
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
