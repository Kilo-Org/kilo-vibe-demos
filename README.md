# Vibe Demos

A collection of demo applications built with [Kilo Code](https://kilocode.com) to showcase different web development techniques and frameworks.

## Projects

This monorepo contains the following demo applications:

### 🎬 KiloFlix

_Location: `./kiloflix`_

A Netflix-style streaming platform clone built with vanilla HTML, CSS, and JavaScript. Features a responsive design with a modern streaming interface.

**Tech Stack:**

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript

### 🐍 Snake Game

_Location: `./snake-1`_

A classic Snake game implementation built with TypeScript and Vite, featuring modern development tooling and build processes.

**Tech Stack:**

- TypeScript
- Vite
- HTML5 Canvas

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vibe-demos
```

2. Install dependencies:

```bash
pnpm install
```

### Development

Run all projects in development mode:

```bash
pnpm dev
```

Or run individual projects:

**KiloFlix:**

```bash
cd kiloflix
pnpm dev
# Opens on http://localhost:8000
```

**Snake Game:**

```bash
cd snake-1
pnpm dev
# Opens on http://localhost:5173
```

### Building

Build all projects:

```bash
pnpm build
```

### Deployment

**Snake Game to Cloudflare Pages:**

```bash
cd snake-1
pnpm build
pnpm deploy
```

## Project Structure

```
vibe-demos/
├── kiloflix/           # Netflix-style streaming platform
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── package.json
├── snake-1/            # TypeScript Snake game
│   ├── src/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── package.json        # Root package.json with workspace config
├── pnpm-workspace.yaml # pnpm workspace configuration
├── turbo.json          # Turborepo pipeline configuration
└── README.md
```

## Built with Kilo Code

These demos were created using [Kilo Code](https://kilocode.com), an AI-powered coding assistant that helps developers build applications quickly and efficiently.

## License

This project is open source and available under the [MIT License](LICENSE).
