export const handler = async (event) => {
  const { code } = event.queryStringParameters;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "text/html" },
      body: `<!DOCTYPE html><html><body><script>
(function() {
  window.opener.postMessage(
    "authorization:github:error:" + ${JSON.stringify(JSON.stringify({ message: "OAuth authorization failed" }))},
    document.referrer
  );
})();
</script></body></html>`,
    };
  }

  const tokenData = JSON.stringify({ token: data.access_token, provider: "github" });

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `<!DOCTYPE html><html><body><script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      "authorization:github:success:" + ${JSON.stringify(tokenData)},
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`,
  };
};
