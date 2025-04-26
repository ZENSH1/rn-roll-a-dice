import { useState, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import User from "@/db/models/User"; // Adjust the path as needed
import DiceRoll from "@/db/models/DiceRoll";
import { diceImages } from '@/constants/images'
import { addDice } from '@/db/functions'
//add router
import { useRouter } from 'expo-router'

const UseRolls = () => {

  const [diceImage, setDiceImage] = useState(diceImages[0])
  const [textVisible, setTextVisible] = useState(false)
  const rotateAnim = useRef(new Animated.Value(0)).current;
  

  const [roll, setRoll] = useState(0)
  const router = useRouter()
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rollDice = () => {
    // Generate a random number between 0 and 5
    const randomValue = Math.floor(Math.random() * 6);
    
    // Set the new roll value
    setRoll(randomValue);
    
    // Set the corresponding dice image immediately after roll is updated
   // setDiceImage(diceImages[randomValue]);
    
    // Make the text visible
    setTextVisible(true);
  
    // Hide the text after 2 seconds
    const timer = setTimeout(() => {
      setTextVisible(false);
      rotateAnim.setValue(0); // Reset rotation to 0 for the next roll
    }, 2000);

    setDiceImage(diceImages[randomValue]); // Update the image after the roll
  
  

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Cleanup timeout if the component unmounts or the effect is triggered again
    return () => clearTimeout(timer);
  }
  
  const popBack = () => {
    router.back()
  }


  return {
    rollDice,
    roll,
    textVisible,
    rotateAnim,
    rotation,
    diceImage,
    popBack
  }
}

export default UseRolls