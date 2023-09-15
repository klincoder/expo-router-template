// import resources
import React from "react";
import { FlatList, View } from "react-native";
import { Stack, Tabs } from "expo-router";

// Import custom files
import routes from "src/config/routes";
import TestBtn from "src/components/TestBtn";
import CustomSafeView from "src/components/CustomSafeView";
import useAppSettings from "src/hooks/useAppSettings";
import useAuthState from "src/hooks/useAuthState";
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// COMPONENT
const HomeScreen = () => {
  // Define app settings
  const { router, siteInfo, appSettings } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Debug
  //console.log("homeScreen: ", user);

  // Return component
  return (
    <CustomSafeView>
      {/** Screen details */}
      <Tabs.Screen options={{ headerShown: false }} />

      {/** SECTION 1 */}
      <View style={tw`flex-1 items-center justify-center`}>
        <CustomText>Home screen</CustomText>
      </View>

      {/** TEST BTN */}
      {/* <TestBtn /> */}
    </CustomSafeView>
  ); // close return
}; // closoe component

// Export
export default HomeScreen;
