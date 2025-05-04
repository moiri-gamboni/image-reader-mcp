# Image Reader MCP Server

A simple MCP server built with FastMCP that provides tools to:

- List image files in a specified directory.
- Read a specific image file and return its content.

**Important Note:** When using this server within the Cursor IDE, it currently seems to function correctly only when the Claude Sonnet model is selected.

## Tools

This server provides the following tools:

### `list_images`

*   **Description:** List image files in a specified directory.
*   **Parameters:**
    *   `directoryPath` (string): The absolute path to the directory to scan for images.
*   **Returns:** A list of image filenames found in the directory or a message indicating no images were found.
*   **Supported Extensions:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.svg`

### `read_image`

*   **Description:** Reads a specific image file and returns its content as base64.
*   **Parameters:**
    *   `filePath` (string): The absolute path to the image file to read.
*   **Returns:** An object containing the image content suitable for display (using `imageContent` helper from `fastmcp`).
*   **Supported Extensions:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.svg`

## Setup

```bash
pnpm install
```