import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import PropTypes from "prop-types";


const Example = ({ options, onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option); // Pass the selected option to the callback prop
  };

  return (
    <div className="custom-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} color="primary">
        <DropdownToggle color="primary" caret size="md" style={{ width: "100%" }}>
          {selectedOption}
        </DropdownToggle>
        <DropdownMenu dark className="custom-dropdown-menu">
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

Example.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Example;
