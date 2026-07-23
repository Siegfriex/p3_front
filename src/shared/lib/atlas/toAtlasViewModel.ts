import type { AtlasTransportBundle } from '@/shared/api/atlas/loadAtlasBundle';
import { createEvidenceRepository } from '@/shared/api/atlas/evidenceRepository';
import { createAtlasEncoding } from '@/shared/config/atlas/atlasEncoding';
import type { ProjectionScale } from '@/shared/lib/atlas/scaleProjection';
import type {
  AtlasNodeViewModel,
  AtlasViewModelBundle,
  CentroidViewModel,
  EvidenceSummaryViewModel,
  TopicBinViewModel,
} from '@/shared/types/atlas';

export function toAtlasViewModel(
  bundle: AtlasTransportBundle,
  scale: ProjectionScale,
  baseUrl: string,
): AtlasViewModelBundle {
  const topicLabels = new Map(bundle.topicBins.map((bin) => [bin.topic_bin_id, bin.dominant_topic_label]));
  const evidenceRepository = createEvidenceRepository(bundle.manifest, bundle.evidence, baseUrl);

  const nodes: AtlasNodeViewModel[] = bundle.nodes.map((node) => {
    const confidence = node.mean_label_confidence ?? node.mean_qa_confidence;
    const evidence = node.representative_evidence_id
      ? evidenceRepository.getSummary(node.representative_evidence_id)
      : null;
    return {
      id: node.atlas_node_id,
      projectionId: node.projection_id,
      topicBinId: node.topic_bin_id,
      topicLabel: topicLabels.get(node.topic_bin_id) ?? null,
      status: node.status_canvas,
      answerType: node.answer_type_code,
      behaviorFamily: node.behavior_family,
      anchor: { x: node.anchor_x, y: node.anchor_y },
      display: { x: node.display_x, y: node.display_y },
      screen: scale.project({ x: node.display_x, y: node.display_y }),
      radiusPx: node.node_radius,
      normalizedMass: node.normalized_mass,
      answerCount: node.raw_answer_count,
      linkCount: node.raw_link_count,
      confidence,
      representativeEvidenceId: evidence?.id ?? null,
      isPublicEvidenceAvailable: evidence !== null,
      encoding: createAtlasEncoding(node.behavior_family, node.status_canvas, confidence),
    };
  });

  const topicBins: TopicBinViewModel[] = bundle.topicBins.map((bin) => ({
    id: bin.topic_bin_id,
    label: bin.dominant_topic_label,
    center: { x: bin.center_x, y: bin.center_y },
    memberCount: bin.member_count,
    representativeTargetIssueId: bin.representative_target_issue_id,
  }));

  const centroids: CentroidViewModel[] = bundle.centroids.map((centroid) => ({
    id: centroid.centroid_id,
    type: centroid.centroid_type,
    status: centroid.status_canvas,
    answerType: centroid.answer_type_code,
    position: { x: centroid.position_x, y: centroid.position_y },
    memberCount: centroid.member_count,
    medoidEntityId: centroid.medoid_entity_id,
  }));

  const evidence: EvidenceSummaryViewModel[] = bundle.evidence.map((record) => ({
    id: record.evidence_id,
    title: record.title,
    reportedStatus: record.reported_status,
    verificationStatus: record.verification_status,
    meetingId: record.meeting_id,
    pageStartNo: record.page_start_no,
    pageEndNo: record.page_end_no,
    pdfAssetId: record.pdf_asset_id,
    publicVisibility: true,
  }));

  return {
    releaseId: bundle.manifest.release_id,
    projectionId: bundle.manifest.projection_id,
    bounds: {
      xMin: bundle.projectionMeta.x_min,
      xMax: bundle.projectionMeta.x_max,
      yMin: bundle.projectionMeta.y_min,
      yMax: bundle.projectionMeta.y_max,
    },
    nodes,
    topicBins,
    centroids,
    evidence,
  };
}
