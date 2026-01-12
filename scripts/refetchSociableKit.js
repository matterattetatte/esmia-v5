fetch("https://api.sociablekit.com/api/sync-requests/create", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer 1134997|1twy9feReg9mJfcr7eKvgpomBWVhIxi2kRWOmvrS",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Brave\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1"
  },
  "referrer": "https://www.sociablekit.com/",
  "body": "{\"embed_id\":25624561,\"type\":13}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then(response => {
  return response.json();
}).then(data => {
  console.log(data);
}).catch(err => {
  console.error(err);
});