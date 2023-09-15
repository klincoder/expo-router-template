// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomBottomView = ({ styleContainer, children, ...rest }) => {
  // Return component
  return (
    <View
      {...rest}
      style={[
        styleContainer || tw`bg-white/90 border-t border-gray/20`,
        tw`absolute z-1 bottom-0 right-0 left-0 px-4 py-3`,
      ]}
    >
      <>{children}</>
    </View>
  ); // close return
}; // close component

// Export
export default CustomBottomView;
