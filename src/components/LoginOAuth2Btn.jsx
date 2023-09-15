// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomDivider from "src/components/CustomDivider";
import CustomButton from "src/components/CustomButton";
import { tw } from "src/config/constants";

// COMPONENT
const LoginOAuth2Btn = ({ isDemo, onPress }) => {
  // Debug
  //console.log("loginOAuth2Btn: ",)

  // Return component
  return (
    <View style={tw`flex flex-col mt-10`}>
      {/** Divider */}
      <View style={tw`flex flex-row items-center justify-between`}>
        <CustomDivider style={tw`w-2/5`} />
        <CustomText style={tw`text-lg font-medium uppercase`}>or</CustomText>
        <CustomDivider style={tw`w-2/5`} />
      </View>

      {/** Demo login */}
      {isDemo && (
        <CustomButton
          isTouchable
          onPress={onPress}
          styleBtn={tw`my-3 bg-secondary rounded-lg`}
        >
          <CustomText style={tw`text-center text-white font-medium py-3`}>
            Login as Demo User
          </CustomText>
        </CustomButton>
      )}

      {/** Google */}

      {/** Facebook */}
    </View>
  ); // close return
}; // close component

// Export
export default LoginOAuth2Btn;
