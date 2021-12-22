import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <article className="flex flex-col w-24 h-min-80 ">
        <div className=" bg-red-500">1</div>
        <div className=" bg-green-300">2</div>
      </article>
    </section>
  );
};

export default Home;
