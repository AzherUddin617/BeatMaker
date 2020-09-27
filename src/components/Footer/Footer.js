import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <p className={classes.Text}>
        Created by 
        <a href="https://www.facebook.com/azher.uddin.617"
          className={classes.Link}
          target="_blank"
          rel="noopener noreferrer"
        > Azher Uddin</a>
        .
      </p>
    </footer>
  );
}

export default Footer;
