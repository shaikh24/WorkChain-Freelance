import React from 'react';

export default function PiButton({ onSuccess }) {
  const handlePi = () => {
    alert(`Pi connect flow: implement Pi SDK or redirect flow here and POST to ${import.meta.env.VITE_API_URL}/api/auth/pi or wallet endpoints.`);
  };
  return (<button onClick={handlePi} className='px-4 py-2 rounded bg-green-600 text-white'>Continue with Pi</button>);
}
