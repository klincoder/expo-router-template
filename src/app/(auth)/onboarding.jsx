// Import resources
import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

// Import custom files
import CustomSafeView from "src/components/CustomSafeView";
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// COMPONENT
const OnboardingScreen = () => {
  // Define variables

  // Debug
  //console.log("onboardingScreen: ",);

  // Return component
  return (
    <CustomSafeView styleContainer={tw`p-0`}>
      {/** Screen details */}
      <Stack.Screen options={{ headerShown: false }} />

      {/** SECTION - 1 */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>Onboarding Screen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default OnboardingScreen;
