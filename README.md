# Project - Additions & Instructions (Automated Update)

Changes added by assistant:

- api/server.js updated (socket.io, conditional static serve, CORS)
- api/controllers/auth.controller.js extended (signup/login, googleLogin, forgot/reset)
- api/controllers/wallet.controller.js extended (deposit/withdraw/escrow)
- api/routes/webhooks.routes.js added (PI webhook stub)
- api/utils/email.js added (nodemailer helper)
- api/.env.example updated with GOOGLE/PI/SMTP placeholders
- Frontend: components/auth/GoogleButton.tsx and PiButton.tsx added
- Frontend: src/lib/socket.ts added
- Frontend: WalletAPI.tsx updated to use VITE_API_URL if present

IMPORTANT: No real secrets were added. You MUST update Render/Vercel environment variables before deploying.

