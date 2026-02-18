# CycleMaster

A WebSocket-based cycling measurement platform built with TypeScript and Node.js.

## Project Overview

CycleMaster is a real-time cycling data measurement system that uses WebSocket communication to stream and process cycling metrics including speed, cadence, heart rate, and power output.

## Features

- **WebSocket Server**: Real-time bidirectional communication with clients
- **TypeScript**: Full type safety and modern ES2020 features
- **Cycling Metrics**: Support for speed, cadence, heart rate, and power measurements
- **Extensible Architecture**: Easy to add new measurement types and features

## Project Structure

```
.
├── src/
│   ├── index.ts          # WebSocket server entry point
│   └── types.ts          # TypeScript interfaces and utilities
├── dist/                 # Compiled JavaScript output
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .github/
│   └── copilot-instructions.md  # Development instructions
└── .vscode/
    └── tasks.json        # VS Code build tasks
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Development Mode

Run the server in development mode with automatic compilation:
```bash
npm run dev
```

### Watch Mode

Start TypeScript compiler in watch mode:
```bash
npm run watch
```

### Production Mode

Start the compiled server:
```bash
npm start
```

The server will listen on port 8080 by default. You can specify a different port:
```bash
PORT=3000 npm start
```

## Development Tasks in VS Code

The project includes several tasks configured in `.vscode/tasks.json`:

- **Build** (`Ctrl+Shift+B`): Compile TypeScript to JavaScript
- **Dev**: Build and run the server
- **Watch**: Compile TypeScript in watch mode for development

## API Usage

### WebSocket Connection

Connect to the WebSocket server:
```typescript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to CycleMaster');
};

ws.onmessage = (event) => {
  console.log('Message from server:', event.data);
};
```

### Sending Measurements

Send cycling measurement data:
```typescript
const measurement = {
  timestamp: Date.now(),
  speed: 25.5,
  cadence: 90,
  heartRate: 140,
  power: 250
};

ws.send(JSON.stringify(measurement));
```

## Configuration

Key configuration files:

- **tsconfig.json**: TypeScript compiler options (target: ES2020, strict mode enabled)
- **package.json**: Node.js dependencies and npm scripts
- **.gitignore**: Files to exclude from version control

## Dependencies

### Production
- **ws** (v8.14.2): WebSocket server implementation

### Development
- **typescript** (v5.3.3): TypeScript compiler
- **@types/node** (v20.10.6): Node.js type definitions
- **@types/ws** (v8.5.10): WebSocket type definitions

## Scripts

- `npm run build` - Compile TypeScript
- `npm run dev` - Build and run the server
- `npm run watch` - Watch mode for development
- `npm start` - Run compiled JavaScript

## Troubleshooting

### Port Already in Use
If port 8080 is already in use, specify a different port:
```bash
PORT=3000 npm start
```

### TypeScript Compilation Errors
Ensure all dependencies are installed:
```bash
npm install
```

## Future Development

Potential enhancements:
- Database integration for storing cycling metrics
- Data visualization dashboard
- Real-time analytics and statistics
- Mobile client application
- Performance optimization for high-frequency data

## License

MIT
