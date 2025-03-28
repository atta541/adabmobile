import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Atta from '../screens/Atta';
import ProfileStack from '../screens/ProfileStack/ProfileStack';
import CategoryScreen from '../screens/CategoryScreen';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Cart from '../screens/cart/Cart';
import Checkout from '../screens/cart/Checkout';
import SendOTPVerificationScreen from '../components/EmailVerification/SendOTPVerificationScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();


const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="CategoryScreen"
      component={CategoryScreen}
      options={({ route }) => ({
        title: route.params.category,
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
      })}
    />
    <HomeStack.Screen
      name="Cart"
      component={Cart}
      options={({ route }) => ({
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'red',

      })}

    />


{/* <Stack.Screen name="SendOTP" component={SendOTPVerificationScreen} /> */}
<HomeStack.Screen
      name="SendOTP"
      component={SendOTPVerificationScreen}
      // component={Cart}
      // options={({ route }) => ({
      //   headerStyle: { backgroundColor: 'black' },
      //   headerTintColor: 'red',

      // })}

    />

    <HomeStack.Screen
      name="Checkout"
      component={Checkout}
      options={({ route }) => ({
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'red',

      })}
    />

  </HomeStack.Navigator>
);


const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: 'black', height: 60 },
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: ({ color, size, focused }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Atta') {
          iconName = 'chat';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }
        return <Icons name={iconName} size={focused ? 35 : 30} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Atta" component={Atta} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

export default TabNavigator;



