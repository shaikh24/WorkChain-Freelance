Added ForgotPassword and ResetPassword frontend pages and API routes /api/auth/forgot and /api/auth/reset. Frontend pages are at src/pages/ForgotPassword.tsx and ResetPassword.tsx.

Wallet: Added /api/wallet/transactions endpoint and frontend Wallet page wired to backend.


# Automated fixes applied
- Added .dockerignore
- Updated api/Dockerfile to multi-stage build
- Added api/lib/logger.js (pino)
- Patched API server to use helmet, cors, and logger (where detected)
- Replaced many console.log occurrences in api/ with logger usage
- Added DOMPurify to frontend and sanitized dangerouslySetInnerHTML occurrences
- Added storage-warning helper advising migration from localStorage to HTTP-only cookies
- Appended JWT_SECRET placeholder to api/.env.example
