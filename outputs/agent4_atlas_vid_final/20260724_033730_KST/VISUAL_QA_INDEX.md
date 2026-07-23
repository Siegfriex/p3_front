# Visual QA Index

## Baseline

- `screenshots/baseline/story-annotated.png`
- `screenshots/baseline/explorer-1440.png`
- `screenshots/baseline/method-1440.png`

## Final canonical and responsive

- Story, Explorer, and Method Lab at 320, 375, 768, 1440, and 1920 widths under `screenshots/final/`.
- `story-default-1440.png`, `story-selected-1440.png`.
- `explorer-default-1440.png`, `explorer-focused-selected-1440.png`.

## Data and method states

- `story-data-unavailable-1440.png`: release pointer aborted, ready node field absent.
- `story-fixture-1440.png`: visibly marked `CONTRACT_FIXTURE / 개발·테스트 전용`.
- `method-compare-1440.png`, `method-pca2d-unavailable-1440.png`.
- `method-3d-shell-1440.png`, `method-3d-fallback-375.png`, `method-tensor-spec-375.png`.

## Accessibility presentation

- `forced-colors-method-375.png` (`forced-colors: active`).
- `reduced-motion-3d-375.png` (`transitionDuration: 1e-05s`).
- `text-spacing-375.png` (horizontal overflow 0).
- `zoom-400-equivalent.png`.

These artifacts support Agent 4 presentation gates only. They do not issue the prohibited global `VISUAL_QA_PASS` gate.
