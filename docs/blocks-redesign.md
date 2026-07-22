# Blocks redesign

## Current behavior

- Block documentation derives source filenames from URL slugs, which breaks routes whose source files use a different name.
- The documentation workspace wraps previews in an extra card, so full-width sections look like widgets and compact blocks can appear off-center.
- All blocks share one navigation group even though they serve different product purposes.

## Module boundaries

- `lib/catalog.ts` owns block metadata: category, source path, primitive dependencies, and new status.
- `app/blocks/[slug]/page.tsx` composes the page and reads only the catalog-declared source file.
- `components/library/block-preview.tsx` maps catalog slugs to rendered examples.
- `components/blocks/*` contains the installable block source. Blocks compose DUI primitives and theme tokens.
- `components/blocks/block-workspace.tsx` owns documentation-only preview, source, installation, and composition controls.

## Implementation passes

### Pass 1: Repair source resolution

Current behavior: source filenames are guessed from route slugs and missing files are logged during render.

Structural improvement: declare each source path in the catalog and fail catalog validation during development rather than emitting runtime console errors.

Validation check: every catalog source resolves and every block route statically renders.

### Pass 2: Flatten and center previews

Current behavior: a documentation card wraps another block surface.

Structural improvement: use a neutral canvas with no extra card, center compact blocks, and allow section blocks to use the full available width.

Validation check: sign-in is centered and heroes/sections span the preview canvas without nested presentation borders.

### Pass 3: Align visual treatments

Current behavior: OAuth actions use the blue tertiary style.

Structural improvement: compose neutral DUI outline and primary variants and remove decorative block borders that do not express product hierarchy.

Validation check: no block introduces direct brand colors or a one-off blue action treatment.

### Pass 4: Expand and group the catalog

Current behavior: authentication, heroes, and utilities appear in one Layout Blocks group.

Structural improvement: organize Application, Heroes, CTA, Features, Social proof, and Content groups and add CTA, feature grid, testimonial, logo cloud, and FAQ blocks.

Validation check: every category appears in the sidebar and catalog; every new block has preview, source, install command, registry artifact, and component-registry entry.
