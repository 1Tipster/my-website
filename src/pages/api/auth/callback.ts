import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: import.meta.env.GITHUB_CLIENT_ID,
      client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenResponse.json();

  const postMsgScript = `
    <script>
      (function() {
        function receiveMessage(e) {
          console.log("receiveMessage %o", e);
          window.opener.postMessage(
            'authorization:github:${data.error ? "error" : "success"}:${JSON.stringify(data.error ? data : { provider: "github", token: data.access_token })}',
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  `;

  return new Response(postMsgScript, {
    headers: { 'Content-Type': 'text/html' },
  });
};
