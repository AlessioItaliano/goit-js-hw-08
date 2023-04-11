import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const getCurrentTime = function (data) {
  const seconds = data.seconds;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(seconds));
};

player.on('timeupdate', throttle(getCurrentTime, 1000));

player
  .setCurrentTime(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
