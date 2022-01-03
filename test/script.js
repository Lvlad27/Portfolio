'use strict';

// ARROW AND DOTS CLICK FUNCTIONALITY
const slider = document.querySelector('.carousel__track'),
	slides = Array.from(document.querySelectorAll('.carousel__slide')),
	dots = Array.from(document.querySelectorAll('.carousel__dot')),
	next = document.getElementById('next'),
	prev = document.getElementById('prev');

let slideIndex = 1;

showSlides(slideIndex);

next.addEventListener('click', () => plusSlides(1));
prev.addEventListener('click', () => plusSlides(-1));

function plusSlides(n) {
	showSlides((slideIndex += n));
}

function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	let i;
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(' active', '');
	}
	slides[slideIndex - 1].style.display = 'flex';
	dots[slideIndex - 1].className += ' active';
}
