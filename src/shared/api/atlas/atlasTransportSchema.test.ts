import { describe, expect, it } from 'vitest';

import { AtlasSchemaError, parseAtlasNodes, parseFrontendManifest } from './atlasTransportSchema';

const HASH = 'a'.repeat(64);

function manifestFixture() {
  return {
    manifest_version: '1.0',
    release_id: 'contract-release-001',
    app_contract_version: '1.0',
    data_version: 'contract-1',
    pipeline_run_id: 'contract-run-001',
    projection_id: 'contract-projection-001',
    projection_hash: HASH,
    publication_ready: true,
    generated_at: '2026-07-23T00:00:00Z',
    status_partitioned: false,
    evidence_detail_transport: 'route-json',
    files: [{
      logical_name: 'atlas-nodes-all',
      path: 'atlas-nodes-all.json',
      format: 'json',
      sha256: HASH,
      row_count: 1,
      size_bytes: 512,
      cache_policy: 'immutable',
    }],
  };
}

function nodeFixture() {
  return {
    atlas_node_id: 'contract-node-001',
    projection_id: 'contract-projection-001',
    status_canvas: 'active',
    topic_bin_id: 'contract-topic-001',
    answer_type_code: 'A2',
    behavior_family: 'information_non_direct',
    anchor_x: 0.2,
    anchor_y: 0.3,
    display_x: 0.21,
    display_y: 0.31,
    raw_answer_count: 2,
    raw_link_count: 1,
    weighted_mass: 0.4,
    normalized_mass: 0.5,
    node_radius: 18,
    mean_similarity: null,
    mean_qa_confidence: 0.8,
    mean_label_confidence: null,
    representative_evidence_id: 'contract-evidence-001',
    node_version: 'contract-1',
    pipeline_run_id: 'contract-run-001',
    data_version: 'contract-1',
  };
}

describe('Atlas transport schema', () => {
  it('accepts numeric contract values and semantic behavior families', () => {
    expect(parseFrontendManifest(manifestFixture()).release_id).toBe('contract-release-001');
    expect(parseAtlasNodes([nodeFixture()])[0].display_x).toBe(0.21);
  });

  it('rejects the string <NA> even where a string is required', () => {
    const fixture = manifestFixture();
    fixture.release_id = '<NA>';
    expect(() => parseFrontendManifest(fixture)).toThrow(AtlasSchemaError);
  });

  it('rejects numeric strings instead of coercing them', () => {
    const fixture = manifestFixture();
    fixture.files[0].row_count = '1' as unknown as number;
    expect(() => parseFrontendManifest(fixture)).toThrow(/row_count/);
  });

  it('rejects visual color names as domain behavior families', () => {
    const fixture = nodeFixture();
    fixture.behavior_family = 'red';
    expect(() => parseAtlasNodes([fixture])).toThrow(/behavior_family/);
  });

  it('fails closed when publication_ready is false', () => {
    const fixture = manifestFixture();
    fixture.publication_ready = false;
    expect(() => parseFrontendManifest(fixture)).toThrow(/publication_ready/);
  });
});
