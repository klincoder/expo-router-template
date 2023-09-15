// Import resources
import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { Link } from "expo-router";
import { A } from "@expo/html-elements";

// Import custom files
import CustomIcon from "src/components/CustomIcon";
import CustomText from "src/components/CustomText";
import { tw } from "src/config/constants";

// COMPONENT
const CustomButton = ({
  isNormal,
  isLink,
  isTouchable,
  isIcon,
  isText,
  isUrl,
  title,
  type,
  href,
  iconType,
  iconName,
  onPress,
  styleBtn,
  styleTitle,
  children,
  ...rest
}) => {
  // Define variables
  const isOutline = type?.toLowerCase() === "outline";
  const isDark = type?.toLowerCase() === "dark";

  // Return component
  return (
    <>
      {/** isNormal */}
      {isNormal && (
        <Button
          {...rest}
          title={title || "Submit"}
          type={type || "solid"}
          onPress={onPress}
          titleStyle={[
            styleTitle,
            tw`text-lg font-medium`,
            isOutline ? tw`text-primary` : tw`text-white`,
          ]}
          buttonStyle={[
            styleBtn,
            tw`rounded-lg`,
            !type && tw`bg-primary`,
            isOutline && tw`border-primary`,
            isDark && tw`bg-black`,
          ]}
        />
      )}

      {/** isLink */}
      {isLink && (
        <Link {...rest} href={href} style={stylebtn}>
          <>{children}</>
        </Link>
      )}

      {/** isTouchable */}
      {isTouchable && (
        <TouchableOpacity
          {...rest}
          activeOpacity={0.8}
          onPress={onPress}
          style={styleBtn}
        >
          <>{children}</>
        </TouchableOpacity>
      )}

      {/** isIcon */}
      {isIcon && (
        <CustomIcon
          {...rest}
          type={iconType}
          name={iconName}
          onPress={onPress}
        />
      )}

      {/** isText */}
      {isText && (
        <TouchableOpacity
          {...rest}
          activeOpacity={0.8}
          onPress={onPress}
          style={styleBtn}
        >
          <CustomText
            {...rest}
            style={[styleTitle, tw`text-base text-primary font-medium`]}
          >
            {title || "Text Button"}
          </CustomText>
        </TouchableOpacity>
      )}

      {/** isUrl */}
      {isUrl && (
        <A
          {...rest}
          href={href || "#"}
          style={styleBtn || tw`text-gray font-medium underline`}
        >
          {title || "Url Title"}
        </A>
      )}
    </>
  ); // close return component
}; // close component

// Export
export default CustomButton;
