import React, { Component, useEffect } from 'react';

const Game = () => {
    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        const video = document.createElement("video");

        const startup = () => {
            video.loop = false;
            video.muted = false;
            video.src = 'data/fmv2.m4v';

            function mainloop() {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(mainloop);
            }
            requestAnimationFrame(mainloop);
        };

        video.addEventListener('play', startup);
        video.play();

        return () => {
            video.removeEventListener('play', startup);
        };
    });

    return (
        <div>
            <canvas width="1280" height="720" />
        </div>
    );
};

class App extends Component {
    render() {
        return <Game />;
    }
};

export default App;
