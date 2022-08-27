import React from "react";

import "./CompanyLogo.scss";

function CompanyLogo({ mode = "dark", size = "medium" }) {
  const logo_color = mode == "light" ? "white_text" : "text_dark_grey";

  return (
    <div className={`logo_title ${size}`}>
      <div className="text_secondary">Micro</div>
      <div className={logo_color}>Computers</div>
    </div>
  );
}

export default CompanyLogo;
