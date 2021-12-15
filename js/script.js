'use strict';

const navbar = document.querySelector('.header__container-navbar');
const menuToggle = document.querySelector('.header__container-menuToggle');
const navLinks = document.querySelectorAll('.navbar-links');

menuToggle.addEventListener('click', function () {
	navbar.classList.toggle('header__container-navbar--open');
	navLinks.forEach(element => {
		element.classList.toggle('navbar-links--open');
	});
});
