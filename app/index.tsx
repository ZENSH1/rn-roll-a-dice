import { ScrollView, Text, View } from "react-native";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedCard } from "@/components/ThemedCard";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, StyleSheet,useColorScheme } from "react-native";
import { Animated, Easing } from "react-native";
import useNames from "@/hooks/useNames";
import { Colors } from "@/constants/colors";


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
    <ThemedButton  onPress={handleAddPress} title="Add Name"/>
    <ThemedButton  onPress={handleShowNamesPress} title={showNames ? "Hide Names" : "Show Names"}/>
    </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ThemedInput
            value={name}
            onChangeText={setName}
            label="Enter Name"
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
          
          
        </View>
      </Modal>

      {showNames && (
        <Animated.View style={{
          flex: 1,
          maxHeight: useAutoHeight ? null : heightAnim, // Use the animated height
          overflow: 'hidden', // Hide overflow to prevent content from spilling out
        }}>
          <ThemedText fontsize={26}>Names:</ThemedText>
          <ScrollView
        style={{ ...styles.scrollView }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {Array.isArray(names) && names.length > 0 ? (
          <View style={{
            width: "100%",
          }}>
            {names.map((name) => (
                <ThemedCard
                style={styles.card}
                key={name.id}
                onTouchEnd={() => {
                    router.push("/diceRollScreen");
                }}
                >
                <ThemedText fontsize={18}>{name.name}</ThemedText>
                </ThemedCard>
            ))}
          </View>
        ) : (
          <ThemedText fontsize={26}>No names available</ThemedText>
        )}
          </ScrollView>
        </Animated.View>
    
      )  }


      </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginVertical:250,
    marginHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: Colors.light.text,
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
    height: 100,
    color: Colors.light.text,
    marginTop: 20,
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
    flexGrow: 1,
    alignItems: "stretch"
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