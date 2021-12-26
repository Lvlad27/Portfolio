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
console.log(btnsOpenModal);

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
