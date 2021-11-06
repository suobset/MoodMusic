import React, { useState, useEffect } from 'react';

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();

        };
    }, []);

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">

                        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>
                            <div className="data">
                            <span class="tooltiptext">
                                <p>Emotion: <a id="valenceColor"></a> you've recently listened to music that is<b><a id="valenceString"></a></b></p>
                                <p>Energy: <a id="energy"></a> you've listened to <b><a id="energy1"></a> energetic</b> songs.</p>
                            </span>
                            </div>

                            <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                                &lt;&lt;
                            </button>

                            <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </button>

                            <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

 ////////// MUSIC VARIABLES ////////////
 var valence = '<%= d.valence %>';
 var energy = '<%= d.energy %>';
 //////////////////////////////////////
 var musicHues = ['monochrome', 'blue', 'green', 'purple', 'pink', 'red', 'orange', 'yellow'];
 var musicKHues = ['yellow', 'yellow', 'orange', 'red', 'red', 'pink', 'pink', 'purple', 'blue', 'blue', 'green', 'green'];
 var musicLums = ['light', 'bright', 'bright', 'bright', 'light', 'bright', 'light', 'bright', 'bright', 'light', 'bright', 'light'];
 /////////////////////////////////////

 function setup() {
    // VALENCE -- Background color
    var valenceColor = musicHues[Math.round(map(valence, 0.0, 1.0, 0, 7))];
    document.getElementById("valenceColor").innerText = valenceColor.toString();

    if (valence > 0.5)
        document.getElementById("valenceString").innerText = "happy or cheerful";
    else
        document.getElementById("valenceString").innerText = "sad or angry";
    if (energy > 0.5) {
        document.getElementById("energy").innerText = "more";
        document.getElementById("energy1").innerText = "more";
    } else {
        document.getElementById("energy").innerText = "less";
        document.getElementById("energy1").innerText = "less";
    }
 }
export default WebPlayback
