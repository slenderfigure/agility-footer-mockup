'use strict mode';

const body = document.body;
const header = body.querySelector('.header');
const bodyWrapper = body.querySelector('.body-wrapper');
const mobileMenu = body.querySelector('.mobile-menu');
const linkList = document.querySelector('.header__main-links-list');

const onMobileMenuClick = e => {
  if (!e.target.closest('[mobile-expandable-link]')) return;

  e.preventDefault();

  const link = e.target.closest('[mobile-expandable-link]');
  const dropdown = link.querySelector('.mobile-menu__dropdown');
  const links = [...document.querySelectorAll('[mobile-expandable-link')];
  const targetHeight = dropdown.clientHeight + 41.59;

  const resetState = (link) => {
    link.removeAttribute('active-dropdown');
    link.removeAttribute('style');
  }

  if (link.hasAttribute('active-dropdown')) {
    return resetState(link);
  }

  links.forEach(link => resetState(link));
  link.setAttribute('active-dropdown', '');
  link.style.height = `${targetHeight}px`;
  
}

const showDropdown = e => {
  e.preventDefault();

  if (!e.target.closest('[data-expandable-link]')) return; 

  const link = e.target.closest('[data-expandable-link]');
  const dropdown = link.querySelector('.dropdown');

  if (dropdown.hasAttribute('active-dropdown')) closeDropdown();

  link.children.item(0).setAttribute('active-dropdown', '');
  dropdown.setAttribute('active-dropdown', ''); 

  const closeDropdown = e => {
    dropdown.removeAttribute('active-dropdown');
    link.children.item(0).removeAttribute('active-dropdown');
    window.removeEventListener('click', closeDropdown);
  }

  setTimeout(() => window.addEventListener('click', closeDropdown), 100);
}

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
  window.addEventListener('keyup', onEscKeyUp);
}

const onScroll = () => {
  const navbar = document.querySelector('#main-navbar');

  if (window.scrollY > 0) navbar.setAttribute('data-scrolled', '');
  else navbar.removeAttribute('data-scrolled');
}

const onEscKeyUp = e => {
  if (e.key !== 'Escape') return;

  closeMobileNavMenu();
  window.removeEventListener('keyup', onEscKeyUp);
}

window.addEventListener('scroll', onScroll);

document.querySelector('.header__menu-btn')
  .addEventListener('click', openMobileNavMenu); 

document.querySelector('.mobile-menu__close-btn')
  .addEventListener('click', closeMobileNavMenu);

linkList.addEventListener('click', showDropdown);

mobileMenu.addEventListener('click', onMobileMenuClick);