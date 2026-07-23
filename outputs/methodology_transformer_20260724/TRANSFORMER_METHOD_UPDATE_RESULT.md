# Transformer and target-status methodology update

Date: 2026-07-24 KST  
Route: `http://localhost:3001/method`

## Outcome

The Methodology page now publishes the executed PDF-to-candidate chain and keeps the release boundary explicit:

1. PDF bytes and SHA-256
2. PyMuPDF blocks
3. speaker turns and retrieval segments
4. normalized search text
5. same-year sparse TF-IDF top 50
6. MiniLM subword tokenization
7. 12-layer multi-head Transformer encoder
8. masked mean pooling
9. L2 normalization and cosine similarity
10. reciprocal-rank fusion and human review

The page states that steps 6–9 are the executed P3_0722 provisional reranker path. The canonical P3_FINAL Atlas remains char TF-IDF 2–5 → SVD 96D → L2 → cosine UMAP, and does not reuse the 384D MiniLM coordinate space.

## Verified local model settings

- model: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`
- architecture: BERT-style encoder
- layers: 12
- attention heads: 12
- hidden size: 384
- feed-forward size: 1,536
- activation: GELU
- maximum sequence length: 512
- tokenizer vocabulary: 250,037
- local special tokens: `<s>`, `</s>`, `<pad>`
- sentence pooling: valid-token mean
- runtime output: 384D, L2 normalized
- dense score in code: normalized query vector dot normalized segment vector, equal to cosine similarity

## Target status reconstruction

The UI now distinguishes fields, labels, and verification:

- `action_text`: official action text; leading `조치중` and `조치완료` receive priority.
- `future_plan_text`: an evidence field, not a third class label.
- extraction domain: `complete`, `active`, `uncomplete`, `null`.
- Atlas canvas domain: `complete`, `active`, `unresolved`.
- approved analysis-input domain: `complete`, `active` only.
- approved 64 links: `complete=41`, `active=23`.
- three marker exports: 297 rows; `complete=170`, `active=127`, `uncomplete=0`, `null=0`.

`reported_status` is the official source claim. `completion_verification_status` records evidence-lineage review and is not presented as independent policy-effect validation.

## Visual evidence

- Before desktop: `before/method-before-desktop.png`
- Before mobile: `before/method-before-mobile.png`
- Transformer desktop: `after/transformer-flow-desktop.png`
- Transformer mobile: `after/transformer-flow-mobile.png`
- Status model desktop: `after/status-model-desktop.png`
- Status model mobile: `after/status-model-mobile.png`
- Full desktop: `after/method-after-desktop-full.png`
- Full mobile: `after/method-after-mobile-full.png`

## Verification

- `npm run typecheck`: PASS
- `npm run lint`: PASS
- `npm run build`: PASS
- `npm test`: 20 files, 56 tests PASS
- targeted Methodology Playwright: 3 PASS
- full Playwright: 21 PASS, 14 SKIPPED, 0 FAIL
- Axe: 0 serious or critical violations on Methodology
- horizontal overflow: 0 at tested 320, 390, 768, and 1440 px widths
- browser: updated content rendered; no Vite/framework error overlay
