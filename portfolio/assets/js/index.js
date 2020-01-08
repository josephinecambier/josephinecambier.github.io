// More info https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  history: true,
  controls: true,
  progress: true,
  touch: true,
  loop: false,
  showNotes: false,
  help: true,

  transition: 'slide', // none/fade/slide/convex/concave/zoom
  backgroundTransition: 'slide',
  transitionSpeed: 'fast',

  // More info https://github.com/hakimel/reveal.js#dependencies
  dependencies: [
    { src: '.reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
    { src: './reveal.js/plugin/markdown/marked.js' },
    { src: './reveal.js/plugin/markdown/markdown.js' },
    { src: './reveal.js/plugin/notes/notes.js', async: true },
    { src: './reveal.js/plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } }
  ]
});

window.isMobile = /iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());

Reveal.addEventListener('slidechanged', function(event) {
  var currentSlide = event.currentSlide;
  var classname = window.isMobile ? "vimeo-video-mobile" : "vimeo-video-desktop";
  var currentVideo = currentSlide.getElementsByClassName(classname)[0];
  currentVideo && $(currentVideo).show();

  var loaderDiv = $(currentSlide).find(".loader-wrapper");
  var otherLoaderDivs = $(".loader-wrapper").not(loaderDiv);

  if (loaderDiv && currentVideo) {
    otherLoaderDivs.hide()
    loaderDiv.show();
  }

  if (window.isMobile) {
    $(currentVideo).closest(".click-catcher").hide();
  }

  var vimeoID = currentVideo && currentVideo.dataset.vimeoId || 0;
  if (currentVideo && vimeoID > 0) {
    startVideo(vimeoID, loaderDiv)
  }
});

var vimeoPlayers = [];
var classname = window.isMobile ? "vimeo-video-mobile" : "vimeo-video-desktop";
var vimeoVideos = document.getElementsByClassName(classname);

for (let index = 0; index < vimeoVideos.length; index++) {
  var videoElement = vimeoVideos[index];
  var vimeoID = videoElement && videoElement.dataset.vimeoId || 0;

  if (vimeoID > 0) {
    loadPlayer(videoElement, vimeoID);
  }
}

function loadPlayer(currentVideo, vimeoID, loaderDiv) {
  var vimeoPlayer = new Vimeo.Player(currentVideo, {
    id: vimeoID,
    autoplay: false,
    autopause: false,
    background: true,
    loop: true,
    portrait: false,
    byline: false,
  });

  // console.log("vimeoPlayer: ", vimeoPlayer);
  // console.log("vimeoID: ", vimeoID);

  vimeoPlayers[vimeoID] = vimeoPlayer;

  if (window.isMobile) {
    // console.log("isMobile: ", currentVideo);
  } else {
    // console.log("isDesktop: ", currentVideo);
  }

  vimeoPlayer.ready().then(function() {
    // console.log("vimeoPlayer: ", vimeoPlayer);
    vimeoPlayer.setLoop(true).then(function(loop) {
      loopEnabled = loop;
      // console.log("loopEnabled: ", loop);
    }).catch(function(error) {
      // console.log("loop error: ", error);
    });
  });
}

function startVideo(vimeoID, loaderDiv) {
  videobgEnlarge();

  var currentVideo = vimeoPlayers[vimeoID];

  if (currentVideo) {
    // console.log("vimeoPlayers[vimeoID]: ", vimeoPlayers[vimeoID]);
    currentVideo.play();

    currentVideo.on('play', function() {
      console.log('played the video!');
      loaderDiv.hide();
    });
  }
}

/**
 * RESIZE HANDLER
 */

function videobgEnlarge() {
  var classname = window.isMobile ? "vimeo-video-mobile" : "vimeo-video-desktop";
  var vimeoVideos = document.getElementsByClassName(classname);

  for (let index = 0; index < vimeoVideos.length; index++) {
    var videoElement = vimeoVideos[index];

    var $videoBgWidth = $(videoElement).closest(".videobg-width");

    var theWidth = $(window).width();
    var theHeight = $(window).height();

    var newWidth = (theHeight * 1.77777778);
    var newHeight = (theWidth / 1.77777778);

    if ((newHeight > theHeight)) {
      $videoBgWidth.width((newWidth / theWidth) * 100 + '%');
    } else if ((newWidth > theWidth)) {
      /* $videoBgWidth.width((newHeight / theHeight) * 100 + '%'); */
      $videoBgWidth.width(100 + "%")
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

/**
 * Preload images
 */
var imageElements = $("*").filter(function() {
  return $(this).data("backgroundImage") !== undefined;
});

var images = [];
for (let index = 0; index < imageElements.length; index++) {
  var imageElement = imageElements[index];
  var imageSrc = imageElement.dataset.backgroundImage;
  images[index] = new Image();
  images[index].src = imageSrc;
}
