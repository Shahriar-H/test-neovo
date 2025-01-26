import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faFilter, faStar, faHome, faList, faBell, faBars, faMessage } from "@fortawesome/free-solid-svg-icons";
import '../global.css'
import { BlurView } from "@react-native-community/blur";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];//name of 7 days

const HomeScreen = () => {
    const [tendaysdata, settendaysdata] = useState([]);
    const [selectedDate, setselectedDate] = useState(0);
    const [selectedTime, setselectedTime] = useState(0);

    //calculate 10 days from today
    function getTenDays(startDate) {
        // Ensure the date is a valid Date object
        const date = new Date(startDate);
      
        // Array to hold the 10 days
        const daysArray = [];
      
        for (let i = 0; i < 10; i++) {
          // Clone the date object and increment it
          const currentDate = new Date(date);
          currentDate.setDate(date.getDate() + i);
      
          // Extract the day of the month
          const day = currentDate.getDate();
          const name = currentDate.getDay();
      
          // Add the formatted object to the array
          daysArray.push({
            date: day.toString(), // Convert day to string
            name: name, // Same as above
          });
        }
        settendaysdata(daysArray)
        return daysArray;
    }

    useEffect(() => {
        const result = getTenDays("2025-01-26");
        console.log(result);
    }, []);
     
      
  return (
    <View className="flex-1 bg-white dark:bg-gray-800">
      {/* Header */}
      <View className="px-4 pt-10 pb-2 justify-between flex-row items-center">
        <View>
          <Text className="text-lg font-semibold text-gray-700 dark:text-gray-500">Hello,</Text>
          <Text className="text-2xl font-bold text-black dark:text-gray-200">Good morning</Text>
        </View>
        <Text className="text-[#252525] dark:text-gray-300">
        <MaterialCommunityIcons name={'message-reply-text-outline'} size={24} />
        </Text>
        
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center mx-4 my-2 bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2 shadow-sm">
        <FontAwesomeIcon icon={faSearch} size={18} color="#5b5b5b" />
        <TextInput
          placeholder="Search center"
          className="flex-1 ml-2 text-gray-800 dark:text-gray-500"
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity className="bg-primary p-2 rounded-full">
          <Icon name="filter" size={30} color="#aad102" />
          {/* <FontAwesomeIcon icon={faFilter} size={18} color="#aad102" /> */}
        </TouchableOpacity>
      </View>

      {/* Horizontal Date Scroll */}
      <View className="my-8 mt-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row  mx-4 my-2">
          {tendaysdata.map((item, index) => (
            <TouchableOpacity
              onPress={()=>setselectedDate(index)}
              key={index}
              className={`rounded-full h-20 w-20 justify-center items-center ${
                index === selectedDate ? "border border-[#aad102]" : ""
              }`}
            >
              <Text
                className={`text-3xl ${
                  index === selectedDate ? "text-[#aad102] font-bold" : "text-gray-500"
                }`}
              >
                {item?.date}
              </Text>
              <Text
                className={`uppercase ${
                  index === selectedDate ? "text-[#aad102] font-bold" : "text-gray-500"
                }`}
              >
                {shortDays[item?.name]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Center Card */}
      <View className="mx-4 bg-gray-100 h-60 rounded-tl-xl rounded-tr-xl overflow-hidden shadow-md">
        <Image
          source={{ uri: "https://img.freepik.com/premium-photo/laughter-lovefest-best-friends-group-photo_960396-115008.jpg?w=360" }} // Replace with your image URL
          className="h-full w-full absolute"
        />
        <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor={'rgba(255,255,255,0.2)'}
            reducedTransparencyFallbackColor="white"
        />
        <View className="p-4 absolute bottom-0">
          <Text className="text-3xl font-bold text-white">PLCE Padel</Text>
          <Text className="text-lg text-gray-200">Södertälje, Sweden - 17km</Text>
        </View>

        <View className="justify-center items-center" style={styles.absolute_1_container}>
          <BlurView
              style={styles.absolute_1}
              blurType="light"
              blurAmount={20}
              overlayColor={'rgba(255,255,255,0.3)'}
              reducedTransparencyFallbackColor="white"
          />
          <TouchableOpacity className="rounded-full ">
            <Text className="font-bold"><Icon name="star-outline" size={30} color="#aad102" /></Text>
          </TouchableOpacity>
        </View>
        
      </View>

      {/* Horizontal Time Scroll */}
      <View className="my-8 mt-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row  mx-4 my-2">
          {["12:00", "13:00", "14:00", "15:00", "16:00","17:00", "19:00", "20:00", "21:00", "22:00"]
          .map((item, index) => (
            <TouchableOpacity
              onPress={()=>setselectedTime(index)}
              key={index}
              className={`rounded-full h-14 w-24 mr-2  justify-center items-center ${
                index === selectedTime ? "border border-[#aad102]" : "border-[#9b9b9b] border"
              }`}
            >
              <Text
                className={`text-xl ${
                  index === selectedTime ? "text-[#aad102] font-bold" : "text-gray-500"
                }`}
              >
                {item}
              </Text>

            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

    
    </View>
  );
};

const styles = StyleSheet.create({
    
    absolute: {
      position: "absolute",
      height:80,
      width:'50%',
      left: 0,
      bottom: 0,
      right: 0
    },
    absolute_1_container: {
      position: "absolute",
      height:60,
      width:60,
      bottom: 5,
      right: 10,
      overflow:'hidden',
      borderRadius:50,
    },
    absolute_1: {
      position: "absolute",
      height:100,
      width:100,
     
      bottom: 0,
      right: 0
    }
  });

export default HomeScreen;
