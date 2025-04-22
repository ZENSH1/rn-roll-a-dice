import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ThemedButton } from '@/components/themedButton'
import { ThemedText } from '@/components/themedText'
import { diceImages } from '@/constants/images'
import { addDice } from '@/db/functions'

const diceRollScreen = () => {

  const [animationValue] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
  const [rotateValue] = useState(new Animated.Value(0))
  const [diceImage, setDiceImage] = useState(diceImages[0])
  

  const [roll, setRoll] = React.useState(0)

  const rollDice = () => {
    //return a random number between 0 and 5
    const randomValue = Math.floor(Math.random() * 6);
    setRoll(randomValue)
  }

  

  useEffect(() => {

  

    setDiceImage(diceImages[roll]);
  }, [roll]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
      
      <ThemedText fontsize={26}>Welcome to the Dice Roll Game!</ThemedText>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
      <ThemedText fontsize={18}>By Zain Sherazi</ThemedText>
      </View>

      <View style={{ margin: 20, alignItems: 'center' , justifyContent: 'center' , 
        flex: 1,
        width: '90%',
        backgroundColor: 'rgba(186, 13, 13, 0.8)', // Semi-transparent white background
      }}>
     <Animated.View
        style={[
          {
        width: 150,
        height: 150,
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: rotateValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        }) }],
          },
        ]}
      >
        <Image source={diceImages[roll]} style={{ width: 150, height: 150 }} />
      </Animated.View>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 30 }}>
        <ThemedButton title="Roll Dice" onPress={rollDice} />
        <ThemedButton title="Change Name" onPress={() => {}} />
      </View>
    </View>
  )
}

export default diceRollScreen

const styles = StyleSheet.create({})