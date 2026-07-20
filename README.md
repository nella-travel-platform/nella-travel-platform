# Nella Travel Platform

Nella Travel Platform is a production-ready foundation for a modern travel and booking platform built with a clean architecture approach.

## Architecture

- Backend: ASP.NET Core 9 Web API
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Data: PostgreSQL with Entity Framework Core
- Security: JWT authentication and Swagger/OpenAPI
- Observability: Serilog

## Solution Structure

- backend/Nella.Api
- backend/Nella.Application
- backend/Nella.Domain
- backend/Nella.Infrastructure
- backend/Nella.Shared
- backend/Nella.Tests
- frontend
- database
- deployment
- docs

## Getting Started

### Backend

```bash
dotnet restore
dotnet build
dotnet run --project backend/Nella.Api/Nella.Api.csproj
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

This repository currently contains the project foundation only. Business logic and domain features will be implemented in subsequent iterations.
