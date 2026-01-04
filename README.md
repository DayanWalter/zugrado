# Zugrado

A showcase project demonstrating **Zustand**, **GraphQL**, and **Docker** in a Next.js application.

## Technologies

- **Next.js 16** - React Framework
- **Zustand** - State Management
- **GraphQL** - API with Apollo Client
- **Docker** - Containerization
- **Bun** - JavaScript Runtime & Package Manager
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling

## Prerequisites

- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) (optional, for containerization)

## Installation

```bash
bun install
```

## Development

Start the development server with Bun:

```bash
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## GraphQL Code Generation

Generate TypeScript types from the GraphQL schema:

```bash
bun run generate
```

## Docker

### With Docker Compose

Start the application in a container:

```bash
docker-compose up
```

### Manually with Docker

```bash
docker build -t zugrado .
docker run -p 3000:3000 zugrado
```

## Build

Create a production build:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Project Structure

- `components/` - React components
- `stores/` - Zustand state stores
- `app/` - Next.js App Router
- `__generated__/` - Generated GraphQL types
- `docker-compose.yaml` - Docker Compose configuration
- `Dockerfile` - Docker image definition
