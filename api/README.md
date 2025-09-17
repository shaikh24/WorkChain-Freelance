# PI Work Backend (Express + MongoDB + JWT) - Production-ready scaffold

## Overview
This backend provides authentication (JWT), gigs CRUD, and wallet transaction endpoints for the PI Work frontend.

## Quickstart (local)
1. Install dependencies:
```bash
cd api
npm install
```
2. Create `.env` from `.env.example` and set your MongoDB Atlas connection + JWT secret.
3. Seed sample data (optional):
```bash
npm run seed
```
4. Start server:
```bash
npm run dev
# or for production
npm start
```

## Deploy
- Use Render, Railway, or Heroku. Set environment variables on the service (MONGO_URI, JWT_SECRET, PORT, CORS_ORIGIN).
- Ensure `NODE_ENV=production` for production settings (rate limiter will still work).

## API Endpoints (base `/api`)
- `POST /api/auth/signup` - register
- `POST /api/auth/login` - login (returns JWT)
- `GET /api/gigs` - list gigs (public)
- `POST /api/gigs` - create gig (protected)
- `GET /api/gigs/:id` - get one gig
- `PUT /api/gigs/:id` - update (protected)
- `DELETE /api/gigs/:id` - delete (protected)
- `GET /api/wallet` - get wallet for user (protected)
- `POST /api/wallet/deposit` - deposit (protected)
- `POST /api/wallet/withdraw` - withdraw (protected)

