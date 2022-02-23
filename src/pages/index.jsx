import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PrimaryButton from '../components/ui/PrimaryButton';
import Fade from 'react-reveal/Fade';

export default function index() {
  return (
    <div className="container lg:max-w-[1280px] mx-auto">
      <Navbar />

      <section className='pt-4 pb-12 relative'>
        <div className="pt-8 text-center  absolute top-0 w-full">
          <Fade bottom>
            <h1 className="text-lg leading-normal font-bold font-rosario text-[40px] mb-4">
              Organizing your day activity <br />
              with Todo Daily
            </h1>
          </Fade>
          <Link to="/app">
            <PrimaryButton>
              Get started
            </PrimaryButton>
          </Link>
        </div>
        <div className='pt-12'>
          <img className="w-full -pt-14" src="/hero.png" alt="" />
        </div>
      </section >

      <section className='py-4 text-center'>
        <h1 className='text-lg font-bold text-[36px] mb-6'>
          Don’t let your day doing nothing
        </h1>
        <div className="py-20">
          <div className="flex flex-wrap justify-center">
            <Fade bottom>
              <div className='basis-1/2 md:basis-1/4 mb-4 text-center'>
                <div className="mx-auto border-2 border-primary rounded-md flex items-center aspect-square max-w-[150px] p-6 mb-3">
                  <img className="mx-auto w-[70px] h-[70px]" src="/icons/task.svg" alt="task" />
                </div>
                <span className="font-bold">Small task</span>
              </div>
            </Fade>
            <Fade bottom delay={200}>
              <div className='basis-1/2 md:basis-1/4 mb-4 text-center'>
                <div className="mx-auto border-2 border-primary rounded-md flex items-center aspect-square max-w-[150px] p-6 mb-3">
                  <img className="mx-auto w-[70px] h-[70px]" src="/icons/edit.svg" alt="task" />
                </div>
                <span className="font-bold">Write it</span>
              </div>
            </Fade>
            <Fade bottom delay={400}>
              <div className='basis-1/2 md:basis-1/4 mb-4 text-center'>
                <div className="mx-auto border-2 border-primary rounded-md flex items-center aspect-square max-w-[150px] p-6 mb-3">
                  <img className="mx-auto w-[70px] h-[70px]" src="/icons/work-history.svg" alt="task" />
                </div>
                <span className="font-bold">Do it</span>
              </div>
            </Fade>
            <Fade bottom delay={600}>
              <div className='basis-1/2 md:basis-1/4 mb-4 text-center'>
                <div className="mx-auto border-2 border-primary rounded-md flex items-center aspect-square max-w-[150px] p-6 mb-3">
                  <img className="mx-auto w-[70px] h-[70px]" src="/icons/event-repeat.svg" alt="task" />
                </div>
                <span className="font-bold">Repeat</span>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-40">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className='md:px-12 flex justify-end'>
            <img className="" src="/productive.png" alt="" />
          </div>
          <div className="pt-4 text-center md:text-left">
            <h1 className="font-bold font-rosario text-[36px] mb-4">Achieve your target <br /> and won your time</h1>
            <Link to="/app">
              <PrimaryButton>
                Get started
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
