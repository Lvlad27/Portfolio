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

// PORTFOLIO MODAL
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.modal__container-close');
const btnsOpenModal = document.querySelectorAll('.modal__container-open');

const openModal = function () {
	modal.classList.remove('modal--hidden');
	body.style.overflow = 'hidden';
};

const closeModal = function () {
	modal.classList.add('modal--hidden');
	body.style.overflow = '';
};

btnsOpenModal.forEach(item => item.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	console.log(e.key);

	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

// CAROUSEL IN MODAL
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav-indicator');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + 'px';
};

// arrange the slides next to each other
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
	currentSlide.classList.remove('current-slide');
	targetSlide.classList.add('current-slide');
};

// when i click left, move slides to the left
prevButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const prevSlide = currentSlide.previousElementSibling;

	moveToSlide(track, currentSlide, prevSlide);
});

// when i click right, move slides to the right
nextButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;

	moveToSlide(track, currentSlide, nextSlide);
});

// when i click the nav indicators, move to that slide

dotsNav.addEventListener('click', e => {
	// what indicator was clicked on
	const targetDot = e.target.closest('button');

	if (!targetDot) return;

	const currentSlide = track.querySelector('.current-slide');
	const currentDot = dotsNav.querySelector('.current-slide');
	const targetIndex = dots.findIndex(dot => dot === targetDot);
	const targetSlide = slides[targetIndex];

	moveToSlide(track, currentSlide, targetSlide);
});
