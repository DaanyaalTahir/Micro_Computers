import React from "react";

import "./SectionHeading.scss";

function SectionHeading({ heading }) {
  return (
    <div className="SectionHeading_Cont">
      <div className="line_cont"></div>
      <div className="heading_cont">
        <span className="text_light_grey text">{heading}</span>
      </div>
    </div>
  );
}

export default SectionHeading;
