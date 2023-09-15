// Import resources
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomSafeView = ({ styleContainer, children, ...rest }) => {
  // Define variables
  styleContainer = styleContainer || tw`px-3`;

  // Return component
  return (
    <SafeAreaView style={[styleContainer, tw`flex-1 bg-white`]}>
      {/** Status bar */}
      <StatusBar {...rest} translucent={false} />

      {/** Children */}
      {children}
    </SafeAreaView>
  ); // close return
}; // close component

// Export
export default CustomSafeView;
