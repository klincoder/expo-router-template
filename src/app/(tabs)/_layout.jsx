// import resources
import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

// Import custom files
import CustomText from "src/components/CustomText";
import CustomIcon from "src/components/CustomIcon";
import useAuthState from "src/hooks/useAuthState";
import CustomImage from "src/components/CustomImage";
import LogoutBtn from "src/components/LogoutBtn";
import { tw } from "src/config/constants";

// COMPONENT
const BottomTabsLayout = () => {
  // Define state
  const { user } = useAuthState();

  // Define variables
  const titleHeader = `Hi, ${user?.usernameFormat || "guest"}`;
  const screenList = [
    {
      name: "home",
      title: "Home",
      iconType: "ionIcons",
      iconName: "home-outline",
      activeIconName: "home",
      headerShown: false,
    },
    {
      name: "account",
      title: "Account",
      iconType: "fontAwesome5",
      iconName: "user",
      activeIconName: "user-alt",
      headerShown: true,
      headerTitle: titleHeader,
      headerTitleStyle: tw`font-medium`,
      headerLeft: () => (
        <View style={tw`pl-3`}>
          <CustomImage
            isLink
            image={user?.avatar}
            style={tw`w-8 h-8 bg-white rounded-full`}
          />
        </View>
      ),
      headerRight: () => (
        <View style={tw`pr-3`}>
          <LogoutBtn />
        </View>
      ),
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
      {/** Tab screens */}
      {/** Loop data */}
      {screenList?.map((item, index) => (
        <Tabs.Screen
          key={`tabs-${index + 1}`}
          name={item?.name}
          options={{
            // Header properties
            headerShown: item?.headerShown,
            headerTitle: item?.headerTitle,
            headerTitleStyle: item?.headerTitleStyle,
            headerLeft: item?.headerLeft,
            headerRight: item?.headerRight,
            // Tab bar properties
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
