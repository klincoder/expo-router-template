// Import resources
import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

// Import custom files
import CustomSafeView from "src/components/CustomSafeView";
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// Component
const SupportScreen = () => {
  // Debug
  //console.log("supportScreen: ",);

  // Return component
  return (
    <CustomSafeView>
      {/** Screen details */}
      <Stack.Screen options={{ headerShown: true }} />

      {/** SECTION - 1 */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>SupportScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default SupportScreen;
