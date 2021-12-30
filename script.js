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

// PORTFOLIO OPENMODAL
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

const track = document.getElementById('carousel__track');
const allSlides = document.querySelectorAll('.carousel__slide');
const slideWidth = allSlides[0].offsetWidth;

let index = 0;
let posX1, posX2, initialPosition, finalPosition;

let okToSlide = true;

const prev = document.getElementById('prev');
const next = document.getElementById('next');

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];

const cloneFirstSlide = firstSlide.cloneNode(true);
const cloneLastSlide = lastSlide.cloneNode(true);

const dotsNav = document.querySelector('.carousel__nav-indicator');
const dots = Array.from(dotsNav.children);

track.appendChild(cloneFirstSlide);
track.insertBefore(cloneLastSlide, firstSlide);

prev.addEventListener('click', () => switchSlide('prev'));
next.addEventListener('click', () => switchSlide('next'));

track.addEventListener('transitionend', checkIndex);

track.addEventListener('mousedown', dragStart);

track.addEventListener('touchstart', dragStart);
track.addEventListener('touchmove', dragMove);
track.addEventListener('touchend', dragEnd);

function dragStart(e) {
	e.preventDefault();
	initialPosition = track.offsetLeft;

	if (e.type == 'touchstart') {
		posX1 = e.touches[0].clientX;
	} else {
		posX1 = e.clientX;

		document.onmouseup = dragEnd;
		document.onmousemove = dragMove;
	}
}

function dragMove(e) {
	if (e.type == 'touchmove') {
		posX2 = posX1 - e.touches[0].clientX;
		posX1 = e.touches[0].clientX;
	} else {
		posX2 = posX1 - e.clientX;
		posX1 = e.clientX;
	}

	track.style.left = `${track.offsetLeft - posX2}px`;
}

function dragEnd() {
	finalPosition = track.offsetLeft;
	if (finalPosition - initialPosition < slideWidth / 4) {
		switchSlide('next', 'dragging');
	} else if (finalPosition - initialPosition > slideWidth / 4) {
		switchSlide('prev', 'dragging');
	} else {
		track.style.left = `${initialPosition}px`;
	}

	document.onmouseup = null;
	document.onmousemove = null;
}

function switchSlide(arg, arg2) {
	track.classList.add('carousel__track--transition');

	if (okToSlide) {
		if (!arg2) {
			initialPosition = track.offsetLeft;
		}
		if (arg == 'next') {
			track.style.left = `${initialPosition - slideWidth}px`;
			index++;
		} else {
			track.style.left = `${initialPosition + slideWidth}px`;
			index--;
		}
	}

	okToSlide = false;
}

function checkIndex() {
	track.classList.remove('carousel__track--transition');
	if (index == -1) {
		track.style.left = `-${allSlides.length * slideWidth}px`;
		index = allSlides.length - 1;
	} else if (index == allSlides.length) {
		track.style.left = `-${1 * slideWidth}px`;
		index = 0;
	}

	okToSlide = true;
}

/*
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav-indicator');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
	slide.style.left = `${slideWidth * index}px`;
};

// arrange the slides next to each other
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = `translateX(-${targetSlide.style.left})`;
	currentSlide.classList.remove('current-slide');
	targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('current-slide');
	targetDot.classList.add('current-slide');
};

// when i click left, move slides to the left
prevButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const prevSlide = currentSlide.previousElementSibling;
	const currentDot = dotsNav.querySelector('.current-slide');
	const prevDot = currentDot.previousElementSibling;

	moveToSlide(track, currentSlide, prevSlide);
	updateDots(currentDot, prevDot);
});

// when i click right, move slides to the right
nextButton.addEventListener('click' || 'mousemove', e => {
	const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;
	const currentDot = dotsNav.querySelector('.current-slide');
	const nextDot = currentDot.nextElementSibling;

	moveToSlide(track, currentSlide, nextSlide);
	updateDots(currentDot, nextDot);
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
	updateDots(currentDot, targetDot);
});

// Mouse drag and touch slide functionality
let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = e => {
	initialPosition = e.pageX;
	moving = true;
	const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
	if (transformMatrix !== 'none') {
		transform = parseInt(transformMatrix.split(',')[4].trim());
	}
};

const gestureMove = e => {
	if (moving) {
		const currentPosition = e.pageX;
		const diff = currentPosition - initialPosition;
		if (diff > 0) {
			track.style.transform = `translateX(${transform + slideWidth}px)`;
			if (transform === 0 && diff > 0) return;
		} else {
			// if (transform > 0) return;
			track.style.transform = `translateX(${transform - slideWidth}px)`;
		}

		// currentPosition = 0;

		console.log(initialPosition, currentPosition, diff);
		console.log(transform);
	}
};

const gestureEnd = e => {
	moving = false;
};

if (window.PointerEvent) {
	window.addEventListener('pointerdown', gestureStart);
	window.addEventListener('pointermove', gestureMove);
	window.addEventListener('pointerup', gestureEnd);
} else {
	window.addEventListener('touchdown', gestureStart);
	window.addEventListener('touchmove', gestureMove);
	window.addEventListener('touchup', gestureEnd);
}
*/
