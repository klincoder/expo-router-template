// import resources
import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomIcon from "src/components/CustomIcon";
import { tw } from "src/config/constants";

// COMPONENT
const BottomTabsLayout = () => {
  // Define variables
  const screenList = [
    {
      name: "home",
      title: "Home",
      iconType: "ionIcons",
      iconName: "home-outline",
      activeIconName: "home",
    },
    {
      name: "account",
      title: "Account",
      iconType: "fontAwesome5",
      iconName: "user",
      activeIconName: "user-alt",
    },
  ];

  // Return component
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitleStyle: tw`text-black font-medium`,
      }}
    >
      {/** Loop data */}
      {screenList?.map((item, index) => (
        <Tabs.Screen
          key={`tabs-${index + 1}`}
          name={item?.name}
          options={{
            tabBarStyle: tw`h-14 py-1`,
            tabBarLabel: ({ focused, color, position }) => (
              <CustomText
                style={[
                  tw`text-xs font-regular`,
                  focused ? tw`text-primary` : `text-[${color}]`,
                ]}
              >
                {item?.title}
              </CustomText>
            ), // close label
            tabBarIcon: ({ focused, color, size }) => (
              <View>
                <CustomIcon
                  size={size}
                  type={item?.iconType}
                  name={focused ? item?.activeIconName : item?.iconName}
                  style={[tw`mt-1`, focused ? tw`text-primary` : color]}
                />
              </View>
            ), // close icon
          }}
        />
      ))}
    </Tabs>
  ); // close return
}; // closoe component

// Export
export default BottomTabsLayout;
