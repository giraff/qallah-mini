import React from 'react';

const Footer = () => {

  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  }
  return(
    <footer id="footer">
      <p>
        Copyright &copy; <span>{thisYear()}</span>&nbsp;
        <a id="copyright-text" href="https://github.com/giraff/qallah-mini">Qallah</a>
        &nbsp;All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;