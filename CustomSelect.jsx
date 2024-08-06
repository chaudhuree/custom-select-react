import React, { useState, useEffect } from "react";

const CustomSelect = ({
  isClearable = false,
  isSearchable = false,
  isDisabled = false,
  options = [],
  value = null,
  placeholder = "Select...",
  isGrouped = false,
  isMulti = false,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    value ? (isMulti ? value : [value]) : []
  );

  useEffect(() => {
    if (onMenuOpen && open) {
      onMenuOpen();
    }
  }, [open]);

  const toggleOpen = () => {
    if (!isDisabled) {
      setOpen(!open);
    }
  };

  const handleSelect = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.includes(option)) {
        newValue = selectedValue.filter((val) => val !== option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    if (onChangeHandler) {
      onChangeHandler(newValue);
    }
  };

  const handleClear = () => {
    if (isMulti) {
      setSelectedValue([]);
    } else {
      setSelectedValue(null);
    }
    if (onChangeHandler) {
      onChangeHandler(isMulti ? [] : null);
    }
  };

  const handleRemoveItem = (option) => {
    const newValue = selectedValue.filter((val) => val !== option);
    setSelectedValue(newValue);
    if (onChangeHandler) {
      onChangeHandler(newValue);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearchHandler) {
      onSearchHandler(e.target.value);
    }
  };

  const getFilteredOptions = () => {
    if (isGrouped) {
      return options.map((group) => ({
        label: group.label,
        options: group.options.filter((opt) =>
          opt.toLowerCase().includes(search.toLowerCase())
        ),
      }));
    } else {
      return options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const filteredOptions = getFilteredOptions();

  return (
    <div className={`kzui-select ${isDisabled ? "kzui-select--disabled" : ""}`}>
      <div className="kzui-select__control" onClick={toggleOpen}>
        <div className="kzui-select__value">
          {selectedValue.length ? (
            isMulti ? (
              <div className="kzui-select__multi-value">
                {selectedValue.map((option) => (
                  <span key={option} className="kzui-select__multi-value-item">
                    {option}
                    <span
                      className="kzui-select__multi-value-remove"
                      onClick={() => handleRemoveItem(option)}
                    >
                      &times;
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              selectedValue[0]
            )
          ) : (
            <span className="kzui-select__placeholder">{placeholder}</span>
          )}
        </div>
        <div className="kzui-select__indicators">
          {isClearable && selectedValue.length > 0 && (
            <span
              className="kzui-select__clear-indicator"
              onClick={handleClear}
            >
              &times;
            </span>
          )}
          <span className="kzui-select__dropdown-indicator">&#9660;</span>
        </div>
      </div>
      {open && (
        <div className="kzui-select__menu">
          {isSearchable && (
            <div className="kzui-select__search">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search..."
              />
            </div>
          )}
          <div className="kzui-select__options">
            {isGrouped ? (
              filteredOptions.length > 0 ? (
                filteredOptions.map(
                  (group) =>
                    group.options.length > 0 && (
                      <div key={group.label} className="kzui-select__group">
                        <div className="kzui-select__group-label">
                          {group.label}
                        </div>
                        {group.options.map((option) => (
                          <div
                            key={option}
                            className={`kzui-select__option ${
                              selectedValue.includes(option)
                                ? "kzui-select__option--selected"
                                : ""
                            }`}
                            onClick={() => handleSelect(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )
                )
              ) : (
                <div className="kzui-select__no-options">No options found</div>
              )
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`kzui-select__option ${
                    selectedValue.includes(option)
                      ? "kzui-select__option--selected"
                      : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="kzui-select__no-options">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
