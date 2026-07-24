# P3_CULTURE Methodology Technical Lineage

## Verdict

`P3_0722`의 모델 코드와 `P3_FINAL`의 현재 승인 릴리스는 같은 계보에 있지만 같은 모델은 아니다.

- 원본 수집: `02_pdf_crawler.ipynb` — 18/18 코드셀 실행, 오류 0
- Canonical Core ETL: `09_audit_minutes_pdf_etl.ipynb` — 16/16 코드셀 실행, 오류 0
- P3_0722 retrieval: char TF-IDF + word TF-IDF + provisional MiniLM dense rerank
- P3_0722 projection: multilingual MiniLM 384D → PCA50 → UMAP, Gold 이전 provisional
- P3_FINAL canonical Atlas: char TF-IDF(2–5) → TruncatedSVD 96D → L2 → cosine UMAP → KMeans 24
- P3_FINAL canonical frontend: 761 decision groups, 769 child labels, 140 nodes, 64 approved evidence records

## 1. Collection and crawling

Authority: `P3_CULTURE/02_pdf_crawler.ipynb`

- Excel registry에서 meeting ID와 PDF URL을 가진 sheet를 선택한다.
- URL scheme, meeting ID, destination collision, cross-meeting duplicate URL을 critical gate로 검사한다.
- `requests.Session`과 retry/backoff/rate-limit, streaming `.part` download를 사용한다.
- `%PDF-` signature, HTML/JSON error body, `fitz.open`, `page_count >= 1`, SHA-256을 검사한다.
- 손상된 기존 PDF 또는 registry critical failure가 있으면 circuit breaker로 신규 다운로드 전체를 중단한다.
- 이 단계에서는 OCR, 본문 추출, TF-IDF, embedding을 실행하지 않는다.

## 2. Canonical PDF ETL

Authority: `P3_CULTURE/09_audit_minutes_pdf_etl.ipynb`

- 42 registry rows, 42 downloaded PDFs, 42 physical files를 재확인한다.
- PyMuPDF `page.get_text("blocks", sort=True)`로 block을 추출한다.
- raw text와 normalized text를 분리하고 page/header/footer/empty contribution을 검증한다.
- page → block → speaker turn → retrieval segment를 생성한다.
- 이 단계의 실행 flags는 TF-IDF, embedding, LLM, PyTorch, qrels를 모두 끈다.

## 3. P3_0722 retrieval implementation

Authority: `P3_0722/pipeline/p3_0722_pipeline/stages.py`, `P3_0722/config/pipeline_config.json`

- strict audit-cycle filter를 먼저 적용한다. 미래·타 연도 corpus를 점수 계산 후 숨기지 않는다.
- char TF-IDF: 3–5 gram, `min_df=2`, max 120,000, sublinear TF, L2.
- word TF-IDF: 1–2 gram, `min_df=2`, max 80,000, sublinear TF, L2.
- query expansion: `q = L2(v(issue) + 0.25 × v(action))`.
- sparse score: `0.65 × char cosine + 0.35 × word cosine`.
- candidate pool: target별 top 50.
- optional dense rerank: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`, normalized 384D vectors.
- rank fusion: char, word, dense rank에 `1 / (60 + rank)`를 합산한다.
- 후보는 qrels/검토 입력이며 정답 또는 기사 통계가 아니다.

## 4. Transformer status

MiniLM 코드는 실제 P3_0722 retrieval/projection 구현에 존재하지만 현재 P3_FINAL canonical Atlas model은 아니다.

- model: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`
- dimension: 384
- pooling: mean
- normalization: L2
- old projection: PCA 50D, UMAP, all-status single fit
- lifecycle: provisional/legacy; Gold 전 산출물

## 5. P3_FINAL current executed model

Authorities:

- `P3_FINAL/scripts/08_build_static_atlas_release_761.py`
- `P3_FINAL/runs/final_data_state_audit_20260723_214530_KST/EMBEDDING_AUDIT.json`
- `P3_FINAL/data/50_analysis/umap_atlas/approved/PROJ_DG761_20260723_213011_KST_4665FDF3E5CF/`

Actual model contract:

- input grain: one Behavior Decision Group
- input count: 761
- child label count: 769
- feature text: approved target/request text, else QA question, else retrieval segment
- prohibited feature leakage: behavior/status/reviewer/publication fields
- vectorizer: Unicode char TF-IDF 2–5 gram, `min_df=2`, max 8,192, sublinear TF, L2
- reduction: randomized TruncatedSVD 96D, 15 iterations, random state 42
- projection: UMAP 2D, cosine, neighbors 20, min_dist 0.08, random/transform seed 42, one CPU job
- clustering: KMeans 24, n_init 40
- representative: high-dimensional cosine medoid
- node count: 140
- public evidence: 64
- non-finite/null/alignment errors: 0

## 6. Population contract

Two valid populations must not be collapsed.

1. `AAIR_20260723_205505_KST_84DD4F79`: 64 approved target-answer links with complete evidence lineage.
2. `STATIC_ATLAS_20260723_213011_KST`: 761 Behavior Decision Groups for Atlas topology.

The canonical frontend member contract records 64 approved-link members and 697 `NO_APPROVED_TARGET_LINK` members. The latter remain valid Atlas members but must not be presented as evidence-complete cases.

## 7. Canonical release after migration and consolidation

- projection: `PROJ_DG761_20260723_213011_KST_4665FDF3E5CF`
- canonical frontend: `ATLAS_DG761_STORY_20260724_022353_KST_BF673FD1`
- gate: `CANONICAL_RELEASE_PACKAGE_PASS`
- active P3_FINAL authority pointer count: 1
- manifest payload count: 80
- story preview nodes: 16
- approved evidence: 64
- semantic payload hash changes during consolidation: 0

The frontend workspace also contains concurrent release `ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264`. P3_FINAL classified it as noncanonical and production-ineligible; it shares the same projection ID/hash. The Methodology page therefore cites the P3_FINAL canonical `022353` release.

## 8. Notebook execution boundary

| Artifact | code cells | executed | classification |
|---|---:|---:|---|
| `02_pdf_crawler.ipynb` | 18 | 18 | executed collection notebook |
| `09_audit_minutes_pdf_etl.ipynb` | 16 | 16 | executed canonical ETL notebook |
| `P3_0722/main.ipynb` | 7 | 0 | reader/editor shell |
| `P3_FINAL_MASTER_ANALYSIS.ipynb` | 2 | 0 | planned M7 shell |

Notebook cell presence was not used as proof of model execution. Current model execution was established from P3_FINAL scripts, physical model files, Parquet outputs, hashes, validation JSON, and the canonical release pointer.

