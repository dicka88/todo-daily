import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PrimaryButton from '../components/ui/PrimaryButton';

const StepItem = ({ title, img }) => {
  return (
    <div className='text-center transition-all duration-200 hover:scale-105'>
      <div className="mx-auto rounded-md flex items-center aspect-square max-w-[150px] bg-[#ffefef] p-6 mb-3">
        <img className="mx-auto w-[80px] h-[80px]" src={img} alt={title} />
      </div>
      <span className="font-bold text-[1.2rem]">{title}</span>
    </div>
  );
};

export default function index() {
  return (
    <div className="container lg:max-w-[1280px] mx-auto">
      <Navbar />

      <section className='pt-4 pb-12'>
        <div className="pt-8 text-center w-full">
          <Fade bottom>
            <h1 className="text-lg leading-normal font-bold font-rosario text-[2rem] md:text-[40px] mb-4">
              Organizing your day activity <br />
              with Todo Daily
            </h1>
          </Fade>
          <Link to="/app">
            <PrimaryButton className={"text-[1.5rem]"}>
              Get started
            </PrimaryButton>
          </Link>
        </div>
        <div className="">
          <img className="w-full" src="/hero.png" alt="" />
        </div>
      </section >

      <section className='py-4 text-center'>
        <h1 className='font-bold text-[1.5rem] md:text-[30px] mb-6'>
          Don’t let your day doing nothing
        </h1>
        <div className="py-20">
          <div className="flex flex-wrap justify-center">
            <Fade bottom>
              <div className='basis-1/2 md:basis-1/4 mb-4 '>
                <StepItem title="Small task" img="/icons/task.svg" />
              </div>
            </Fade>
            <Fade bottom delay={200}>
              <div className='basis-1/2 md:basis-1/4 mb-4 '>
                <StepItem title="Write it" img="/icons/edit.svg" />
              </div>
            </Fade>
            <Fade bottom delay={300}>
              <div className='basis-1/2 md:basis-1/4 mb-4 '>
                <StepItem title="Do it" img="/icons/work-history.svg" />
              </div>
            </Fade>
            <Fade bottom delay={400}>
              <div className='basis-1/2 md:basis-1/4 mb-4 '>
                <StepItem title="Repeat" img="/icons/event-repeat.svg" />
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
            <h1 className="font-bold font-rosario text-[2rem] md:text-[36px] mb-4">Achieve your target <br /> and won your time</h1>
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
