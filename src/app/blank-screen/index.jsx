// Import resources
import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

// Import custom files
import CustomSafeView from "src/components/CustomSafeView";
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// COMPONENT
const BlankScreen = () => {
  // Define variables

  // Debug
  //console.log("blankScreen: ",);

  // Return component
  return (
    <CustomSafeView>
      {/** Screen details */}
      <Stack.Screen options={{ headerShown: false }} />

      {/** SECTION - 1 */}
      <View className="flex-1 items-center justify-center">
        <CustomText>BlankScreen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default BlankScreen;
