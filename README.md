# Image Reader MCP Server

A simple MCP server built with FastMCP that provides tools to:

- List image files in a specified directory.
- Read a specific image file and return its content.

## Setup

```bash
pnpm install
```

## Running

### Development (with mcp-cli)

```bash
pnpm run dev
```

### Inspection (with MCP Inspector)

```bash
pnpm run inspect
```

### Production (stdio)

```bash
pnpm run build
npx fastmcp start dist/index.js
```

### Production (SSE)

Modify `src/index.ts` to use `transportType: 'sse'` and configure the port/endpoint, then:

```bash
pnpm run build
node dist/index.js
``` 