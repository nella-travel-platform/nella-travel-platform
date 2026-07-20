# Development Guide

## Prerequisites

- .NET 9 SDK
- Node.js 20+
- Docker Desktop

## Backend

1. Restore packages: `dotnet restore`
2. Start PostgreSQL: `docker compose -f database/docker-compose.yml up -d`
3. Run the API: `dotnet run --project backend/Nella.Api/Nella.Api.csproj`

## Frontend

1. Install dependencies: `cd frontend && npm install`
2. Start development server: `npm run dev`

## Validation

- `dotnet test`
- `npm run build`
