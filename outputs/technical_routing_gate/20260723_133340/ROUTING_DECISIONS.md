# Routing Decisions

## RD-01 — Declarative BrowserRouter

Use React Router v7 Declarative Mode. `main.tsx` owns BrowserRouter; screen selection is no longer duplicated in component state.

## RD-02 — Background-location detail routes

Story-originated Evidence and Case navigation stores the current location as `backgroundLocation`. The route URL changes while Story stays mounted behind the portal Drawer. Direct URLs do not carry background state and therefore render complete detail pages.

## RD-03 — History-owned close

Route-modal close uses `navigate(-1)`. Direct pages expose explicit Story links because they are not modal states. Invalid IDs render a visible not-found state instead of falling back to a different record.

## RD-04 — Hash history policy

IntersectionObserver never writes hashes. Only explicit chapter navigation adds a hash history entry. Direct hash entry and browser Back use the same controller and sticky-header offset.

## RD-05 — Development gallery isolation

`/dev/foundations` is guarded by `import.meta.env.DEV`. Method no longer embeds FoundationGallery. The production build resolves the same URL to NotFoundPage.

## RD-06 — State ownership

Router state belongs to React Router; overlay visibility belongs to detail routes; presentation and motion preferences belong to a small shared provider; chapter activity belongs to Story/AppShell; filters remain widget-local.
