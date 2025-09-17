# Frontend Integration (WalletAPI)
Add these lines into your frontend where you handle API base URL (e.g., src/config/api.ts or WalletAPI.tsx).

Replace YOUR_BACKEND_URL with your deployed backend domain like https://api.yoursite.com

Example using fetch:

```ts
const BASE_URL = process.env.REACT_APP_API_URL || 'https://YOUR_BACKEND_URL/api';

export async function getWallet() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/wallet`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function deposit(amount) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/wallet/deposit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ amount })
  });
  return res.json();
}
```

Set environment variable in Vercel/Netlify/hosting: `REACT_APP_API_URL=https://YOUR_BACKEND_URL/api`

Also update `src/components/wallet/WalletAPI.tsx` to call these endpoints accordingly.
