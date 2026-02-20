export const handler = async () => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUrl = `${process.env.URL}/.netlify/functions/auth-callback`;
  const authUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    `&scope=repo,user`;

  return {
    statusCode: 302,
    headers: { Location: authUrl },
  };
};
