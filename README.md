# Task Management Frontend

A simple Angular frontend for a Task Management system. It provides authentication (login/register) and CRUD operations for tasks with a clean Bootstrap UI and ngx-datatable for listing.

## Tech Stack
- Angular 14, RxJS
- Bootstrap 5, ng-bootstrap
- @swimlane/ngx-datatable

## Prerequisites
- Node.js LTS (v16+ recommended)
- npm
- Backend API running and reachable (default baseUrl: http://localhost:9003)

## Quick Start
1. Clone this repo
2. Change into the Angular app directory:
   - `cd task-management`
3. Install dependencies:
   - `npm install`
4. Run the dev server:
   - `npm start`
5. Open http://localhost:4200 in your browser

## Configuration
- API base URL is set in:
  - `task-management/src/environments/environment.ts`
  - `task-management/src/environments/environment.prod.ts`
- Update `baseUrl` to point to your backend. Example:
  - `baseUrl: 'http://localhost:9003'`

## Available Scripts (from task-management directory)
- `npm start` — Start dev server on http://localhost:4200
- `npm run build` — Production build

## Features
- Login and Registration (JWT token stored in localStorage)
- Tasks: list (with ngx-datatable), create, update (modal), view single, delete (SweetAlert confirmation)
- Bootstrap-based responsive UI
- Centralized API URL and shared TaskResponse model

## Notes
- Ensure the backend implements the required endpoints under `${baseUrl}` (e.g., `/auth/login`, `/auth/register`, `/api/tasks`).
