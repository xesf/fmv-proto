import React, { Component, useEffect } from 'react';

let tick = null;
let prevTick = Date.now();
let elapsed = null;
const fps = 1000 / 60;

const state = {
    frameId: null,
};

let prevTickRewind = Date.now();
let canRewind = false;
let rewinding = false;

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || ((f) => setTimeout(f, 1000/60));

const Game = () => {
    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        const video = document.createElement("video");

        const run = (tick, elapsed) => {
            /*const elapsedRewind = tick - prevTickRewind;
        
            // rewind elapsed time
            if (elapsedRewind > 100) {
                prevTickRewind = tick - (elapsedRewind % fps);

                if (!canRewind 
                    && video.currentTime !== undefined
                    && video.currentTime > 5) { // > 6.1) {
                    console.log('canRewind');
                    // video.pause();
                    canRewind = true;
                    rewinding = true;
                }

                if (canRewind) {
                    if (rewinding) {
                        video.currentTime -= 0.01;
                        if (video.currentTime < 6.5) {
                            rewinding = !rewinding;
                        }
                    } else {
                        video.currentTime += 0.01;
                        if (video.currentTime > 7.1) {
                            rewinding = !rewinding;
                        }
                    }
                    console.log(video.currentTime);
                }
            }*/

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            return false;
        }
        
        const mainloop = () => {
            state.frameId = requestAnimationFrame(mainloop);
        
            tick = Date.now();
            elapsed = tick - prevTick;
        
            if (elapsed > fps) {
                prevTick = tick - (elapsed % fps);
            }
        
            if (run(tick, elapsed)) {
                cancelAnimationFrame(state.frameId);
            }
        }

        video.loop = false;
        video.muted = false;
        video.autoplay = false;
        video.src = 'data/fmv2.m4v';
        // video.addEventListener('play', startup);
        video.play();
        mainloop();

        return () => {
            // video.removeEventListener('play', startup);
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
