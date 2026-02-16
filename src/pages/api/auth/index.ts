import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ redirect }) => {
  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('scope', 'repo,user');

  return redirect(authUrl.toString(), 301);
};
