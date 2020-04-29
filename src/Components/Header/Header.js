import React from 'react';
import play from '../../icons/play.svg';

const Header = () => {
  return ( 
    <header>
      <div className='logo-div'>
        <h1>Spectrum</h1>
        <img className='spectrum-icon' src={play} alt='play button'/>
      </div>
      <h2 className='app-title'>Ideal Garbanzo Service</h2>
    </header>
  );
}

export default Header;