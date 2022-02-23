import React from 'react';
import { Link } from 'react-router-dom';

export default function Appbar() {
  return (
    <div className="flex bg-primary py-4 px-4 justify-between">
      <div className="font-bold">
        <Link to="/app">
          <img className="max-h-[30px]" src="/logo-white.png" alt="" />
        </Link>
      </div>
      <div>
        <img className="rounded-full max-h-[35px]" src="https://i.pravatar.cc/150?img=37" alt="" />
      </div>
    </div>
  );
}
