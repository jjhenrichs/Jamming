const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scope = "user-read-private user-read-email";
const authUrl = new URL("https://accounts.spotify.com/authorize");
let code; // autorization code that is exchanged for an access token
let accessToken;

// Starting PKCE (Proof Key for Code Exchange) with creation of the code verifier
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Creating code challenge from code verifier
// 1) transform code veritfier into a SHA256 hash
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

// 2) Converting SHA256 hash into a code challenge via base64encode
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const requestUserAuth = (cv, cc) => {
  // Creating code verifier within local storage
  window.localStorage.setItem("code_verifier", cv);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: cc,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

// Requesting access token
const getToken = async (code) => {
  // stored in the previous step
  const codeVerifier = localStorage.getItem("code_verifier");

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
};

const Spotify = {
  async getAccessToken() {
    // Check if there is an access token in local storage
    if (accessToken) {
      return accessToken;
    }

    // if there is no access token, check if there is an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get("code");

    // if there is an authorization code, exchange it for an access token
    if (code) {
      await getToken(code);
      // Clean the code from the URL so it's not reused on refresh
      window.history.replaceState({}, document.title, "/");
      accessToken = localStorage.getItem("access_token");
      return accessToken;
    }

    // If no code or access token, initialize PKCE flow
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    requestUserAuth(codeVerifier, codeChallenge);
  },
};

export default Spotify;
