// Import resources
import React from "react";
import { Text } from "@rneui/themed";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomText = ({ children, style, ...rest }) => {
  // Return component
  return (
    <Text {...rest} style={style || tw`font-regular`}>
      {children}
    </Text>
  ); // close return
}; // close component

// Export
export default CustomText;
