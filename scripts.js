var video = document.getElementById("video");
var playButton = document.getElementById("play-pause");
var muteButton = document.getElementById("mute");
var fullScreenButton = document.getElementById("full-screen");
var seekBar = document.getElementById("seek-bar");
var volumeBar = document.getElementById("volume-bar");
var currentTimeLabel = document.getElementById("current-time");
var durationLabel = document.getElementById("duration");

function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
        playButton.innerHTML = "<i class='fa fa-pause'></i>";
    } else {
        video.pause();
        playButton.innerHTML = "<i class='fa fa-play'></i>";
    }
}

function updateSeekBar() {
    var value = (100 / video.duration) * video.currentTime;
    seekBar.value = value;
    currentTimeLabel.innerHTML = formatTime(video.currentTime);
    durationLabel.innerHTML = formatTime(video.duration);
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    return minutes + ":" + remainingSeconds;
}

function updateVideoTime() {
    var time = (video.duration / 100) * seekBar.value;
    video.currentTime = time;
}

function toggleMute() {
    if (video.muted) {
        video.muted = false;
        muteButton.innerHTML = "<i class='fa fa-volume-up'></i>";
    } else {
        video.muted = true;
        muteButton.innerHTML = "<i class='fa fa-volume-off'></i>";
    }
}

function updateVolume() {
    video.volume = volumeBar.value / 100;
}

function toggleFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
}

playButton.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateSeekBar);
seekBar.addEventListener("input", updateVideoTime);
muteButton.addEventListener("click", toggleMute);
volumeBar.addEventListener("input", updateVolume);
fullScreenButton.addEventListener("click", toggleFullScreen);