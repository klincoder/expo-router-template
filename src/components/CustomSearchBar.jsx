// Import resources
import React from "react";
import { SearchBar } from "@rneui/themed";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomSearchBar = ({ value, onChangeText, placeholder, ...rest }) => {
  // Debug
  //console.log("customSearchBar: ",)

  // Return component
  return (
    <SearchBar
      {...rest}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || "Search..."}
      inputStyle={tw`font-medium`}
      inputContainerStyle={tw`rounded-lg bg-white border-white`}
      containerStyle={tw`p-0 m-0 bg-white border-white`}
      disabledInputStyle={tw`bg-lightGray`}
    />
  ); // close return
}; // close component

// Export
export default CustomSearchBar;
