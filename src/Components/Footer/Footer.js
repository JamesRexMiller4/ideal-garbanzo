import React from 'react';
import './Footer.scss';
import play from '../../icons/play.svg';
import youtube from '../../icons/youtube.svg';
import facebook from '../../icons/facebook.svg';
import twitter from '../../icons/twitter.svg';
import instagram from '../../icons/instagram.svg';

const Footer = () => {
  return ( 
    <footer>
      <div className='logo-div'>
        <h1>Spectrum</h1>
        <img className='spectrum-icon' src={play} alt='play' />
      </div>
      <img className='social-icon' src={facebook} alt='facebook' />
      <img className='social-icon' src={twitter} alt='twitter' />
      <img className='social-icon' src={instagram} alt='instagram' />
      <img className='social-icon' src={youtube} alt='youtube' />
    </footer>
  );
}

export default Footer;