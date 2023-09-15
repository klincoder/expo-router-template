// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";

// COMPONENT
const BlankComponent = () => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("blankComponent: ", );

  // Return component
  return (
    <View>
      <CustomText>Content goes here</CustomText>
    </View>
  ); // close return
}; // close component

// Export
export default BlankComponent;
