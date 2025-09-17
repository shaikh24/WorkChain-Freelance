# Deployment Notes (short)
- For Render: create a new web service from GitHub, point to this repo folder, set environment variables MONGO_URI and JWT_SECRET, set build and start commands: `npm ci && npm start`.
- For Vercel (frontend): set REACT_APP_API_URL to backend URL.
- Docker: build `docker build -t pi-work-backend .` and run `docker run -e MONGO_URI=... -p 5000:5000 pi-work-backend`
