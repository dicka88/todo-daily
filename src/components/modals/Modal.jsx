import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function AboutAppModal({ open, setIsOpen, title, children }) {
  return (
    <Dialog
      open={open}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white mx-auto w-full max-w-md rounded-2xl p-6 my-8 shadow-xl transition-all transform">
          <div className="pb-4">
            <Dialog.Title className="font-bold text-2xl">{title}</Dialog.Title>
          </div>
          <div className="text-gray">
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
