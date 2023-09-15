// Import resources
import React from "react";
import { Divider } from "@rneui/themed";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomDivider = ({ style, ...rest }) => {
  // Return component
  return <Divider {...rest} style={style || tw`my-3`} />; // close return
}; // close component

// Export
export default CustomDivider;
