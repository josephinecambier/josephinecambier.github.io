// More info https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  history: true,
  controls: true,
  progress: true,

  // More info https://github.com/hakimel/reveal.js#dependencies
  dependencies: [
    { src: './reveal.js/plugin/markdown/marked.js' },
    { src: './reveal.js/plugin/markdown/markdown.js' },
    { src: './reveal.js/plugin/notes/notes.js', async: true },
    { src: './reveal.js/plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } }
  ]
});

Reveal.addEventListener('slidechanged', function(event) {
  var currentSlide = event.currentSlide;
  var currentVideo = currentSlide.getElementsByClassName("vimeo-video")[0];
  var vimeoID = currentVideo && currentVideo.dataset.vimeoId || 0;
  if (currentVideo && vimeoID > 0) {
    startVideo(vimeoID)
  }
});

var vimeoPlayers = [];
var vimeoVideos = document.getElementsByClassName("vimeo-video");
for (let index = 0; index < vimeoVideos.length; index++) {
  var videoElement = vimeoVideos[index];
  var vimeoID = videoElement && videoElement.dataset.vimeoId || 0;
  if (vimeoID > 0) {
    loadPlayer(videoElement, vimeoID)
  }
}

function loadPlayer(currentVideo, vimeoID) {
  var loopEnabled = false;
  var isReady = false;

  var vimeoPlayer = new Vimeo.Player(currentVideo, {
    id: vimeoID,
    autoplay: true, 
    autopause: false,
    background: false,
    loop: loopEnabled,
    portrait: false,
    byline: false,
  });

  console.log("vimeoID: ", vimeoID);

  vimeoPlayers[vimeoID] = vimeoPlayer;

  vimeoPlayer.ready().then(function() {
    vimeoPlayer.setLoop(true).then(function(loop) {
      loopEnabled = loop;
      console.log("loopEnabled: ", loop); 
    }).catch(function(error) {
      console.log("loop error: ", error);
    });
  });
}

function startVideo(vimeoID) {
  if (vimeoPlayers[vimeoID]) {
    vimeoPlayers[vimeoID].play();
  }
}

/**
 * RESIZE HANDLER
 */

function videobgEnlarge() {
  var vimeoVideos = document.getElementsByClassName("vimeo-video");
  for (let index = 0; index < vimeoVideos.length; index++) {
    var videoElement = vimeoVideos[index];

    var $videoBgAspect = $(videoElement).closest(".videobg-aspect");
    var $videoBgWidth = $(videoElement).closest(".videobg-width");

    console.log($videoBgAspect)
    var videoAspect = $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth();

    windowAspect = ($(window).height() / $(window).width());
    if (windowAspect > videoAspect) {
      $videoBgWidth.width((windowAspect / videoAspect) * 100 + '%');
    } else {
      $videoBgWidth.width(100 + "%")
    }
  }
}

$(window).resize(function() {
  setTimeout(videobgEnlarge, 100);
});

$(function() {
  videobgEnlarge();
});