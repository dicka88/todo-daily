import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t-2 border-t-primary py-12">
      <div className="grid md:grid-cols-2">
        <div>
          <div className="flex mb-8">
            <img className="mr-4" src="/icon.svg" alt="" />
            <div>
              <p>Lets change your habit</p>
              <p>Join with million people</p>
            </div>
          </div>
          <div>
            <p>DK Tech Company</p>
            <p className="text-gray">Uma street, Lost City, Aincard, World</p>
          </div>
        </div>
        <div className="flex">
          <div className="mx-4">
            <h2 className="text-primary mb-4">
              Features
            </h2>
            <ul className="list-none">
              <li className='mb-2 text-gray'>Lorem</li>
              <li className='mb-2 text-gray'>Ipsum</li>
              <li className='mb-2 text-gray'>Ipsum</li>
              <li className='mb-2 text-gray'>Ipsum</li>
            </ul>
          </div>
          <div className="mx-4">
            <h2 className="text-primary mb-4">
              Pricing
            </h2>
            <ul className="list-none">
              <li className='mb-2 text-gray'>Lorem</li>
              <li className='mb-2 text-gray'>Ipsum</li>
              <li className='mb-2 text-gray'>Ipsum</li>
              <li className='mb-2 text-gray'>Ipsum</li>
            </ul>
          </div>
          <div className="mx-4">
            <h2 className="text-primary mb-4">
              Navigation
            </h2>
            <ul className="list-none">
              <li className='mb-2 text-gray'>Lorem</li>
              <li className='mb-2 text-gray'>Ipsum</li>
              <li className='mb-2 text-gray'>Ipsum</li>
              <li className='mb-2 text-gray'>Ipsum</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
