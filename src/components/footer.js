const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    
      <footer>
        <h4>&copy; {currentYear} RENTAL.com. All rights reserved.</h4>
      </footer>
  );
};

export default Footer;
