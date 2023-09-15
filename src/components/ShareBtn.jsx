// Import resources
import React from "react";
import { Share } from "react-native";

// Import custom files
import CustomButton from "src/components/CustomButton";
import CustomIcon from "src/components/CustomIcon";
import { baseUrl, tw } from "src/config/constants";

// COMPONENT
const ShareBtn = ({ title, slug, styleIcon, styleContainer, ...rest }) => {
  // Debug
  //console.log("shareBtn: ",)

  // FUNCTIONS
  // HANDLE SHARE CONTENT
  const handleShareContent = async (url, msg) => {
    // Define variables
    url = url || `${baseUrl}/link`;
    msg = msg || "Message";
    // Try catch
    try {
      // Define variables
      const result = await Share.share({ url: url, message: msg });
      // If share action
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          //console.log("activityType: ", result.activityType);
        } else {
          //console.log("shared!");
        } // close if
      } else if (result.action === Share.dismissedAction) {
        //console.log("dismissed!");
      } // close if
    } catch (err) {
      //console.log("Debug shareBtn: ", err.message);
    } // close try catch
  }; // close fxn

  // Return component
  return (
    <CustomButton
      {...rest}
      isTouchable
      onPress={handleShareContent}
      styleTouchable={[styleContainer, tw`p-2 rounded-full`]}
    >
      <CustomIcon type="antDesign" name="sharealt" style={styleIcon} />
    </CustomButton>
  ); // close return
}; // close component

// Export
export default ShareBtn;
