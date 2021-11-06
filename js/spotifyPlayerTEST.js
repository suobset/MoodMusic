window.onSpotifyWebPlaybackSDKReady = () => {
    const token = '[My access token]';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(BQBwHZAM2Jgc8bpT9adXK8kukyXsiaKNAhRK7ybT-hH73NYXdYj2m0aasS27MXXzl6KeJN-TbRkklbRg-tecKAZUnP18FVspf-bRewsB7KZBFjQ03YV2mm2cD19wUOpxrsWxBMje4btpWet7ZlRGYq2G1ObPFDA9m0AEVKw9ryKWwddjB_H0jEIrY6s); },
      volume: 0.5
    })};