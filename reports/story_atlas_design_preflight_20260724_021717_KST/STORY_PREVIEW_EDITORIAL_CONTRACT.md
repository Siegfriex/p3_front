# Story Preview Editorial Contract

## Role

`/#answers` is the limited editorial scene named **어떻게 답했나**. It introduces the answer-behavior map inside the Story and hands interested readers to `/atlas`. It is not a miniature dashboard and does not replace the Story, Evidence Line, adjacent chapters or Full Explorer.

## Required sequence

1. Chapter entry and Evidence Line continuity
2. Eyebrow: `어떻게 답했나 / STORY PREVIEW`
3. Headline: `답변은 어디에 모였는가`
4. One short supporting paragraph
5. Both projection warnings
6. Compact controls: status, answer type, legend, reset
7. Inline 16-node Story Atlas preview
8. Selected-node summary
9. Evidence action or explicit evidence-unavailable copy
10. Primary CTA: `전체 지도 보기`

## Layout lock

- Surface: light archival paper. Do not invert the scene to black. Inverse treatment is reserved for error/verification emphasis.
- Canonical stage viewBox: `720×520` (`18:13`). The map may fill a narrower editorial wrapper but must preserve the shared plot rectangle and projection domain.
- Desktop maximum content width: inherited `PageFrame`, capped at 90rem from 1200px and 120rem from 1600px. The preview stage itself is capped at 72rem.
- Desktop scene: stage first, selected summary below in a 7:5 text split; never use the Explorer sticky side inspector.
- Tablet/mobile: one column. The stage precedes summary and CTA. If 44px targets cannot survive fit-to-width, the canonical 720px stage scrolls horizontally with a visible pan instruction and synchronized list/cards.
- Headline-to-warning gap: 24px mobile, 32px tablet/desktop.
- Warning-to-controls gap: 24px.
- Controls-to-stage gap: 16px.
- Stage-to-summary gap: 24px mobile, 32px tablet/desktop.
- Summary-to-CTA gap: 16px.
- Chapter exit space: at least 72px mobile and the existing chapter rhythm on larger viewports.

## Information depth

The Story must let a reader understand position=topic, shape/fill=behavior family, inner mark/label=A1–A8, radius=mass and opacity=confidence. It may show at most three persistent annotations and labels only for selected/focused/editorially approved anchor nodes. Full topic labels, all-node DOM inventory, method metadata and deep evidence provenance belong to `/atlas` or `/evidence/:evidenceId`.

## Control lock

- Status is a single select or segmented control with the same values as Explorer.
- Answer types are the same A1–A8 multi-select values; mobile may use a disclosure.
- Legend is explanatory, not interactive.
- Reset restores all statuses, A1–A8, no selected node and `view=nodes`.
- Story filter changes do not change coordinates, radius, selected IDs or the projection domain.
- CTA carries status and answer types, but not a transient hover or Story-only selection.

## Existing Evidence Line

The current ChapterFrame Evidence Line and chapter numbering remain authoritative for editorial time space S1. The Atlas map is S2 and must not visually splice into the Evidence Line as if the projection represented chronology. A red registration rule may align the scene with the line, but no node-to-line connector is allowed unless evidence lineage is explicit.

## Success test

After one viewport of reading, a user can state that the points represent topics, glyph grammar represents answer behavior, size represents mass rather than importance, the scene is a subset, and `/atlas` continues the analysis.
