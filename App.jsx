import React, { useEffect, useState } from 'react';
import { View, Text, Appearance, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faH, faHSquare, faHome, faHomeAlt } from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import './global.css'
import Home from './Screens/Home';
import TodosScreen from './Screens/Activities';


// Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme()); // Get the current theme

  useEffect(() => {
    console.log(theme);
    
    // Listener for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    // Cleanup listener on component unmount
    return () => subscription.remove();
  }, []);
  return (<View className=' bg-white dark:bg-gray-800 flex-1'>
    <StatusBar barStyle={theme==='dark'?'light-content':'dark-content'} backgroundColor={theme==='dark'?"#1f2937":'#fff'} />
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // Assign icons based on route names
            if (route.name === 'Bookings') {
              iconName = focused ? 'home' : 'home-outline';
              return <Icon name={iconName} size={size} color={color} />;
            } else if (route.name === 'Activities') {
              iconName = focused ? 'calendar-multiselect' : 'calendar-month-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } 
            else if (route.name === 'Notifications') {
              iconName = focused ? 'bell' : 'bell-outline';
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }
            else if (route.name === 'Menus') {
              iconName = focused ? 'grid' : 'grid-outline';
              return <Icon name={iconName} size={size} color={color} />;
            }

            
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal", // Make active tab bold
                fontSize: 11, // Adjust font size if needed
                color: focused ? theme==='dark'?"white":"#000" : "#888", // Optional: Change color for active/inactive tabs
              }}
            >
              {route.name}
            </Text>
          ),
          tabBarActiveTintColor: theme!=='dark'?"black":"white",
          tabBarInactiveTintColor: 'gray',
          headerShown:false,
          
          tabBarStyle:{paddingTop:10, paddingBottom:10, borderTopLeftRadius:18, borderTopRightRadius:18, shadowColor:'#cbcbcb0', elevation:0, borderWidth:1,height:70, borderBottomWidth:0, backgroundColor:theme==='dark'?"black":"white", borderColor:theme!=='dark'?"rgba(0,0,0,0.1)":"black"}
        })}
      >
        <Tab.Screen  name="Bookings" component={Home} />
        <Tab.Screen  name="Activities" component={TodosScreen} />
        <Tab.Screen  name="Notifications" component={Home} />
        <Tab.Screen  name="Menus" component={Home} />
        
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
};

export default App;
