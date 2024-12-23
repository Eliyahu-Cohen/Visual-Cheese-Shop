import React from 'react';
import CategoriesFootr from './CategoriesFootr';

function Footer() {
  return (
    <footer className='footer'>
      <CategoriesFootr/>
      <ul>
        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
