import React from "react";
import PropTypes from "prop-types";

const CategoriesControl = ({ value, onChange, options }) => (
  <div>
    {options.map((option) => (
      <label key={option}>
        <input
          type="checkbox"
          value={option}
          checked={value.includes(option)}
          onChange={(event) => {
            const newValue = [...value];
            if (event.target.checked) {
              newValue.push(option);
            } else {
              newValue.splice(newValue.indexOf(option), 1);
            }
            onChange(newValue);
          }}
        />
        {option}
      </label>
    ))}
  </div>
);

CategoriesControl.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoriesControl;
