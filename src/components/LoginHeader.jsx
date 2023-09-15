// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomIcon from "src/components/CustomIcon";
import useAppSettings from "src/hooks/useAppSettings";
import { tw } from "src/config/constants";

// COMPONENT
const LoginHeader = ({ title }) => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state

  // Define variables

  // Debug
  //console.log("loginHeader: ", );

  // Return component
  return (
    <View style={tw`flex flex-row py-12 pt-20 items-center justify-center`}>
      {/** Icon */}
      <CustomIcon
        type="ionIcons"
        name="chevron-back"
        onPress={() => router.back()}
        style={tw`text-primary mr-5 p-2 rounded-full bg-accent`}
      />
      {/** Title */}
      <CustomText style={tw`text-4xl text-white font-medium`}>
        {title || "Title"}
      </CustomText>
    </View>
  ); // close return
}; // close component

// Export
export default LoginHeader;
