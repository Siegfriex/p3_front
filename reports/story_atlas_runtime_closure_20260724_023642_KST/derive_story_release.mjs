/* eslint-disable no-undef */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const frontendRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front';
const approvedRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_FINAL/data/90_exports/frontend/approved';
const reportRoot = path.join(frontendRoot, 'reports/story_atlas_runtime_closure_20260724_023642_KST');
const baseReleaseId = 'ATLAS_DG761_20260723_213011_KST_F7A35BC6';
const releaseId = 'ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264';
const generatedAt = '2026-07-24T02:40:00+09:00';
const baseDir = path.join(approvedRoot, baseReleaseId);
const canonicalDir = path.join(approvedRoot, releaseId);
const runtimeDir = path.join(frontendRoot, 'public/data/releases', releaseId);
const canonicalPointer = path.join(approvedRoot, 'current-release.json');
const runtimePointer = path.join(frontendRoot, 'public/data/current-release.json');

for (const target of [canonicalDir, runtimeDir, canonicalPointer, runtimePointer]) {
  if (fs.existsSync(target)) throw new Error(`Refusing to overwrite existing target: ${target}`);
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
const sha256Buffer = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');
const sha256File = (file) => sha256Buffer(fs.readFileSync(file));

const nodes = readJson(path.join(baseDir, 'atlas-nodes-all.json'));
const selected = [];
const selectedIds = new Set();
const selectedTopics = new Set();
const add = (node) => {
  if (node && !selectedIds.has(node.atlas_node_id)) {
    selected.push(node);
    selectedIds.add(node.atlas_node_id);
    selectedTopics.add(node.topic_bin_id);
  }
};
const massThenId = (a, b) => b.normalized_mass - a.normalized_mass
  || a.atlas_node_id.localeCompare(b.atlas_node_id);

for (const answerType of ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8']) {
  add(nodes.filter((node) => node.answer_type_code === answerType).sort(massThenId)[0]);
}

const diversityEvidenceMassId = (a, b) => (
  Number(!selectedTopics.has(b.topic_bin_id)) - Number(!selectedTopics.has(a.topic_bin_id))
  || Number(Boolean(b.representative_evidence_id)) - Number(Boolean(a.representative_evidence_id))
  || massThenId(a, b)
);

for (const status of ['complete', 'active', 'unresolved']) {
  if (!selected.some((node) => node.status_canvas === status)) {
    add(nodes
      .filter((node) => node.status_canvas === status && !selectedIds.has(node.atlas_node_id))
      .sort(diversityEvidenceMassId)[0]);
  }
}

while (selected.length < 16) {
  add(nodes.filter((node) => !selectedIds.has(node.atlas_node_id)).sort(diversityEvidenceMassId)[0]);
}

const storyPreviewNodeIds = selected.map((node) => node.atlas_node_id);
const selectionHash = sha256Buffer(Buffer.from(JSON.stringify(storyPreviewNodeIds)));
if (selectionHash.slice(0, 8).toUpperCase() !== 'D9DB2264') {
  throw new Error(`Release ID suffix does not match selection hash: ${selectionHash}`);
}

const typeCounts = Object.fromEntries(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8']
  .map((type) => [type, selected.filter((node) => node.answer_type_code === type).length]));
const statusCounts = Object.fromEntries(['complete', 'active', 'unresolved']
  .map((status) => [status, selected.filter((node) => node.status_canvas === status).length]));
const behaviorCounts = Object.fromEntries(['information_non_direct', 'deferral_procedural', 'action_evidence']
  .map((family) => [family, selected.filter((node) => node.behavior_family === family).length]));

const topByType = Object.fromEntries(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'].map((type) => [
  type,
  nodes.filter((node) => node.answer_type_code === type).sort(massThenId)[0].atlas_node_id,
]));
const allTopTypeNodesIncluded = Object.values(topByType).every((nodeId) => selectedIds.has(nodeId));

if (selected.length !== 16 || selectedIds.size !== 16 || !allTopTypeNodesIncluded) {
  throw new Error('Story preview selection failed size, uniqueness, or top-per-type requirements');
}
if (!['complete', 'active', 'unresolved'].every((status) => statusCounts[status] > 0)) {
  throw new Error('Story preview selection failed status coverage');
}

fs.cpSync(baseDir, canonicalDir, { recursive: true, preserveTimestamps: true, errorOnExist: true });

const baseSummary = readJson(path.join(baseDir, 'atlas-summary.json'));
const summary = {
  ...baseSummary,
  release_id: releaseId,
  story_preview_node_ids: storyPreviewNodeIds,
};
fs.writeFileSync(path.join(canonicalDir, 'atlas-summary.json'), stableJson(summary));

const assetsManifest = readJson(path.join(baseDir, 'assets-manifest.json'));
assetsManifest.release_id = releaseId;
fs.writeFileSync(path.join(canonicalDir, 'assets-manifest.json'), stableJson(assetsManifest));

const storyMetrics = {
  schema_version: '1.0',
  release_id: releaseId,
  derived_from_release_id: baseReleaseId,
  generated_at: generatedAt,
  metrics_source: 'validated_existing_release',
  semantic_recomputation_performed: false,
  selection_algorithm: 'top normalized_mass per A1-A8; ensure complete/active/unresolved; then topic diversity, evidence availability, normalized_mass desc, atlas_node_id asc',
  selection_hash: selectionHash,
  atlas_node_count: nodes.length,
  story_preview_node_count: selected.length,
  story_preview_node_ids: storyPreviewNodeIds,
  story_preview_answer_type_distribution: typeCounts,
  story_preview_status_distribution: statusCounts,
  story_preview_behavior_family_distribution: behaviorCounts,
  story_preview_topic_bin_count: selectedTopics.size,
  story_preview_evidence_count: selected.filter((node) => node.representative_evidence_id).length,
  projection_id: baseSummary.projection_id,
  projection_hash: baseSummary.projection_hash,
  projection_entity_count: baseSummary.projection_point_count,
  approved_evidence_count: baseSummary.public_evidence_count,
};
fs.writeFileSync(path.join(canonicalDir, 'story-metrics.json'), stableJson(storyMetrics));

const manifest = readJson(path.join(baseDir, 'frontend-manifest.json'));
manifest.release_id = releaseId;
manifest.generated_at = generatedAt;
manifest.derived_from_release_id = baseReleaseId;
manifest.story_preview_contract_version = '1.0';
manifest.story_preview_selection_hash = selectionHash;
if (!manifest.bootstrap_files.includes('story-metrics.json')) manifest.bootstrap_files.push('story-metrics.json');

for (const file of manifest.files) {
  const target = path.join(canonicalDir, file.path);
  file.sha256 = sha256File(target);
  file.size_bytes = fs.statSync(target).size;
}
const storyMetricsPath = path.join(canonicalDir, 'story-metrics.json');
manifest.files.push({
  cache_policy: 'immutable',
  format: 'json',
  logical_name: 'story-metrics',
  path: 'story-metrics.json',
  row_count: 1,
  sha256: sha256File(storyMetricsPath),
  size_bytes: fs.statSync(storyMetricsPath).size,
});
manifest.files.sort((a, b) => a.logical_name.localeCompare(b.logical_name));
fs.writeFileSync(path.join(canonicalDir, 'frontend-manifest.json'), stableJson(manifest));

const manifestSha256 = sha256File(path.join(canonicalDir, 'frontend-manifest.json'));
const pointer = {
  schema_version: '1.0',
  release_id: releaseId,
  manifest_path: `/data/releases/${releaseId}/frontend-manifest.json`,
  manifest_sha256: manifestSha256,
  projection_id: manifest.projection_id,
  projection_hash: manifest.projection_hash,
  generated_at: generatedAt,
};
const pointerPayload = stableJson(pointer);
fs.writeFileSync(canonicalPointer, pointerPayload);

fs.cpSync(canonicalDir, runtimeDir, { recursive: true, preserveTimestamps: true, errorOnExist: true });
fs.writeFileSync(runtimePointer, pointerPayload);

const walk = (root, base = root) => {
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolute, base));
    else result.push(path.relative(base, absolute));
  }
  return result.sort();
};
const canonicalFiles = walk(canonicalDir);
const runtimeFiles = walk(runtimeDir);
const crosscheck = canonicalFiles.map((relativePath) => ({
  relative_path: relativePath,
  canonical_sha256: sha256File(path.join(canonicalDir, relativePath)),
  runtime_sha256: sha256File(path.join(runtimeDir, relativePath)),
}));
const crosscheckFailures = crosscheck.filter((row) => row.canonical_sha256 !== row.runtime_sha256);
if (canonicalFiles.join('\n') !== runtimeFiles.join('\n') || crosscheckFailures.length > 0) {
  throw new Error('Canonical/runtime release copies are not byte-identical');
}

const immutablePayloadFiles = canonicalFiles.filter((file) => !['assets-manifest.json', 'atlas-summary.json', 'frontend-manifest.json', 'story-metrics.json'].includes(file));
const baseIdentityFailures = immutablePayloadFiles.filter((file) => sha256File(path.join(baseDir, file)) !== sha256File(path.join(canonicalDir, file)));
if (baseIdentityFailures.length > 0) throw new Error(`Base payload identity failures: ${baseIdentityFailures.join(', ')}`);

const selectionCsv = [
  'selection_order,atlas_node_id,answer_type,status,topic_bin_id,normalized_mass,representative_evidence_id',
  ...selected.map((node, index) => [
    index + 1,
    node.atlas_node_id,
    node.answer_type_code,
    node.status_canvas,
    node.topic_bin_id,
    node.normalized_mass,
    node.representative_evidence_id ?? '',
  ].join(',')),
].join('\n') + '\n';
fs.writeFileSync(path.join(reportRoot, 'STORY_PREVIEW_SELECTION.csv'), selectionCsv);
fs.writeFileSync(path.join(reportRoot, 'STORY_PREVIEW_SELECTION_QA.json'), stableJson({
  verdict: 'STORY_PREVIEW_CONTRACT_PASS',
  release_id: releaseId,
  selection_hash: selectionHash,
  selected_count: selected.length,
  duplicate_count: selected.length - selectedIds.size,
  missing_node_count: storyPreviewNodeIds.filter((id) => !nodes.some((node) => node.atlas_node_id === id)).length,
  all_top_answer_type_nodes_included: allTopTypeNodesIncluded,
  answer_type_distribution: typeCounts,
  status_distribution: statusCounts,
  topic_bin_count: selectedTopics.size,
  evidence_count: selected.filter((node) => node.representative_evidence_id).length,
  immutable_base_payload_hash_failures: baseIdentityFailures,
}));
fs.writeFileSync(path.join(reportRoot, 'CURRENT_RELEASE_POINTER_QA.json'), stableJson({
  verdict: 'CURRENT_RELEASE_POINTER_PASS',
  canonical_runtime_byte_identical: fs.readFileSync(canonicalPointer).equals(fs.readFileSync(runtimePointer)),
  release_id: releaseId,
  manifest_sha256: manifestSha256,
  projection_id: manifest.projection_id,
  projection_hash: manifest.projection_hash,
}));
fs.writeFileSync(path.join(reportRoot, 'CANONICAL_RUNTIME_HASH_CROSSCHECK.csv'), [
  'relative_path,canonical_sha256,runtime_sha256,match',
  ...crosscheck.map((row) => `${row.relative_path},${row.canonical_sha256},${row.runtime_sha256},${row.canonical_sha256 === row.runtime_sha256}`),
].join('\n') + '\n');

console.log(JSON.stringify({ releaseId, selectionHash, manifestSha256, fileCount: canonicalFiles.length }, null, 2));
