// Import resources
import React from "react";
import { ScrollView, View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomHelperText from "src/components/CustomHelperText";
import CustomButton from "src/components/CustomButton";
import CustomIcon from "src/components/CustomIcon";
import CustomImage from "src/components/CustomImage";
import { tw } from "src/config/constants";
import { handleRemoveFile } from "src/config/functions";

// COMPONENT
const CustomFilePicker = ({
  label,
  value,
  onPress,
  onPressRemove,
  leftIconType,
  leftIconName,
  helperText,
  errMsg,
  ...rest
}) => {
  // Debug
  //console.log("customFilePicker: ",)

  // Return component
  return (
    <View style={tw`mb-3 mx-3`}>
      {/** Label */}
      {label && <CustomText style={tw`font-medium mb-1`}>{label}</CustomText>}

      {/** Input */}
      <View style={tw`flex flex-row`}>
        {/** Button */}
        <CustomButton
          isTouchable
          onPress={onPress}
          styleTouchable={tw`p-3 mr-2 w-12 rounded-full bg-primary`}
        >
          <CustomIcon type="antDesign" name="plus" style={tw`text-white`} />
        </CustomButton>

        {/** Files */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/** Loop data */}
          {value?.map((item) => (
            <View key={item?.assetId} style={tw`relative`}>
              {/** Image */}
              <CustomImage
                isLink
                image={item?.uri}
                style={tw`w-12 h-12 mx-1 rounded-full`}
              />
              {/** Remove icon */}
              <CustomIcon
                type="antDesign"
                name="close"
                size={14}
                style={tw`absolute z-10 top-0 right-0 text-white p-1 bg-danger rounded-full`}
                onPress={() => {
                  const newArr = handleRemoveFile(value, item?.assetId);
                  onPressRemove(newArr);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/** Helper text */}
      <CustomHelperText visible={helperText} title={helperText} />

      {/** Error message */}
      <CustomHelperText isError visible={errMsg} title={errMsg} />
    </View>
  ); // close return
}; // close component

// Export
export default CustomFilePicker;
