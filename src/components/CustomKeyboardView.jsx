// Import resources
import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

// Import custom files
import { tw } from "src/config/constants";

// COMPONENT
const CustomKeyboardView = ({ styleContainer, children }) => {
  // Return component
  return (
    <KeyboardAvoidingView style={[tw`-mb-2`, styleContainer]}>
      {/** Scroll view */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        {/** Children */}
        <>{children}</>
      </ScrollView>
    </KeyboardAvoidingView>
  ); // close return
}; // close component

// Export
export default CustomKeyboardView;
