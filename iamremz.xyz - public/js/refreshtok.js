const clientId = 'eb8cf48b30a84529b0e186d16f8e9a56';
const clientSecret = '3b5a1a49e0354344b74bcdca8ffd4725';
const redirectUri = 'http://localhost:3000/callback';
const code = 'AQDpw7yV3r1d_mAwTHJSEriz7008NDaZQGzszsjTlUCU0De4bGWuB6actR3HxYDM8Ccf9I3xWIRX8idYN5WBioWXAGAHLMDbHQ8lb4V-Rvsba65YVg7dZc5sJpk7qeGU7oUvb7suLRxWyMZelf4gieARKEYTd7W1iTLzDNVy9S1_dwi3ZTjomcm3KFGHpo8O3mjCY-yfZv7vXsIVIy84r0fssC3m8Q';

async function getRefreshToken() {
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    })
  });

  const data = await response.json();
  if (data.refresh_token) {
    console.log('Your refresh token:', data.refresh_token);
  } else {
    console.error('Error:', data);
  }
}

getRefreshToken();