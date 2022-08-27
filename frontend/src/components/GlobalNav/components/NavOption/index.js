import React, { useEffect, useRef } from "react";
import { ChevronDown } from "react-bootstrap-icons";

import "./NavOption.scss";

function NavOption({ optionDetails, activeOption, setActiveOption }) {
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setActiveOption({ [optionDetails.id]: false, ...activeOption });
      return;
    }
  };

  const enbleDropdown = () => {
    setActiveOption({ ...activeOption, [optionDetails.id]: true });
  };

  return (
    <div className="NavOption" onClick={enbleDropdown}>
      <div className="title_cont">
        <div className="title">{optionDetails.title}</div>
        <div className="title_logo">
          <ChevronDown />
        </div>
      </div>

      {activeOption[optionDetails.id] && (
        <div className="option_dropdown primary_bg_color" ref={node}>
          {optionDetails.subheadings.map((section) => {
            return (
              <div className="dropdown_section">
                <div className="subheading text_light_grey">
                  {section.icon} {section.name}
                </div>
                {section.values.map((value) => {
                  return (
                    <div className="subheading_content">
                      <div className="content_title">{value.title}</div>
                      <div className="content_description">
                        {value.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NavOption;
