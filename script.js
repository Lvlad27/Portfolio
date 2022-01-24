'use strict';

const navbar = document.querySelector('.header__container__navbar'),
	menuToggle = document.querySelector('.header__container-menuToggle'),
	navLinks = document.querySelectorAll('.header__container__navbar-links'),
	overlay = document.querySelector('.overlay'),
	body = document.body;

const toggle = function () {
	navbar.classList.toggle('header__container__navbar--open');

	navLinks.forEach(element => {
		element.classList.toggle('header__container__navbar-links--open');
	});

	menuToggle.classList.toggle('header__container-menuToggle--open');
	overlay.classList.toggle('overlay--hidden');
	body.classList.toggle('noScroll');
};

menuToggle.addEventListener('click', toggle);

for (let i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click', toggle);
}

let lastScroll = 0;
const header = document.querySelector('header');

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
		body.classList.add('scroll-up');// MODALe) {
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

const triggers = document.getElementsByClassName('modal-trigger'),
	triggerArr = Array.from(triggers).entries(),
	modals = document.getElementsByClassName('modal'),
	btnCloseModal = document.getElementsByClassName('modal__container-close');

for (let [index, trigger] of triggerArr) {
	if (typeof modals[index] !== 'undefined') {
		const carouselSlider = function () {
			let carousel = modals[index].firstElementChild.children[1];

			if (carousel.children[1]) {
				let slider = carousel.firstElementChild,
					slides = slider.children,
					dots = carousel.children[1].children[1].children,
					next = carousel.children[1].lastElementChild,
					prev = carousel.children[1].firstElementChild;

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

				for (let i = 0; i < dots.length; i++) {
					dots[i].addEventListener('click', function () {
						currentSlide(i + 1);
					});
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
					slides[slideIndex - 1].style.display = '';
					dots[slideIndex - 1].className += ' active';
				}
			}
		};

		const toggleCarousel = () => {
			modals[index].classList.toggle('modal--hidden');
			body.classList.toggle('noScroll');
			carouselSlider;
		};

		const toggleModal = () => {
			modals[index].classList.toggle('modal--hidden');
			body.classList.toggle('noScroll');
		};

		trigger.addEventListener('click', toggleCarousel);
		trigger.addEventListener('click', carouselSlider);
		btnCloseModal[index].addEventListener('click', toggleModal);
	}
}

const scrollElements = document.querySelectorAll('.js-scroll');

const elementInView = (el, dividend = 1) => {
	const elementTop = el.getBoundingClientRect().top;

	return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = el => {
	const elementTop = el.getBoundingClientRect().top;

	return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = element => {
	element.classList.add('scrolled');
};

const hideScrollElement = element => {
	element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
	scrollElements.forEach(el => {
		if (elementInView(el, 1.25)) {
			displayScrollElement(el);
		} else if (elementOutofView(el)) {
			hideScrollElement(el);
		}
	});
};

window.addEventListener('scroll', () => {
	handleScrollAnimation();
});

let throttleTimer = false;

const throttle = (callback, time) => {
	if (throttleTimer) return;
	throttleTimer = true;

	setTimeout(() => {
		callback();
		throttleTimer = false;
	}, time);
};

window.addEventListener('scroll', () => {
	throttle(handleScrollAnimation, 500);
});
