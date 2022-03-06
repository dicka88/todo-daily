import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <img
          src="/notfound.png"
          className="max-w-[120px] mx-auto mb-4"
          alt=""
        />
        <span className="text-primary text-5xl block font-bold my-10">
          Oops..
        </span>
        <span className="text-lg block text-gray">Page seem is not found</span>
        <Link to="/" className="text-primary">
          Go back
        </Link>
      </div>
    </div>
  );
}
