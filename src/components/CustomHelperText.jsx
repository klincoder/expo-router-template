// Import resources
import React from "react";

// Import custom files
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// COMPONENT
const CustomHelperText = ({ isError, title, visible, styleText, ...rest }) => {
  // If not visible or empty title
  if (!visible || !title) return null;

  // Debug
  // console.log("customHelperText: ")

  // Return component
  return (
    <CustomText
      {...rest}
      visible={visible}
      style={[
        styleText,
        tw`text-xs font-medium`,
        isError ? tw`text-danger` : tw`mt-0.5 text-gray`,
      ]}
    >
      {title}
    </CustomText>
  ); // close return
}; // close component

// Export
export default CustomHelperText;
