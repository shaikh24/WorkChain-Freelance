import { BASE_URL } from '@/lib/api';
const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export const walletAPI = {
  getWallet: async () => {
    const res = await fetch(`${BASE_URL}/wallet`, { headers: getAuthHeaders() });
    return res.json();
  },
  getTransactions: async () => {
    const res = await fetch(`${BASE_URL}/wallet/transactions`, { headers: getAuthHeaders() });
    return res.json();
  },
  deposit: async (amount) => {
    const res = await fetch(`${BASE_URL}/wallet/deposit`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ amount }) });
    return res.json();
  },
  withdraw: async (amount, address) => {
    const res = await fetch(`${BASE_URL}/wallet/withdraw`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ amount, address }) });
    return res.json();
  },
  escrow: async (amount, gigId, toUserId) => {
    const res = await fetch(`${BASE_URL}/wallet/escrow`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ amount, gigId, toUserId }) });
    return res.json();
  }
};

export type WalletData = {
  balance: number;
  pendingBalance?: number;
  totalEarnings?: number;
  monthlyChange?: number;
  walletAddress?: string;
  fullAddress?: string;
};

export type Transaction = {
  id: string;
  type: string;
  description?: string;
  amount: number;
  date?: string;
  status?: string;
  from?: string;
  txHash?: string;
};