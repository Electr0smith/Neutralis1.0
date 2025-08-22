import Link from 'next/link';
import React from 'react';

const NavBanner = () => {
  return (
    <div style={{ 
      background: '#333', 
      color: '#fff', 
      padding: '10px', 
      display: 'flex', 
      gap: '10px' 
    }}>
      <Link href="/"><button>Home</button></Link>
      <Link href="/about"><button>About</button></Link>
      <Link href="/contact"><button>Contact</button></Link>
      {/* Add more pages as needed */}
    </div>
  );
};

export default NavBanner;
