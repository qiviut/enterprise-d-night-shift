# Enterprise D: Night Shift

A small TypeScript monorepo scaffold for a browser-based shipboard adventure. The client is Vite + React with Babylon.js ready for the renderer slice; the server is Fastify; shared contracts and deterministic rules live in separate workspaces.

This checkout is a development skeleton, not a playable game. The client currently demonstrates a local-only chat placeholder with a deterministic offline reply. Movement, a Babylon.js scene, server-connected chat, persistence, and mission logic are future work. No franchise media is included.

## First run

Requirements: Node.js 24.12 or newer and npm. Node 24 is the recommended LTS line. The 24.12 minimum provides stable built-in TypeScript type stripping for the small Node test suite.

```sh
npm ci
npm run dev
```

Vite prints the local URL (normally `http://127.0.0.1:5173`). The placeholder reply is generated in the browser; it does not call the server or Hermes.

To run the Fastify health endpoint in a second terminal:

```sh
npm run dev:server
curl http://127.0.0.1:3000/health
```

The server binds to `127.0.0.1` by default and returns `{"status":"ok"}`. Set `PORT` or `HOST` only for local development; there are no deployment settings or credentials in this repository.

## Validation

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run test:failure-regression
npm run build
```

`npm run validate` runs those checks in sequence. The failure-regression check injects a temporary deliberately failing Node test and verifies that the same `npm test` command used by CI exits non-zero; it removes its temporary files afterward.

The production build emits the client to `apps/client/dist` and the compiled server/shared workspaces to their respective `dist` directories. Generated output and dependencies are ignored by Git.

## Workspace map

- `apps/client` — Vite, React, and the Babylon.js dependency for the browser client.
- `apps/server` — Fastify app and a loopback-only `/health` route.
- `packages/contracts` — initial shared health response type; versioned game/save/chat contracts are separate planned work.
- `packages/rules` — deterministic offline reply used by the placeholder UI, with a unit test.
- `.github/workflows/ci.yml` — read-only dependency install, lint, typecheck, tests, and production build. It has no deployment, publishing, or artifact-upload steps.
- `.github/dependabot.yml` — weekly npm and GitHub Actions update checks.

## License and project status

The code in this repository is provided under the MIT License. That license does not grant rights to third-party names, marks, or media. This is an unofficial fan project and is not affiliated with or endorsed by the Star Trek rights holders. The repository contains no extracted or licensed franchise assets.
