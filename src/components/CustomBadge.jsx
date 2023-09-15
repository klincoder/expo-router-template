// Import resources
import React from "react";
import { Badge } from "@rneui/themed";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomBadge = ({ title, status, styleContainer, styleText, ...rest }) => {
  // Return component
  return (
    <Badge
      {...rest}
      value={title}
      status={status || "error"}
      containerStyle={styleContainer}
      textStyle={[styleText, tw`font-medium`]}
    />
  ); // close return
}; // close component

// Export
export default CustomBadge;
