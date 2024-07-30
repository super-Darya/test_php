// Получаем элементы слайдера
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('.slides-text'));
const slideCount = slides.length;
let slideIndex = 0;

const switch1 = document.querySelector('#i_1');
const switch2 = document.querySelector('#i_2');
const switch3 = document.querySelector('#i_3');

switch1.addEventListener('click', function(){
  slideIndex = 0;
  document.querySelector('.label1').style.color = '#ECBA46';
  document.querySelector('.label2').style.color = '#C4C4C4';
  document.querySelector('.label3').style.color = '#C4C4C4';
  updateSlider();
})
switch2.addEventListener('click',  function(){
  slideIndex = 1;
  document.querySelector('.label2').style.color = '#ECBA46';
  document.querySelector('.label1').style.color = '#C4C4C4';
  document.querySelector('.label3').style.color = '#C4C4C4';
  updateSlider();
})
switch3.addEventListener('click',  function(){
  slideIndex = 2;
  document.querySelector('.label3').style.color = '#ECBA46';
  document.querySelector('.label1').style.color = '#C4C4C4';
  document.querySelector('.label2').style.color = '#C4C4C4';
  updateSlider();
})

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();

// Функция проверки клика на кнопку мобильного меню
document.querySelector('.btn_mobil_menu').addEventListener('click', function(){
  this.classList.toggle('active');
  document.querySelector('.menu').classList.toggle('open');
})

// Функция закрытия мобильного меню
function close_mobil_menu(){
  document.querySelector('.menu').classList.remove('open');
  document.querySelector('.btn_mobil_menu').classList.remove('active');
}