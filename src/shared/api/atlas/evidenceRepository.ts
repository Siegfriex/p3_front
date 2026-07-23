import type { EvidenceSummaryTransport, FrontendManifestTransport } from '@/shared/api/atlas/atlasTransportSchema';
import type { EvidenceSummaryViewModel } from '@/shared/types/atlas';

export interface EvidenceRepository {
  getSummary(evidenceId: string): EvidenceSummaryViewModel | null;
  getDetail(evidenceId: string, signal?: AbortSignal): Promise<unknown>;
}

function toSummary(record: EvidenceSummaryTransport): EvidenceSummaryViewModel {
  return {
    id: record.evidence_id,
    title: record.title,
    reportedStatus: record.reported_status,
    verificationStatus: record.verification_status,
    meetingId: record.meeting_id,
    pageStartNo: record.page_start_no,
    pageEndNo: record.page_end_no,
    pdfAssetId: record.pdf_asset_id,
    publicVisibility: true,
  };
}

export function createEvidenceRepository(
  manifest: FrontendManifestTransport,
  records: readonly EvidenceSummaryTransport[],
  baseUrl: string,
  fetchImpl: typeof fetch = fetch,
): EvidenceRepository {
  const summaries = new Map(records.map((record) => [record.evidence_id, toSummary(record)]));

  return {
    getSummary(evidenceId) {
      return summaries.get(evidenceId) ?? null;
    },
    async getDetail(evidenceId, signal) {
      if (!summaries.has(evidenceId)) throw new Error('Evidence is not approved for public access');
      if (manifest.evidence_detail_transport !== 'route-json') {
        throw new Error('Arrow evidence detail transport is not implemented in the contract shell');
      }
      const response = await fetchImpl(`${baseUrl}/evidence/${encodeURIComponent(evidenceId)}.json`, { signal });
      if (!response.ok) throw new Error(`Evidence detail returned HTTP ${response.status}`);
      return response.json();
    },
  };
}
