import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
  }, 1000)
);

player
  .setCurrentTime(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)))
  .then(function (seconds) {});
