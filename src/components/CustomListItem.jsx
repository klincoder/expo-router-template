// Import resources
import React from "react";
import { ListItem } from "@rneui/themed";

// Import custom files
import CustomIcon from "src/components/CustomIcon";
import CustomImage from "src/components/CustomImage";
import { tw } from "src/config/constants";

// COMPONENT
const CustomListItem = ({
  isSelected,
  title,
  description,
  checkedVal,
  onPress,
  onPressChecked,
  leftImage,
  leftIconType,
  leftIconName,
  leftIconSize,
  rightContent,
  hideDivider,
  styleContainer,
  styleLeftImage,
  styleLeftIcon,
  ...rest
}) => {
  // Define variables
  const showDivider = (isSelected || hideDivider) === true ? false : true;

  // Debug
  //console.log("customListItem: ",)

  // Return component
  return (
    <ListItem
      {...rest}
      onPress={onPress}
      bottomDivider={showDivider}
      disabledStyle={tw`opacity-50`}
      containerStyle={[
        styleContainer,
        tw`rounded-lg`,
        isSelected && tw`bg-primary`,
      ]}
    >
      {/** COL 1 - IMAGE, CHECKBOX, ICON */}
      {/** If isSelected */}
      {isSelected ? (
        <CustomIcon type="feather" name="check-circle" style={tw`text-white`} />
      ) : (
        <>
          {/** Left image */}
          {leftImage && (
            <CustomImage
              image={leftImage}
              style={styleLeftImage || tw`w-5 h-5 rounded-full`}
            />
          )}

          {/** Checkbox */}
          {onPressChecked && (
            <ListItem.CheckBox checked={checkedVal} onPress={onPressChecked} />
          )}

          {/** Left icon name */}
          {leftIconName && (
            <CustomIcon
              type={leftIconType || "antDesign"}
              name={leftIconName || "pluscircleo"}
              size={leftIconSize}
              style={styleLeftIcon || tw`text-black`}
            />
          )}
        </>
      )}

      {/** COL 2 - CONTENT */}
      <ListItem.Content>
        {/** Title */}
        <ListItem.Title
          numberOfLines={1}
          style={[tw`font-medium`, isSelected && tw`text-white`]}
        >
          {title || "ListItem"}
        </ListItem.Title>

        {/** Description */}
        {description && (
          <ListItem.Subtitle
            numberOfLines={1}
            style={[tw`font-regular`, isSelected && tw`text-white`]}
          >
            {description}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>

      {/** COL 3 - RIGHT CONTENT */}
      {rightContent && rightContent}
    </ListItem>
  ); // close return
}; // close component

// Export
export default CustomListItem;
