<!-- Workspace-specific Copilot instructions for cyclemastertest -->

## Quick commands

- Build (TypeScript):
  - npm run build    # runs `tsc`, outputs to `dist/`
- Dev (build + run):
  - npm run dev      # runs `tsc` then `node dist/index.js`
- Start (run compiled):
  - npm run start
- Watch (continuous compilation):
  - npm run watch

- Test (Playwright):
  - npm run test             # runs Playwright test suite (NODE_OPTIONS=--no-deprecation)
  - npm run test:ui          # open Playwright UI
  - npm run test:debug       # run in debug mode

- Run a single Playwright test file or a single test:
  - npx playwright test src/tests/my.spec.ts            # run a specific test file
  - npx playwright test -g "test name substring"      # run tests matching a name pattern
  - or: npm run test -- src/tests/my.spec.ts           # pass args through npm script

Note: Playwright config sets testDir: './tests' and webServer.command: 'npm run dev'. The codebase places end-to-end tests under src/tests; run tests by pointing Playwright at that path (see above) or update playwright.config.ts to match.

## High-level architecture

- Purpose: WebSocket-based cycling measurement platform.
- Entry point: src/index.ts — creates an HTTP server and attaches a ws.WebSocketServer. Listens on PORT (env or 8080) and echoes messages; sends a welcome message on connection.
- Types & processing: src/types.ts defines the CyclingMeasurement interface and a small processMeasurement helper used to log/process incoming measurement objects.
- Build output: TypeScript compiles to `dist/` (main: dist/index.js). Playwright webServer uses `npm run dev` to build then run the compiled server for tests.
- Tests: Playwright-based end-to-end tests live under src/tests (Playwright config expects a tests/ directory by default). Playwright runs against baseURL http://localhost:8080 and will start the local server as configured.

## Key conventions and repository specifics

- Tests and CI:
  - playwright.config.ts relies on environment variables (CI) to adjust retries and workers.
  - webServer.reuseExistingServer: true in local dev to avoid restarting.
- Scripts:
  - Test scripts set NODE_OPTIONS=--no-deprecation to suppress Node deprecation noise during Playwright runs.
- Code layout:
  - src/index.ts is the canonical server implementation — modify this when changing runtime behavior.
  - src/types.ts holds domain types; prefer adding new interfaces here for shared structures.
- No linter configured: there is no eslint/tslint script or config detected. Add linting config if required.

## Files of interest for Copilot sessions

- /src/index.ts — primary server logic and WebSocket lifecycle
- /src/types.ts — domain types (CyclingMeasurement)
- /playwright.config.ts — test runner configuration and webServer settings
- /package.json — available scripts (build, dev, test variants)

## AI/assistant integration checks

- Existing assistant config found: .github/copilot-instructions.md (this file).
- No Claude/Cursor/Aider/Cline-specific rule files detected in repo root.

---

If helpful, update playwright.config.ts to set testDir: './src/tests' to match current layout.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
