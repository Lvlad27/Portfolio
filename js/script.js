'use strict';

////////////////////////////
// MOBILE NAVBAR
const navbar = document.querySelector('.header__container__navbar');
const menuToggle = document.querySelector('.header__container-menuToggle');
const navLinks = document.querySelectorAll('.header__container__navbar-links');
const overlay = document.querySelector('.header__overlay');
const noScroll = document.querySelector('.noScroll');

menuToggle.addEventListener('click', function () {
	navbar.classList.toggle('header__container__navbar--open');
	navLinks.forEach(element => {
		element.classList.toggle('header__container__navbar-links--open');
	});
	this.classList.toggle('header__container-menuToggle--open');
	overlay.classList.toggle('header__overlay--hidden');
	noScroll.classList.toggle('noScroll');
});
