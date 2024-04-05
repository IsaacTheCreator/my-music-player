const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playlist = document.getElementById('playlist');
const coverImage = document.getElementById('coverImage');

let currentTrackIndex = 0;
let isShuffled = false;

const tracks = [
    { name: 'Lofi - Study ', src: 'music.mp3', cover: 'cover.jpg' },
    { name: 'Lofi - Mood', src: 'music 2.mp3', cover: 'cover 2.jpg' },
    { name: 'Lofi - Sleep', src: 'music 3.mp3', cover: 'cover 3.jpg' }
];

// Function to initialize the playlist
function initPlaylist() {
    playlist.innerHTML = '';
    tracks.forEach((track, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = track.name;
        listItem.addEventListener('click', () => {
            currentTrackIndex = index;
            playTrack(currentTrackIndex);
        });
        playlist.appendChild(listItem);
    });
}

// Function to play a specific track
function playTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.src;
    coverImage.src = track.cover;
    audioPlayer.play();
}

// Event listener for play/pause button
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Event listener for shuffle button
shuffleBtn.addEventListener('click', () => {
    isShuffled = !isShuffled;
    shuffleBtn.textContent = isShuffled ? 'Shuffle On' : 'Shuffle Off';
});

// Event listener for previous button
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
});

// Event listener for next button
nextBtn.addEventListener('click', () => {
    if (isShuffled) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    playTrack(currentTrackIndex);
});

// Initialize the playlist
initPlaylist();

let autoNext = false; // Flag to enable auto next track when shuffle is on

// Function to play a specific track
function playTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.src;
    coverImage.style.opacity = 0; // Fade out the current cover image
    setTimeout(() => {
        coverImage.src = track.cover;
        coverImage.style.opacity = 1; // Fade in the new cover image
    }, 500); // Delay for the fade out animation
    document.getElementById('songName').textContent = track.name; // Set song name
    document.getElementById('songName').style.animationPlayState = 'running'; // Start scrolling animation
    audioPlayer.play();
    autoNext = true; // Enable auto next track
}

// Function to automatically move to the next track when shuffle is on and current track finishes playing
function nextTrack() {
    if (isShuffled && autoNext) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        playTrack(randomIndex);
    }
}

// Event listener for shuffle button
shuffleBtn.addEventListener('click', () => {
    isShuffled = !isShuffled;
    shuffleBtn.textContent = isShuffled ? 'Shuffle On' : 'Shuffle Off';
    autoNext = true; // Disable auto next track
});

// Initialize the default cover image
initDefaultCover();

