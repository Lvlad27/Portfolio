'use strict';

////////////////////////////
// MOBILE NAVBAR
const navbar = document.querySelector('.header__container__navbar');
const menuToggle = document.querySelector('.header__container-menuToggle');
const navLinks = document.querySelectorAll('.header__container__navbar-links');
const overlay = document.querySelector('.overlay');
const body = document.body;

// BACKGROUND EFFECT WHEN OPENING SIDE MENU
menuToggle.addEventListener('click', function () {
	navbar.classList.toggle('header__container__navbar--open');
	navLinks.forEach(element => {
		element.classList.toggle('header__container__navbar-links--open');
	});
	this.classList.toggle('header__container-menuToggle--open');
	overlay.classList.toggle('overlay--hidden');
	body.classList.toggle('noScroll');
});

let lastScroll = 0;
const header = document.querySelector('header');

// NAVBAR EFFECT WHEN SCROLLING
window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll <= 0) {
		body.classList.remove('scroll-up');
		header.classList.remove('header__scroll');
		return;
	}

	if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
		body.classList.remove('scroll-up');
		body.classList.add('scroll-down');
		header.classList.add('header__scroll');
	} else if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
		body.classList.remove('scroll-down');
		body.classList.add('scroll-up');
	}
	lastScroll = currentScroll;
});

const category = document.querySelector('.portfolio__category');
const project = document.querySelectorAll('.project');

////////////////////////////
// PORTFOLIO

// FILTERING THE PORTFOLIO ITEMS BY CATEGORY
category.addEventListener('click', function (e) {
	if (e.target.classList.contains('btn')) {
		category.querySelector('.btn--active').classList.remove('btn--active');
		e.target.classList.add('btn--active');

		const categoryValue = e.target.getAttribute('data-filter');

		project.forEach(item => {
			if (item.classList.contains(categoryValue) || categoryValue === 'all') {
				item.classList.remove('project--hide');
				item.classList.add('project--show');
			} else {
				item.classList.remove('project--show');
				item.classList.add('project--hide');
			}
		});
	}
});

// CAROUSEL IN MODAL
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

// OPEN MODALS
const triggers = document.getElementsByClassName('modal-trigger'),
	triggerArr = Array.from(triggers).entries(),
	modals = document.getElementsByClassName('modal'),
	btnCloseModal = document.getElementsByClassName('modal__container-close');

//  Then use `for...of`-loop with the index of each item in `triggerArr` for listening to a click event which toggles each modal to open and close
for (let [index, trigger] of triggerArr) {
	const toggleModal = () => {
		modals[index].classList.toggle('modal--hidden');
	};
	trigger.addEventListener('click', toggleModal);
	if (typeof btnCloseModal[index] !== 'undefined') {
		btnCloseModal[index].addEventListener('click', toggleModal);
	}
}
