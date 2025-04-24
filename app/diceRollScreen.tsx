import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ThemedButton } from '@/components/themedButton'
import { ThemedText } from '@/components/themedText'
import { diceImages } from '@/constants/images'
import { addDice } from '@/db/functions'
//add router
import { useRouter } from 'expo-router'

const diceRollScreen = () => {

  const [animationValue] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
  const [rotateValue] = useState(new Animated.Value(0))
  const [diceImage, setDiceImage] = useState(diceImages[0])
  const [textVisible, setTextVisible] = useState(false)
  

  const [roll, setRoll] = React.useState(0)
  const router = useRouter()

  const rollDice = () => {
    // Generate a random number between 0 and 5
    const randomValue = Math.floor(Math.random() * 6);
    
    // Set the new roll value
    setRoll(randomValue);
    
    // Set the corresponding dice image immediately after roll is updated
    setDiceImage(diceImages[randomValue]);
    
    // Make the text visible
    setTextVisible(true);
  
    // Hide the text after 2 seconds
    const timer = setTimeout(() => setTextVisible(false), 2000);

  
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
          },
        ]}
      >
        <Image source={diceImages[roll]} style={{ width: 150, height: 150 }} />
        {textVisible && <Text>You Rolled {roll + 1}</Text>}
      </Animated.View>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 30 }}>
        <ThemedButton title={textVisible?"WAITING":"Roll Dice"} onPress={() => { 
          if (!textVisible) {
            rollDice();
          }
        }} />
        <ThemedButton title="Change Name" onPress={() => {
          router.back()
        }} />
      </View>
    </View>
  )
}

export default diceRollScreen

const styles = StyleSheet.create({})