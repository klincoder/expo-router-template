// Import resources
import React from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

// Import custom files
import CustomImage from "src/components/CustomImage";
import { tw, screenInfo } from "src/config/constants";

// COMPONENT
const CustomCarousel = ({ data, loop, autoPlay, height, ...rest }) => {
  // Define variables
  loop = loop ? true : false;
  autoPlay = autoPlay ? true : false;
  const styles = {
    width: screenInfo?.width,
    height: height || screenInfo?.width / 2,
  };

  // Debug
  //console.log("customCarousel: ",)

  // Return component
  return (
    <Carousel
      {...rest}
      data={data || []}
      loop={loop}
      autoPlay={autoPlay}
      width={styles.width}
      height={styles.height}
      scrollAnimationDuration={3000}
      renderItem={({ index, item }) => (
        <View key={index} style={tw`flex-1`}>
          <CustomImage image={item} style={styles} />
        </View>
      )}
    />
  ); // close return
}; // close component

// Export
export default CustomCarousel;
