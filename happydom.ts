import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();

// React 19's act() checks this flag to know it's running in a test
// environment. bun:test doesn't set it automatically like Jest/Vitest
// presets do, so without this every act() call prints a spurious
// "not configured to support act(...)" warning despite working correctly.
const globalTestEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
globalTestEnv.IS_REACT_ACT_ENVIRONMENT = true;
