# GoAfterDark

GoAfterDark is an event ticketing platform for nightlife in Lagos.

Creators publish events. Eventees browse, book, and hold digital passes.

This repo is a React/Vite frontend plus a NestJS + Prisma + Neon API.

**Repository:** https://github.com/Catcode-Cynth/goafterdark

## What works

- Sign up and login
- Roles: `CREATOR` and `EVENTEE`
- After login:
  - Eventee → `/dashboard`
  - Creator → `/creator/dashboard`
- Protected routes using a JWT stored in the browser
- Event list API: `GET /events`
- Create event API: `POST /events` (Creator + Bearer token)
- Ticket purchase and QR verify endpoints on the API
- Frontend screens for login, sign up, attendee hub, creator dashboard, tickets, checkout, and create event

## Current limits (honest for reviewers)

- Attendee and Creator dashboards still show some mock event cards until they are fully wired to `GET /events`
- A new database has no events until a Creator creates one (`GET /events` returns `[]`)
- Payments are simulated
- `/api/docs` Swagger UI is not mounted in the current running API
- Neon free compute can go Idle; the first request after sleep may time out. Retry.

## Tech stack

**Frontend** (`frontend/`)
- React, Vite, TypeScript, React Router, Tailwind

**Backend** (repo root)
- NestJS, Prisma, PostgreSQL (Neon), JWT

## Ports (local)

| App | URL |
|---|---|
| Website | http://localhost:5173 |
| API | http://localhost:3000 |

Open the product at **5173**, not 3000.

## Local setup

### Backend

```bash
git clone https://github.com/Catcode-Cynth/goafterdark.git
cd goafterdark
npm install
Create .env in the repo root (do not commit it):

env
DATABASE_URL=your_neon_pooled_url
DIRECT_URL=your_neon_direct_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
PORT=3000
NODE_ENV=development
bash
npx prisma generate
npx prisma db push
npm run start:dev
Wait for:

text
Application is running on: http://localhost:3000
Frontend
bash
cd frontend
npm install
Create frontend/.env:

env
VITE_API_URL=http://localhost:3000
bash
npm run dev
Open http://localhost:5173/login

Auth
Sign up
POST /auth/signup

json
{
  "email": "you@example.com",
  "password": "secret12",
  "firstName": "Ada",
  "lastName": "Okafor",
  "role": "EVENTEE"
}
role must be EVENTEE or CREATOR.

Login
POST /auth/login

json
{
  "email": "you@example.com",
  "password": "secret12"
}
Response includes accessToken and user.role.

Use:

text
Authorization: Bearer ACCESS_TOKEN
API routes
Auth
POST /auth/signup
POST /auth/login
Events
GET /events
POST /events (JWT, Creator)
GET /events/:id/share
GET /events/:id/analytics
GET /events/reminders
Tickets
POST /tickets/pay
POST /tickets/buy
GET /tickets/verify?qrCode=...
Health
GET /
Frontend routes
Path	Screen
/	Public homepage
/login	Sign in
/signup	Create account
/dashboard	Eventee home
/events	Events feed
/tickets	My tickets
/creator/dashboard	Creator home
/creator/events/new	Create event
/creator/studio	Creator studio
/creator/attendees	Attendees
/creator/bookings	Bookings
/creator/profile	Creator profile
Demo flow
Wake Neon if the project is Idle
Start the API on 3000 and the site on 5173
Sign up as Creator and as Eventee
Confirm each role opens the correct dashboard
Create an event with POST /events and a Bearer token
Confirm GET /events is no longer empty
Notes
If login fails with a timeout, Neon is waking. Retry after a few seconds.
CORS is enabled for http://localhost:5173.
Never commit .env files.
Tests
bash
npm run test
npm run test:e2e
Author
Cynthia Okechukwu
https://github.com/Catcode-Cynth/goafterdark

