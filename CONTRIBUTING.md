# Contributing to DUI

Thank you for helping improve DUI.

## Before you start

- Search existing issues and pull requests before opening a duplicate.
- Use an issue to discuss substantial API or design changes first.
- Keep components compatible with LTR and RTL interfaces.
- Preserve the source-owned shadcn registry model.

## Development

```bash
git clone https://github.com/qentrah/DUI.git
cd DUI
npm install
npm run dev
```

## Pull requests

Keep each pull request focused and include:

- A clear description of the problem and solution
- Screenshots or recordings for visual changes
- LTR and RTL verification when layout is affected
- Updated registry metadata and documentation for new components

Run all checks before requesting review:

```bash
npm run lint
npm run build
npm run registry:build
npm run registry:validate
```

## Adding a component

1. Add the component to `components/ui`.
2. Use logical CSS properties or Tailwind logical utilities for directional spacing.
3. Declare the component in `registry.json`.
4. Add it to `lib/catalog.ts`.
5. Add previews and copyable examples.
6. Run the registry build and validation commands.

All contributions are licensed under the repository's MIT License.
