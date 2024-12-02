import React from 'react';
import Categories from './Categories';

function Footer() {
  return (
    <footer className='footer'>
      <Categories/>
      <ul>
        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        {/* You could also map through subcategories here */}
      </ul>
    </footer>
  );
}

export default Footer;
