// Import resources
import React from "react";
import { Switch } from "react-native";

// Import custom files
import CustomListItem from "src/components/CustomListItem";
import { tw } from "src/config/constants";

// COMPONENT
const CustomSwitch = ({
  label,
  value,
  leftImage,
  leftIconType,
  leftIconName,
  onChangeVal,
  styleContainer,
  ...rest
}) => {
  // Debug
  //console.log("customSwitch: ")

  // Return component
  return (
    <CustomListItem
      {...rest}
      hideDivider
      title={label || "Switch"}
      styleContainer={styleContainer || tw`mb-3 mx-1 p-0`}
      rightContent={
        <Switch
          value={value}
          onValueChange={onChangeVal}
          trackColor={{ true: "#f15412", false: "#9ca3af" }}
          thumbColor={`#f15412`}
        />
      }
    />
  ); // close return
}; // close component

// Export
export default CustomSwitch;
