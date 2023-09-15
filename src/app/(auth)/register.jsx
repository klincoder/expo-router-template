// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomSafeView from "src/components/CustomSafeView";
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// COMPONENT
const RegisterScreen = () => {
  // Define variables

  // Debug
  //console.log("registerScreen: ",);

  // Return component
  return (
    <CustomSafeView>
      {/** SECIION - 1 */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>Register Screen</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default RegisterScreen;
