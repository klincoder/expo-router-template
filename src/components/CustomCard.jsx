// Import resources
import React from "react";
import { Card } from "@rneui/themed";

// Import custom files

// COMPONENT
const CustomCard = ({ styleContainer, styleWrapper, children, ...rest }) => {
  // Return component
  return (
    <Card containerStyle={styleContainer} wrapperStyle={styleWrapper} {...rest}>
      {/** Content */}
      <>{children}</>
    </Card>
  ); // close return
}; // close component

// Export
export default CustomCard;
