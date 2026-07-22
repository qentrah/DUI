# Component catalog expansion

## Boundaries

- `lib/catalog.ts` owns discovery metadata, new-item state, and documentation groups.
- `components/ui/*` owns backend-agnostic primitives with controlled and uncontrolled APIs.
- `components/library/component-preview.tsx` owns interactive documentation state.
- `components/library/component-workbench.tsx` owns copy-ready examples.
- `registry.json` and `component-registry.json` own CLI distribution and reuse metadata.

## Passes

1. Add explicit new-item metadata and grouped navigation without changing component routes.
2. Add overlay/navigation primitives: Dropdown, Popover, Modal, Sidebar, MobileNav.
3. Add data primitives: Chart and Table.
4. Add previews, exact examples, CLI entries, and generated registry artifacts.

## Parity checks

- Existing component URLs and names remain stable.
- A new blue dot appears in both the component index and documentation sidebar.
- Dropdown, Popover, Modal, and Sidebar support keyboard dismissal.
- Sidebar supports controlled open/close and responsive presentation.
- Table exposes semantic table markup; Chart includes an accessible label and data summary.
- Every new catalog slug has a source file, preview, snippet, registry entry, generated JSON, and static route.
