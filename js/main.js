'use strict mode';

const body = document.body;
const header = body.querySelector('.header');
const bodyWrapper = body.querySelector('.body-wrapper');
const mobileMenu = body.querySelector('.mobile-menu');

const closeMobileNavMenu = () => {
  [
    body, 
    header,
    bodyWrapper, 
    mobileMenu
  ].forEach(ele => ele.removeAttribute('active-menu'));
}

const onOutsideClick = e => {
  if (e.target.closest('.body-wrapper') && mobileMenu.hasAttribute('active-menu')) {
    closeMobileNavMenu();
    bodyWrapper.removeEventListener('click', onOutsideClick);
  }
}

const openMobileNavMenu = e => {
  e.stopPropagation();

  [
    body, 
    header,
    bodyWrapper, 
    mobileMenu
  ].forEach(ele => ele.setAttribute('active-menu', ''));
  bodyWrapper.addEventListener('click', onOutsideClick);
}

const onScroll = () => {
  const navbar = document.querySelector('#main-navbar');

  if (window.scrollY > 0) navbar.setAttribute('data-scrolled', '');
  else navbar.removeAttribute('data-scrolled');
}

// testing btn: header__user-profile-button
// target btn: header__menu-btn
window.addEventListener('scroll', onScroll);
document.querySelector('.header__menu-btn')
  .addEventListener('click', openMobileNavMenu); 

document.querySelector('.mobile-menu__close-btn')
  .addEventListener('click', closeMobileNavMenu);