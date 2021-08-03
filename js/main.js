'use strict mode';

const onScroll = () => {
  const navbar = document.querySelector('#main-navbar');

  if (window.scrollY > 0) navbar.setAttribute('data-scrolled', '');
  else navbar.removeAttribute('data-scrolled');
}

window.addEventListener('scroll', onScroll);