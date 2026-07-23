# Transformer methodology visual QA — before

Captured: 2026-07-24 KST  
Route: `http://127.0.0.1:3001/method`

## Baseline evidence

- Desktop: `before/method-before-desktop.png`
- Mobile: `before/method-before-mobile.png`
- Browser result: meaningful content rendered, no Vite/framework error overlay.

## Defect report

1. The modeling section names MiniLM and mean pooling but does not expose the inspectable chain from tokenizer output to attention, token states, sentence vector, normalization, and cosine score.
2. Sparse retrieval and the provisional Transformer path are described in adjacent cards, yet readers cannot see precisely where sparse top-50 gating ends and dense reranking begins.
3. The page does not show the original target-document fields (`action_text`, `future_plan_text`) or the status normalization rule, so `complete` and `active` appear as unexplained display labels.
4. The source documents allow `uncomplete`/`null` during extraction, while the approved P3_FINAL input permits only `active`/`complete`; that lifecycle contraction is not visible.
5. The current formula panel is compact and readable, but adding all Transformer math directly to it would create a dense wall. The detailed algorithm should use a staged flow plus expandable equations.

## Change criteria

- Keep current canonical TF-IDF–SVD–UMAP path visually dominant.
- Mark MiniLM as executed provisional code, never the canonical Atlas model.
- Show verified local model settings: BERT-style 12 layers, 12 heads, hidden 384, max 512, mean pooling.
- Explain normalized dot product as cosine similarity.
- Separate official reported status from independent completion verification.
- Preserve single-column mobile layout and zero horizontal overflow at 390 px and 320 px.
