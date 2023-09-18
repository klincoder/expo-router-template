// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomSafeView from "src/components/CustomSafeView";
import CustomText from "src/components/CustomText";
import useAppSettings from "src/hooks/useAppSettings";
import { tw } from "src/config/constants";

// COMPONENT
const BlankScreenSlug = () => {
  // Define app settings
  const { routeQuery } = useAppSettings();

  // Define variables
  const slug = routeQuery?.slug;

  // Debug
  //console.log("blankScreenSlug: ", slug);

  // Return component
  return (
    <CustomSafeView>
      {/** SECTION - 1 */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>Details for {slug}</CustomText>
      </View>
    </CustomSafeView>
  ); // close return
}; // close component

// Export
export default BlankScreenSlug;
