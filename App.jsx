import React from "react";
import CustomSelect from "./CustomSelect";
import "./styles.css";

const App = () => {
  // const options = [
  //   { label: "Group 1", options: ["Option 1", "Option 2"] },
  //   { label: "Group 2", options: ["Option 3", "Option 4"] },
  // ];
  const options = [{ options: ["egg", "onion", "garlic", "spice"] }];
  const handleChange = (value) => {
    console.log("Selected Value:", value);
  };

  const handleMenuOpen = () => {
    console.log("Menu Opened");
  };

  const handleSearch = (searchText) => {
    console.log("Search:", searchText);
  };

  return (
    <div>
      <h1>Custom Select Example</h1>
      <CustomSelect
        isClearable
        isSearchable
        options={options}
        placeholder="Select an option"
        isGrouped
        isMulti
        onChangeHandler={handleChange}
        onMenuOpen={handleMenuOpen}
        onSearchHandler={handleSearch}
      />
    </div>
  );
};

export default App;
