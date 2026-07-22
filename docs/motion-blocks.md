# Motion blocks

Animation is installed as a plugin variant of an existing block. Variant tabs exist only in the documentation workspace and are not copied into the consuming application.

## Boundaries

- The Sign In page starts on `Normal` and offers `CSS animation` and `GSAP animation` documentation tabs.
- `CSSMotion` provides dependency-free animation using CSS keyframes.
- `GsapMotion` owns scoped GSAP lifecycle and installs `gsap` plus `@gsap/react`.
- `MotionReveal` remains available as a component plugin for products using Motion for React.
- Registry items declare both npm dependencies and DUI `registryDependencies`, so one CLI command installs the complete block.

## Passes and validation

1. Keep animation components independent and installable.
2. Attach plugin variants to an existing block instead of creating standalone animation blocks.
3. Keep variant selection in documentation only and generate a distinct CLI command for each variant.
4. Build every static route, validate the registry, and confirm reduced-motion fallbacks.
