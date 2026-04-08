const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
let accessToken = null;

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

const initializePKCE = async () => {
  // Generating a code verifier
  const codeVerifier = generateRandomString(64);

  // Genreating code challenge from the code verifier
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  sessionStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope: "user-read-private playlist-modify-public playlist-modify-private",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

const getToken = async (code) => {
  // stored in the previous step
  const codeVerifier = sessionStorage.getItem("code_verifier");

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

  if (response.error) {
    console.error("Token exchange failed:", response.error);
    return; // ✅ don't overwrite valid tokens if the exchange fails
  }

  sessionStorage.setItem("refresh_token", response.refresh_token);
  sessionStorage.setItem("access_token", response.access_token);
  sessionStorage.setItem(
    "token_expiry",
    Date.now() + response.expires_in * 1000,
  ); // Store expiry time
};

const Spotify = {
  async getAccessToken() {
    // Return existing valid token if we have one
    accessToken = sessionStorage.getItem("access_token");

    if (accessToken && accessToken !== "undefined") {
      return accessToken;
    }

    // If no token is found, check to see if there is an authorization code
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    sessionStorage.setItem("auth_code", code); // Proof that the code is being retrieved correctly

    if (code) {
      await getToken(code);

      // Clean the code from the URL so it is not reused on refresh
      window.history.replaceState({}, document.title, "/");
      return sessionStorage.getItem("access_token");
    }

    // If the code nor the access token is found start PKCE (Proof Key for Code Exchange) authorization flow
    initializePKCE();
  },
  async getRefreshToken() {
    // refresh token that has been previously stored
    const refreshToken = sessionStorage.getItem("refresh_token");
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

    if (response.error) {
      console.error("Token exchange failed:", response.error);
      return; // ✅ don't overwrite the valid token
    }

    sessionStorage.setItem("access_token", response.access_token);
    sessionStorage.setItem(
      "token_expiry",
      Date.now() + response.expires_in * 1000,
    ); // Update expiry time

    if (response.refresh_token) {
      sessionStorage.setItem("refresh_token", response.refresh_token);
    }
  },
  async search(song) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${song}&type=track&market=EN&offset=0&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      },
    );

    if (response.status === 200) {
      const data = await response.json();
      return data.tracks.items.map((track) => ({
        id: track.id,
        song_name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } else {
      console.error("Search failed with status:", response);
    }
  },
  async savePlaylist(playlistName, trackUris) {
    let token = sessionStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Creating a new playlist
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: playlistName,
        description: "Created with Jamming App",
        public: false,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create playlist:", response);
      return;
    }

    const playlist_data = await response.json();
    const playlist_id = playlist_data.id;

    // Adding tracks to the playlist
    const response_tracks = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/items`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          uris: trackUris,
        }),
      },
    );

    if (!response_tracks.ok) {
      console.error("Failed to add tracks to playlist:", response_tracks);
      return;
    }

    const tracks_data = await response_tracks.json();
    return tracks_data;
  },
};

export default Spotify;
