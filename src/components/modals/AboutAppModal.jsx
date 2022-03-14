import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function AboutAppModal({ open, setIsOpen }) {
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
            <Dialog.Title className="font-bold text-xl">About this app</Dialog.Title>
          </div>
          <div className="text-gray">
            <div className="pb-6">
              <Dialog.Description>Todo Daily is inspired by Todoist</Dialog.Description>
              <Dialog.Description >
                Created by <a href="https://github.com/dicka88" className='text-primary'> Dicka Ismaji </a>
              </Dialog.Description>
            </div>
            <div className="pb-6">
              <p>Technology: </p>
              <ol className="list-decimaly">
                <li>React</li>
                <li>Tailwindcss</li>
                <li>Firebase</li>
                <li>Redux</li>
              </ol>
            </div>
            <p>You can contribute on <a href="https://github.com/dicka88/todo-daily" className='text-primary' target="_blank">Github</a></p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
