// Import resources
import React from "react";
import { View } from "react-native";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomIcon from "src/components/CustomIcon";
import { tw } from "src/config/constants";

// COMPONENT
const CustomAlertMsg = ({
  title,
  iconType,
  iconName,
  iconSize,
  hideIcon,
  description,
  actions,
  styleTitleText,
  styleDescText,
  styleIcon,
}) => {
  // Define variables
  title = title || "Empty";
  iconType = iconType || "antDesign";
  iconName = iconName || "warning";
  iconSize = iconSize || 50;

  // Debug
  //console.log("customAlertMsg: ",)

  // Return component
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {/** Icon */}
      {!hideIcon && (
        <CustomIcon
          type={iconType}
          name={iconName}
          size={iconSize}
          style={[styleIcon || tw`text-primary`, tw`mb-3`]}
        />
      )}

      {/** Title */}
      <View style={tw`w-65`}>
        <CustomText
          style={[
            styleTitleText || tw`text-primary`,
            tw`text-xl text-center font-medium mb-2`,
          ]}
        >
          {title}
        </CustomText>
      </View>

      {/** Description */}
      {description && (
        <View style={tw`mb-4 w-65`}>
          <CustomText
            style={[
              styleDescText || tw`text-black`,
              tw`text-center text-sm font-regular`,
            ]}
          >
            {description}
          </CustomText>
        </View>
      )}

      {/** Actions */}
      {actions && <>{actions}</>}
    </View>
  ); // close return
}; // close component

// Export
export default CustomAlertMsg;
