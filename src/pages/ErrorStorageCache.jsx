import React from "react";
import { persistor } from "../redux/store";

export default function ErrorStorageCache() {
  const purgePersistStorage = (e) => {
    e.preventDefault();
    persistor.purge().then(() => {
      console.log("has been purged");
      window.location.reload();
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold block text-lg">Something is wrong</h1>
        <a href="/" onClick={purgePersistStorage} className="text-primary">
          Back to home
        </a>
      </div>
    </div>
  );
}
