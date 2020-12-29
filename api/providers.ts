import createFetch from '@vercel/fetch';
import { NowApiHandler } from '@vercel/node';

const fetch = createFetch();

const handler: NowApiHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }

  const response = await fetch('https://oembed.com/providers.json', {
    headers: { Accept: 'application/json' },
  });

  const providers = await response.json();

  res.setHeader('Access-Control-Allow-Origin', '*');
  // this doesn't get sent to the client. it's actually a pragma for vercel
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  res.json(providers);
};

export default handler;
