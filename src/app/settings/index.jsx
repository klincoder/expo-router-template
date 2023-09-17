// Import resources
import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

// Import custom files
import CustomSafeView from "src/components/CustomSafeView";
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// COMPONENT
const SettingsScreen = () => {
  // Debug
  //console.log("settingsScreen: ",);

  // Return component
  return (
    <CustomSafeView>
      {/** SECTION - 1 */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>Settings Screen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default SettingsScreen;
