// Import resources
import React from "react";
import Toast from "react-native-toast-message";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@rneui/themed";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

// Import custom files
import toastConfig from "src/config/toastConfig";
import CustomProviders from "src/components/CustomProviders";
import { appTheme, tw } from "src/config/constants";

// COMPONENT
const RootLayout = () => {
  // Debug
  //console.log("rootLayout: ",);

  // Return component
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={tw`flex-1`}>
        <ThemeProvider theme={appTheme}>
          <BottomSheetModalProvider>
            {/** Custom providers */}
            <CustomProviders>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
              </Stack>
            </CustomProviders>

            {/** Toast */}
            <Toast config={toastConfig} />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  ); // close return
}; // close component

// Export
export default RootLayout;
