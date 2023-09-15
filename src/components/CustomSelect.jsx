// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomListItem from "src/components/CustomListItem";
import CustomBottomSheet from "src/components/CustomBottomSheet";
import CustomHelperText from "src/components/CustomHelperText";
import { tw } from "src/config/constants";

// COMPONENT
const CustomSelect = ({
  label,
  value,
  placeholder,
  onPress,
  sheetRef,
  snapPoints,
  sheetContent,
  helperText,
  errMsg,
  ...rest
}) => {
  // Debug
  //console.log("customSelect: ",)

  // Return component
  return (
    <View style={tw`mb-4 mx-3`}>
      {/** Label */}
      {label && <CustomText style={tw`mb-1 font-medium`}>{label}</CustomText>}

      {/** Input */}
      <CustomListItem
        {...rest}
        isLink
        hideDivider
        title={value || `${placeholder}`}
        styleContainer={tw`border`}
        onPress={onPress}
      />

      {/** Helper text */}
      <CustomHelperText visible={helperText} title={helperText} />

      {/** Error message */}
      <CustomHelperText isError visible={errMsg} title={errMsg} />

      {/** BOTTOM SHEET */}
      <CustomBottomSheet {...rest} ref={sheetRef} snapPoints={snapPoints}>
        {sheetContent}
      </CustomBottomSheet>
    </View>
  ); // close return
}; // close component

// Export
export default CustomSelect;
