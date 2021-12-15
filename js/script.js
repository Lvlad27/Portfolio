'use strict';

const navbar = document.querySelector('.header__container__navbar');
const menuToggle = document.querySelector('.header__container-menuToggle');
const navLinks = document.querySelectorAll('header__container__navbar-links');

menuToggle.addEventListener('click', function () {
	navbar.classList.toggle('header__container__navbar--open');
	navLinks.forEach(element => {
		element.classList.toggle('header__container__navbar-links--open');
	});
});
