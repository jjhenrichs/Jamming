const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

// Creating a code verifier
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Hashing the code verifier using SHA-256
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

// Returning a base64 representation of the hashed code verifier
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

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

const initializePKCE = async () => {
  // Generating a code verifier
  const codeVerifier = generateRandomString(64);

  // Genreating code challenge from the code verifier
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope: "user-read-private user-read-email",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  console.log("Redirecting to Spotify authorization URL:", authUrl.toString());
  window.location.href = authUrl.toString();
};

const Spotify = {
  async getAccessToken() {
    // Return existing valid token if we have one
    const accessToken = localStorage.getItem("access_token");

    if (accessToken === null) {
      console.log("No access token found in localStorage.");
    }

    if (accessToken === "undefined") {
      console.log("Access token is undefined.");
    }

    if (accessToken && accessToken !== "undefined") {
      console.log("Using existing access token:", accessToken);
      return accessToken;
    }

    // If no token is found, check to see if there is an authorization code
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    console.log("Authorization code from URL:", code);

    if (code) {
      await getToken(code);

      // Clean the code from the URL so it is not reused on refresh
      window.history.replaceState({}, document.title, "/");
      console.log(localStorage.getItem("access_token"));
      return localStorage.getItem("access_token");
    }

    // If the code nor the access token is found start PKCE (Proof Key for Code Exchange) authorization flow
    initializePKCE();
  },
  async getRefreshToken() {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem("refresh_token");
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      }),
    };
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem("access_token", response.access_token);
    if (response.refresh_token) {
      localStorage.setItem("refresh_token", response.refresh_token);
    }
  },
  async search(song) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?offset=0&limit=10&query=${song}&type=track&locale=en-US,en;q%3D0.9`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    const data = await response.json();
    console.log("Search results:", data);
  },
};

export default Spotify;
