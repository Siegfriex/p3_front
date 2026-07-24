# P3 Culture Atlas reproduction contract

This repository branch is the source snapshot for the frontend and its approved
runtime data bundle deployed to Vercel on 2026-07-24.

## Runtime baseline

- Node.js: `20.20.1` (`package.json` enforces `>=20.20 <21`)
- npm: `10.8.2`
- install: `npm ci`
- full validation: `npm run deploy:check`
- production-compatible browser validation: `npm run test:e2e:preview`
- build output: `dist/`

The dependency lock is `package-lock.json` with SHA-256:

`fb7789623b1fd97398a9c21db57176fa9d7d741c860cac659f3f6dc3d57c8252`

## Canonical frontend data

- release: `ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264`
- projection: `PROJ_DG761_20260723_213011_KST_4665FDF3E5CF`
- current pointer: `public/data/current-release.json`
- pointer SHA-256: `245e3899bfae47e9ad720cebe69c4cc932e273d1d91025c0ad29e6ce39151776`
- frontend manifest SHA-256: `fb91d21a4171f1600835744a89138f762cad448c9dad4d9ef0eec91c45bd0fdc`
- tracked `public/data` files: `162`

The immutable release payload is stored under:

`public/data/releases/ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264/`

The browser must load the release through the current pointer and manifest. It
must not derive embeddings, UMAP coordinates, relationships, mass, status, or
evidence eligibility at runtime.

## Vercel linkage

- project: `siegfriexs-projects/p3-culture-atlas`
- production alias: `https://p3-culture-atlas.vercel.app`
- validated production deployment: `dpl_2YSoAyLoz45xAh9qLrMQUnnwQXPE`

To link a fresh clone to the same Vercel project without committing local
credentials:

```bash
npx vercel link --yes --project p3-culture-atlas --scope siegfriexs-projects
```

`.vercel/` and `.env*` are intentionally ignored. Authentication and Vercel
project credentials remain outside Git.

## Fresh-clone verification

```bash
git switch P3_FRONT_FINAL
npm ci
npm run deploy:check
npm run test:e2e:preview
```

`design/Untitled.pdf` is an unreferenced 237 MB local design-source export and
exceeds GitHub's normal blob limit. It remains local and ignored. The referenced
design asset `design/Untitled.png` is tracked.
