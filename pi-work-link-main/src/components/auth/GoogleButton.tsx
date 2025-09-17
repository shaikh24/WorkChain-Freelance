import React from 'react';

export default function GoogleButton({ onSuccess }) {
  const handleGoogle = () => {
    // Frontend should integrate Google Identity Services to get id_token and POST to /api/auth/google
    alert('Integrate Google Identity Services on this page and send idToken to /api/auth/google');
  };
  return (<button onClick={handleGoogle} className='px-4 py-2 rounded bg-blue-600 text-white'>Continue with Google</button>);
}
