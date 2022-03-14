import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t-2 border-t-primary py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2">
          <div className='mb-8'>
            <div className="flex mb-8">
              <img className="mr-4" src="/icon.svg" alt="" />
              <div>
                <p>Lets change your habit</p>
                <p>Join with million people</p>
              </div>
            </div>
            <div>
              <p>DK Tech Company</p>
              <p className="text-gray">Klaten, Central Java, Indonesia</p>
            </div>
          </div>
          <div className="flex gap-10 flex-wrap md:justify-end">
            <div className="">
              <h2 className="text-primary mb-4">
                Features
              </h2>
              <ul className="list-none">
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Realtime</Link>
                </li>
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Unlimited</Link>
                </li>
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Sync</Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-primary mb-4">
                Pricing
              </h2>
              <ul className="list-none">
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Business</Link>
                </li>
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Organization</Link>
                </li>
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Personal</Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="text-primary mb-4">
                Navigation
              </h2>
              <ul className="list-none">
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Signin</Link>
                </li>
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">FAQ</Link>
                </li>
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Guide</Link>
                </li>
                <li className='mb-2 text-gray hover:underline'>
                  <Link to="/">Pricing</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
