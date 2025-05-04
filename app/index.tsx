import { ScrollView, Text, View, FlatList } from "react-native";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedCard } from "@/components/ThemedCard";
import { useRouter, Link } from "expo-router";
import React from "react";
import { Modal, StyleSheet,useColorScheme } from "react-native";
import { Animated, Easing } from "react-native";
import useNames from "@/hooks/useNames";
import { Colors } from "@/constants/colors";
import  Spacer from "@/components/Spacer";
//import { AnimatedWrapper } from 'react-native-micro-interactions';


export default function Index() {
  //UseNames hook to manage namesScreen state and actions
  const {
    name,
    names,
    modalVisible,
    selectedName,
    showNames,
    useAutoHeight,
    heightAnim,
    handleNamePress,
    handleDeletePress,
    handleEditPress,
    handleAddPress,
    handleCancelPress,
    handleSavePress,
    handleShowNamesPress,
    setModalVisible,
    setName,
  } = useNames();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <View style={styles.horizontalView}>
      <ThemedButton onPress={handleAddPress} title="Add Name" />
      <ThemedButton
        onPress={handleShowNamesPress}
        title={showNames ? "Hide Names" : "Show Names"}
      />

    </View>

      {showNames && (
        <Animated.View style={{
          flex: 1,
          maxHeight: useAutoHeight ? heightAnim : heightAnim, // Use the animated height
          overflow: 'hidden', // Hide overflow to prevent content from spilling out
        }}>
          <ThemedText fontsize={26}>Names:</ThemedText>
            <FlatList
            data={names}
            keyExtractor={(item) => item.id.toString()}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <ThemedText fontsize={26}>No names available</ThemedText>
            }
            renderItem={({ item }) => (
              <ThemedCard
              style={styles.card}
              onTouchEnd={() => {
              //  router.push("/diceRollScreen");
              }}
              >
                <View style={styles.horizontalView}>
                  <View style={{ flex: 1 }}>
                  <ThemedText fontsize={20}>ID: {item.id}</ThemedText>

<Spacer size={10} />

<Link href={`/diceRollScreen?name=${item.name}`}>
<ThemedText  fontsize={20}> Name: {item.name}</ThemedText>
</Link>

<Spacer size={15} />

                    </View>
                    
              <View style={{ flexDirection: "column", alignItems: "center" }}>
              <ThemedButton
                onPress={() => handleEditPress(item)}
                title="Edit"
                />
              <Spacer size={10} />
              <ThemedButton
                onPress={() => handleDeletePress(item)}
                title="Delete"/>
              </View>
                  </View>


              </ThemedCard>
            )}
            />
        </Animated.View>
    
      )  }


<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>

        <ThemedCard style={styles.modalView}>

          <ThemedInput
            value={name}
            onChangeText={setName}
            label="Enter Name"
            style={{ width: 200, height: 45, marginBottom: 20 }}
          />
          <View style={styles.horizontalView}>
          <ThemedButton
            onPress={handleSavePress}
            title={selectedName ? "Edit Name" : "Add Name"}
          />
          <ThemedButton
            onPress={handleCancelPress}
            title="Cancel"
          />
            </View>
        </ThemedCard>
        </View>
      </Modal>



      </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginVertical:250,
    marginHorizontal: 20,
    borderRadius: 20,
    height: 250,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.light.text,
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 'auto',
    color: Colors.light.text,
    marginHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 5,
    width: "100%",
    flex: 1
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    flex:1,
    marginBottom: 15,
    width: 300,
    alignSelf: "center",
  },
});