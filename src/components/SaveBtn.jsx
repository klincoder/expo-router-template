// Import resources
import React, { useState } from "react";

// Import custom files
import CustomButton from "src/components/CustomButton";
import CustomIcon from "src/components/CustomIcon";
import { tw } from "src/config/constants";

// COMPONENT
const SaveBtn = ({ isSaved, onPress, styleIcon, styleContainer, ...rest }) => {
  // Define state
  const [clickedSave, setClickedSave] = useState(isSaved);

  // Debug
  //console.log("saveBtn: ",);

  // Return component
  return (
    <CustomButton
      {...rest}
      isTouchable
      styleTouchable={[styleContainer, tw`p-2 rounded-full`]}
      onPress={() => {
        setClickedSave(!clickedSave);
        onPress();
      }}
    >
      <CustomIcon
        {...rest}
        type="antDesign"
        name="heart"
        style={[styleIcon, clickedSave && tw`text-danger`]}
      />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default SaveBtn;
