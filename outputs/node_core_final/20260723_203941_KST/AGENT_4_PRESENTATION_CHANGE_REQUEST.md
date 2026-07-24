# Agent 4 Presentation Change Request

Status: `FULFILLED_BY_AGENT_4 / AGENT_3_DID_NOT_MODIFY_PRESENTATION_FILES`

## 1. Approved-radius integration

When an approved bundle is connected, the route/page integration should pass a padding value derived from the complete approved node radius set into the shared Agent 3 scaler:

```ts
const projectionPadding = getRequiredProjectionPaddingForRadii(
  transport.nodes.map((node) => node.node_radius),
);
const scale = createProjectionScale(bounds, ATLAS_PLOT_RECT, projectionPadding);
```

This must happen before filtering and must not be recomputed from the visible subset. Until approved data exists, the current 48-unit fixture padding remains explicitly provisional.

Requested owner: route/page presentation integrator. Agent 3 did not modify `AtlasPage.tsx`.

Live resolution: Agent 4 added `getRequiredProjectionPaddingForRadii(transport.nodes.map(node => node.node_radius))` to `AtlasPage` and retained the default scale only for the zero-node case.

## 2. Concurrent QA artifact type error

The untracked file below currently blocks repository-wide `npm run typecheck` and `npm run build`:

```text
outputs/agent4_presentation_recovery/20260723_204002_KST/current-state.visual.spec.ts:151
```

Observed error:

```text
Property 'inert' does not exist on type 'HTMLElement | SVGElement'.
```

Please narrow the element to `HTMLElement` before reading `.inert`, or keep that Playwright helper outside the project TypeScript include boundary. Agent 3 will not edit this concurrent Agent 4 artifact.

Live resolution: Agent 4 narrowed the Playwright evaluation with `element instanceof HTMLElement` and excluded generated `outputs` from the root TypeScript include boundary. Final repository typecheck and build pass.

## 3. Out-of-scope findings

- Full Story document length and chapter typography remain presentation ownership.
- No global CSS, Evidence Drawer, route accessibility, skip-link, or Story composition change is requested by the node-core patch.
