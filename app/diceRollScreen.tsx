import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useState, useEffect,useRef } from 'react'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { diceImages } from '@/constants/images'
import { addDice } from '@/db/functions'
//add router
import { useRouter } from 'expo-router'

const diceRollScreen = () => {

  const [diceImage, setDiceImage] = useState(diceImages[0])
  const [textVisible, setTextVisible] = useState(false)
  const rotateAnim = useRef(new Animated.Value(0)).current;
  

  const [roll, setRoll] = React.useState(0)
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
  
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
      
      <ThemedText fontsize={26}>Welcome to the Dice Roll Game!</ThemedText>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
      <ThemedText fontsize={18}>By Zain Sherazi</ThemedText>
      </View>

      <View style={{ margin: 20, alignItems: 'center' , justifyContent: 'center' , 
        flex: 1,
        width: '90%',
      }}>
     <Animated.View
        style={[
          {
        width: 150,
        height: 150,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: rotation }],
          },
        ]}
      >
        <Image source={diceImage} style={{ width: 150, height: 150 }} />
        
      </Animated.View>
      {textVisible && <ThemedText fontsize={18}>You Rolled {roll + 1}</ThemedText>}
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 30 }}>
        <ThemedButton title={textVisible?"WAITING":"Roll Dice"} onPress={() => { 
          if (!textVisible) {
            rollDice();
          }
        }}
        disabled={textVisible} />
        <ThemedButton title="Change Name" onPress={() => {
          router.back()
        }} disabled={false} />
      </View>
    </View>
  )
}

export default diceRollScreen

const styles = StyleSheet.create({})