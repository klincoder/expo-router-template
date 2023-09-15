// Import resources
import React from "react";
import { ActivityIndicator } from "react-native";

// Import custom files
import { tw, appColors } from "src/config/constants";

// COMPONENT
const CustomActivityIndicator = ({ isCenter, size, color, style, ...rest }) => {
  // Return component
  return (
    <ActivityIndicator
      {...rest}
      size={size || 34}
      color={color || appColors?.primary}
      style={[style, isCenter && tw`flex-1 items-center justify-center`]}
    />
  ); // close return
}; // close component

// Export
export default CustomActivityIndicator;
