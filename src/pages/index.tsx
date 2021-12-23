import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';

export interface Post {
  title: string;
  selftext: string;
  author: string;
}

const formatString = (string: string) =>
  string.split(/\n/).map((line, i) => <span key={i}>{line}</span>);

const assholeBtn =
  'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition w-full';
const notAssholeBtn =
  'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition w-full';

const Home: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data } = trpc.useQuery(['GET_POSTS']);

  if (!data) return <span>Loading</span>;
  console.log(data);
  const post = data[currentIndex];
  return (
    <section className="min-h-screen w-screen flex flex-col items-center pt-10">
      <article className="flex flex-col max-w-3xl h-min-80 border border-grey-100 rounded border-opacity-30">
        <div className="">
          <div className="flex justify-between border-b border-grey-70 border-opacity-20 p-3">
            <span className="text-2xl">{post.title}</span>
            <span className="">{post.author}</span>
          </div>
          <div className="p-3 whitespace-pre-line">{post.selftext}</div>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center px-3">
          <button
            className={assholeBtn}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Asshole
          </button>
          <button className={notAssholeBtn}>Not Asshole</button>
        </div>
      </article>
    </section>
  );
};

export default Home;
