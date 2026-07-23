# Tensor Method View Specification

Tensor UI activates only if a governed decomposition exists for entity × topic factor × behavior factor × status/time.

The recommended Method view consists of a latent-factor matrix, loading table, topic–behavior heatmap, status/time slice, and selected-factor evidence list. Tensor factors explain latent structure; they do not become public Atlas positions and are not merged into the UMAP scatter plot.

Current state: `NOT_VERIFIABLE`; no tensor pipeline or approved payload is exposed. The implemented tab therefore shows specification-only DataUnavailable and generates no factors.

Gate: `TENSOR_METHOD_VIEW_SPEC_READY`. `TENSOR_MODEL_PASS` is not claimed.
