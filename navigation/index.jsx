import React, { useState, useEffect, useContext } from "react";
import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SignIn from "../screens/SignIn";
import ContextWrapper from "../context/ContextWrapper";
import Context from "../context/Context";
import Profile from "../screens/Profile";
import Chats from "../screens/Chats";
import Photo from "../screens/Photo";
import UserProfile from "../screens/UserProfile";
import { Ionicons } from "@expo/vector-icons";
import Contacts from "../screens/Contacts";
import Chat from '../screens/Chat'
import ChatHeader from '../components/ChatHeader'
import Apploadingfss from "../screens/AppLoadins";
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

import {
  Rationale_400Regular
} from '@expo-google-fonts/rationale'
import { useFonts } from '@expo-google-fonts/rationale'



const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


export function RootNavigator() {
  const [currUser, setCurrUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [fontLoad] = useFonts({
    Rationale_400Regular

  })

  const {
    theme: { colors },
  } = useContext(Context);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Apploadingfss />
    </View>;

  }


  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#59806b",
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="home"
            options={{ title: "DuoChat", headerTitleStyle: { fontFamily: "Rationale_400Regular", fontSize: 30, color: "white" } }}
            component={Home}
          />
          <Stack.Screen
            name="contacts"
            options={{ title: "Select Contacts" }}
            component={Contacts}
          />
          <Stack.Screen name="chat" component={Chat} options={{ headerTitle: (props) => <ChatHeader {...props} /> }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>

    // {/* <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} /> */ }
    // {/* <Stack.Screen
    //     name="Home"
    //     component={TabOneScreen}
    //     options={{ headerTitle: HomeHeader, headerBackVisible: false }}
    //   /> */}

    // {/* <Stack.Screen
    //     name="ChatRoom"
    //     component={TabTwoScreen}
    //     options={{ headerTitle: ChatroomHeader, headerBackTitleVisible: false }}
    //   /> */}
    // {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */ }
  );
}

function Home() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="ios-camera-outline" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: "#59806b",

          },
        };
      }}
      initialRouteName="chats"

    >
      {/* <Tab.Screen name="photo" component={Photo} /> */}
      <Tab.Screen name="chats" component={Chats} />
      <Tab.Screen name="Profilees" component={UserProfile} />
    </Tab.Navigator>
  );
}

function Main() {
  const [assets] = useAssets(
    require("../assets/images/icon-square.png"),
    require("../assets/images/chatbg.png"),
    require("../assets/images/user-icon.png"),
    require("../assets/images/welcome-img.png")
  );
  if (!assets) {
    return <Text>Loading ..</Text>;
  }
  return (
    <ContextWrapper>
      <RootNavigator />
    </ContextWrapper>
  );
}
export default Main;

// const HomeHeader = (props) => {
//   const { width } = useWindowDimensions();
//   return (
//     <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", padding: 10, alignItems: "center" }}>
//       <Image
//         source={require('../assets/images/profile.jpg')}
//         style={{ height: 40, width: 40, borderRadius: 40, position: "absolute", left: 0 }}
//       />
//       <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", marginLeft: 20, fontSize: 20 }}>DuoChat</Text>
//       <Feather name='camera' size={24} color="black" style={{ marginHorizontal: 5 }} />
//       <Feather name='edit-2' size={24} color="black" style={{ marginHorizontal: 8 }} />
//     </View>
//   )

// }


// const ChatroomHeader = (props) => {

//   const { width } = useWindowDimensions();
//   return (
//     <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "85%", padding: 10, alignItems: "center", marginRight: 72 }}>
//       <Image
//         source={require('../assets/images/profile.jpg')}
//         style={{ height: 40, width: 40, borderRadius: 40, position: "absolute", left: -20 }}
//       />
//       <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", marginLeft: 20, fontSize: 20 }}>{props.children}</Text>
//       <Feather name='camera' size={24} color="black" style={{ marginHorizontal: 5 }} />
//       <Feather name='edit-2' size={24} color="black" style={{ marginHorizontal: 8 }} />
//     </View>
//   )

// }


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="TabOne"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}>
//       <BottomTab.Screen
//         name="TabOne"
//         component={TabTwoScreen}
//         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate('Modal')}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}>
//               <FontAwesome
//                 name="info-circle"
//                 size={25}
//                 color={Colors[colorScheme].text}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//       <BottomTab.Screen
//         name="TabTwo"
//         component={TabOneScreen}
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
