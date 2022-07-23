/* global L:readonly */
const navMain = document.querySelector('.main-nav');
const navList = document.querySelector('.main-nav__list');
const navToggle = document.querySelector('.main-nav__burger');
const selected = document.querySelector(".sorting-form__selected");
const optionsContainer = document.querySelector(".sorting-form");
const inputText = document.querySelector(".sorting-form__input-text");
const optionsList = document.querySelectorAll(".sorting-form__field");

const swiperNojs = document.querySelectorAll('.swiper-button');


navToggle.classList.remove('main-nav__burger--nojs');
navList.classList.remove('main-nav__list--nojs');

// бургер
navToggle.addEventListener('click', () => {
  navList.classList.toggle('main-nav__list--closed');
  navToggle.classList.toggle('main-nav__burger--opened');
  navToggle.classList.toggle('main-nav__burger--closed');
});


// список сортировки
selected.addEventListener('click', () => {
  optionsContainer.classList.toggle('active');
});

optionsList.forEach(el => {
  el.addEventListener('click', () => {
    selected.textContent = el.textContent;
    optionsContainer.classList.remove('active');
  });
});

document.body.addEventListener('click', (evt) => {
  const close = evt.target.closest('.sorting-form__selected');
  if (!close) {
    optionsContainer.classList.remove('active');
  }
});

// Слайдер
try {
  new Swiper('.swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      clickable: true,
    },
  });

  swiperNojs.forEach((el) => {
    el.classList.remove('swiper-button--nojs');
  });
}
catch (err) {
  console.error(err);
}

// Карта
const map = L.map('map')
  .setView({
    lat: 59.96831,
    lng: 30.31748,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/map-marker.svg',
  iconSize: [38, 50],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker
  .addTo(map)
  .bindPopup("Drink2Go - Интернет магазин кофейных напитков");
