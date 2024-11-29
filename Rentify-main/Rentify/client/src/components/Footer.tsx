import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear(); // Automatically gets the current year

  return (
    <footer style={footerStyle}>
      <p>© {currentYear} Rentify. All Rights Reserved.</p>
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "1rem",
  backgroundColor: "#f1f1f1",
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  fontSize: "0.9rem",
};

export default Footer;

