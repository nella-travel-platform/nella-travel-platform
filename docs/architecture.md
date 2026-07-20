# Architecture Overview

## Backend

- ASP.NET Core 9 Web API
- Clean Architecture with separation between API, Application, Domain, Infrastructure, and Shared layers
- Entity Framework Core with PostgreSQL support
- Serilog for structured logging
- Swagger/OpenAPI for API documentation

## Frontend

- Next.js with React and TypeScript
- Tailwind CSS for design system styling
- App Router structure for scalable UI development

## Deployment

- Dockerized backend and frontend services
- PostgreSQL container for local development
- GitHub Actions CI for backend and frontend validation
