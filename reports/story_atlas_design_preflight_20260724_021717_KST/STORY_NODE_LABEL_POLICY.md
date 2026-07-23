# Story Node Label Policy

## Persistent labels

Persistent labels are limited to at most three editorially approved anchor nodes. Approval must reference a published topic-bin label; frontend-generated topic names are prohibited. If no approved label exists, show the answer type and a neutral node ID suffix only after focus or selection.

## Interaction labels

- Hover/focus: `A# · behavior family · answer count` in a collision-aware annotation that does not move the node.
- Selected summary: approved topic label or `주제 라벨 미제공`, answer type, behavior family, status, answer count, mass and evidence availability.
- Accessible name: topic label, A#, behavior family, status, answer count and stable short node ID. This must be unique within the filtered set.
- Do not place answer excerpts directly over the map.

## Collision handling

Label leaders may offset labels, never node coordinates. When label placement cannot avoid collision, suppress the persistent label and keep the information in the selected summary and DOM navigator. Topic-bin or centroid labels are optional and require approved upstream text plus a measured non-obscuring placement; they are not generated from visual clusters.

## Density by product

Story: zero to three persistent labels, one interaction label, one selected summary. Explorer: no default per-node labels; focus/hover/selected labels only, with topic-bin labels allowed after approval. Mobile: selected summary replaces floating labels when the stage is panned.
