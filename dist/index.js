import { FastMCP, imageContent, UserError } from 'fastmcp';
import { z } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';
const server = new FastMCP({
    name: 'Image Reader Server',
    version: '1.0.0',
});
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']);
// Tool to list images in a directory
server.addTool({
    name: 'list_images',
    description: 'List image files in a specified directory.',
    parameters: z.object({
        directoryPath: z.string().describe('The absolute path to the directory to scan for images.'),
    }),
    execute: async (args) => {
        try {
            const entries = await fs.readdir(args.directoryPath, { withFileTypes: true });
            const imageFiles = entries
                .filter(entry => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
                .map(entry => entry.name);
            if (imageFiles.length === 0) {
                return 'No image files found in the specified directory.';
            }
            return `Image files found:\n${imageFiles.join('\n')}`;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new UserError(`Directory not found: ${args.directoryPath}`);
            }
            if (error.code === 'EACCES') {
                throw new UserError(`Permission denied to access directory: ${args.directoryPath}`);
            }
            console.error('Error listing images:', error); // Log unexpected errors
            throw new UserError(`Failed to list images in directory: ${error.message}`);
        }
    },
});
// Tool to read an image file
server.addTool({
    name: 'read_image',
    description: 'Reads a specific image file and returns its content as base64.',
    parameters: z.object({
        filePath: z.string().describe('The absolute path to the image file to read.'),
    }),
    execute: async (args) => {
        const ext = path.extname(args.filePath).toLowerCase();
        if (!imageExtensions.has(ext)) {
            throw new UserError(`Invalid file type. Only the following are supported: ${[...imageExtensions].join(', ')}`);
        }
        try {
            // Use the imageContent helper from fastmcp
            return imageContent({ path: args.filePath });
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new UserError(`Image file not found: ${args.filePath}`);
            }
            if (error.code === 'EACCES') {
                throw new UserError(`Permission denied to read file: ${args.filePath}`);
            }
            console.error('Error reading image:', error); // Log unexpected errors
            throw new UserError(`Failed to read image file: ${error.message}`);
        }
    },
});
// Start the server using stdio by default
server.start({
    transportType: 'stdio',
    // To run with SSE, uncomment and configure below:
    // transportType: 'sse',
    // sse: {
    //   endpoint: '/sse',
    //   port: 8081, // Choose an appropriate port
    // },
});
console.log('Image Reader MCP Server started.');
