import { Text, View } from "react-native";
import { ThemedButton } from "@/components/themedButton";
import { ThemedInput } from "@/components/themedInput";
import { ThemedText } from "@/components/themedText";
import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { addName,removeName,editName,fetchNames } from "@/db/functions";
import React from "react";
import { Modal, StyleSheet } from "react-native";
import { theme } from "@/components/themes";


export default function Index() {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNames();
        setNames(data);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
  
    fetchData();
  }, [refresh]); // Add 'refresh' as a dependency
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <ThemedButton  onPress={() => setModalVisible(!modalVisible)} title="Add Name"/>
    //Show Names
    <ThemedButton  onPress={() => setShowNames(!showNames)} title="Show Names"/>

      //Modal to add/edit name
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
          <ThemedButton
            onPress={() => {
              if (selectedName) {
                editName(selectedName.id, name);
              } else {
                addName(name);
              }
              setName("");
              setRefresh(!refresh); // Trigger a refresh
              setModalVisible(false);
            }
            }
            title={selectedName ? "Edit Name" : "Add Name"}
          />
          <ThemedButton
            onPress={() => {
              setModalVisible(false);
              setName("");
            }
            }
            title="Cancel"
          />
          
        </View>
      </Modal>

      // List of names
      {showNames && (
      Array.isArray(names) && names.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          <ThemedText>Names:</ThemedText>
          {names.map((name) => (
            <ThemedText key={name.id}>{name.name}</ThemedText>
          ))}
        </View>
      ) : (
        <ThemedText>No names available</ThemedText>
      )
      )}


      </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: theme.light.colors.background,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: theme.light.colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: theme.light.colors.primary,
  },
  buttonClose: {
    backgroundColor: theme.light.colors.primary,
  },
  textStyle: {
    color: theme.light.colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: theme.light.colors.text,
  },
});