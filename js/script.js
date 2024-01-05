var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var annotationContainer = document.getElementById('annotation');

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: '8oRRZiRQxTs',
    playerVars: { 'playsinline': 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  annotationContainer.style.display = 'none'; // Hide initially
}

const annotationTimestamp = 14; // Replace with the desired timestamp in seconds
let currentTime = 0;

function onPlayerStateChange(event) {
    currentTime = Math.round(player.getCurrentTime()); // Round to nearest second
    if (event.data == YT.PlayerState.PLAYING) {
      // Update timestamp in one-second increments while playing
      intervalID = setInterval(updateTimestamp, 1000);
    } else {
      // Check timestamp on other state changes
      clearInterval(intervalID);
      checkAndUpdateTimestamp();
    }
  }
  
  function checkAndUpdateTimestamp() {
      annotationContainer.style.display = 'block'; // Show annotation
      updateTimestamp();
  }
  
  function updateTimestamp() {
    currentTime += 1;
    const currentTimeParagraph = annotationContainer.querySelector('p');
    currentTimeParagraph.textContent = `Current Timestamp: ${currentTime} seconds`;
  }
  
  

function hideAnnotation() {
  annotationContainer.style.display = 'none';
}
