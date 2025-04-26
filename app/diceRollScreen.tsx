import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import React from 'react'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import UseRoll from '@/hooks/useRolls'



const diceRollScreen = () => {

  const { rollDice,roll,popBack,rotation,diceImage,textVisible } = UseRoll()


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
        <ThemedButton title="Change Name" onPress={popBack} disabled={false} />
      </View>
    </View>
  )
}

export default diceRollScreen

const styles = StyleSheet.create({})