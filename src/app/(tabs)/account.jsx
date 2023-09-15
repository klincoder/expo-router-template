// import resources
import React from "react";
import { ScrollView, View } from "react-native";
import { Tabs } from "expo-router";

// Import custom files
import CustomSafeView from "src/components/CustomSafeView";
import useAppSettings from "src/hooks/useAppSettings";
import LogoutBtn from "src/components/LogoutBtn";
import useAuthState from "src/hooks/useAuthState";
import CustomImage from "src/components/CustomImage";
import CustomListItem from "src/components/CustomListItem";
import { accountList, tw } from "src/config/constants";

// COMPONENT
const AccountScreen = () => {
  // Define app settings
  const { router } = useAppSettings();

  // Define state
  const { user } = useAuthState();

  // Define variables
  const titleHeader = `Hi, ${user?.usernameFormat || "guest"}`;

  // Debug
  //console.log("accountScreen: ", user);

  // Return component
  return (
    <CustomSafeView styleContainer={tw`p-0`}>
      {/** Screen details */}
      <Tabs.Screen
        options={{
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
        }}
      />

      {/** SECTION - 1 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** COL 1 - ACCOUNT LIST */}
        <View style={tw`pt-4`}>
          {/** Loop data */}
          {accountList?.map((item, index) => (
            <CustomListItem
              hideDivider
              key={`account${index}`}
              title={item?.title}
              leftIconType={item?.leftIconType}
              leftIconName={item?.leftIconName}
              styleContainer={tw`py-5`}
              onPress={() => {
                if (item?.isLink) {
                  router.push(item?.link);
                } // close if
              }}
            />
          ))}
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
}; // closoe component

// Export
export default AccountScreen;
