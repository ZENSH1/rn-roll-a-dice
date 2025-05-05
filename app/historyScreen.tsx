import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedCard } from '@/components/ThemedCard'
import { ThemedText } from '@/components/ThemedText'
import { fetchDiceByUserId } from '@/db/functions'
import Spacer from '@/components/Spacer'
import { useLocalSearchParams } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/colors'
import { useUser } from '@/context/UserContext'

const HistoryScreen = () => {
  const [rolls, setRolls] = useState([])
  const { currentUser } = useUser()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme || 'light']

  useEffect(() => {
    const loadRolls = async () => {
      console.log('userId', currentUser?.id)
      if (currentUser) {
        const rollHistory = await fetchDiceByUserId(currentUser.id)
        setRolls(rollHistory)
      }
    }
    loadRolls()
  }, [currentUser])

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <View style={styles.container}>
      <ThemedText fontsize={24}>Roll History</ThemedText>
      <Spacer size={20} />
      
      <FlatList
        data={rolls}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedCard style={styles.emptyCard}>
            <ThemedText fontsize={18}>No rolls yet</ThemedText>
          </ThemedCard>
        }
        renderItem={({ item }) => (
          <ThemedCard style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.rollInfo}>
              
                <ThemedText fontsize={20}> Rolled: {item.diceNum+1}</ThemedText>
                <Spacer size={8} />
                <ThemedText fontsize={16}>
                  🕒 {formatDate(item.createdAt)}
                </ThemedText>
              </View>
            </View>
          </ThemedCard>
        )}
        ItemSeparatorComponent={() => <Spacer size={12} />}
      />
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rollInfo: {
    flex: 1,
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  }
})