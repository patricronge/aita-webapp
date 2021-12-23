import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { Post } from '../..';

const BASE_URL =
  'https://api.pushshift.io/reddit/search/submission?subreddit=amitheasshole&user_removed=true&mod_removed=true';
// const BASE_URL = 'https://reddit.com/r/amitheasshole/.json?limit=1';

const appRouter = trpc.router().query('GET_POSTS', {
  // input: z
  //   .object({
  //     after: z.string().nullish()
  //   })
  //   .nullish(),
  async resolve({ input }) {
    // const qs = input?.after ? `?after=${input.after}` : '';
    const url = BASE_URL;
    const getPosts = fetch(url).then((res) => res.json());
    const { data } = await getPosts;
    const response = data.map((item: any) => {
      return {
        selftext: decodeURIComponent(item.selftext),
        title: item.title,
        author: `/u/${item.author}`
      };
    });
    return response.filter((x: Post) => x.selftext !== '[removed]');
  }
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null
});
