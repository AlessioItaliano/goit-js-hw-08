import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const feedbackFormEmail = document.querySelector('.feedback-form input');
const feedbackFormMessage = document.querySelector('.feedback-form textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';

let localStorageData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};

feedbackForm.addEventListener('input', throttle(onInputForm, 500));
feedbackForm.addEventListener('submit', onSubmitForm);

reloadPage();
function reloadPage() {
  if (localStorageData) {
    feedbackFormEmail.value = localStorageData.email || '';
    feedbackFormMessage.value = localStorageData.message || '';
  }
}

function onInputForm() {
  localStorageData = {
    email: feedbackFormEmail.value,
    message: feedbackFormMessage.value,
  };

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localStorageData));
}

function onSubmitForm(evt) {
  evt.preventDefault();

  if (feedbackFormEmail.value === '' || feedbackFormMessage.value === '') {
    alert('Для відправки, усі поля повинні бути заповненні');
    return;
  }
  console.log({
    email: feedbackFormEmail.value,
    message: feedbackFormMessage.value,
  });
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.currentTarget.reset();
  localStorageData = {};
}
