import { ScrollView, Text, View } from "react-native";
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
    <View style={styles.horizontalView}>
    <ThemedButton  onPress={() => setModalVisible(!modalVisible)} title="Add Name"/>
    <ThemedButton  onPress={() => setShowNames(!showNames)} title="Show Names"/>
      </View>

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
      <ScrollView>
        {Array.isArray(names) && names.length > 0 ? (
          <View style={{
            width: "100%",
          }}>
            <ThemedText>Names:</ThemedText>
            {names.map((name) => (
              <View style={styles.card} key={name.id}>
                <ThemedText>{name.name}</ThemedText>
                </View>
            ))}
          </View>
        ) : (
          <ThemedText>No names available</ThemedText>
        )}
      </ScrollView>
      )
      
      }


      </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 250,
    marginBottom: 250,
    marginHorizontal: 20,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: theme.light.colors.text,
  },
  horizontalView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: "black",
    marginTop: 20,
    flex: 1,},
  scrollViewContent: {
    padding: 20,

    backgroundColor: "#000",
    flexGrow: 1,
    width: "100%",
  
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.light.colors.background,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "100%",
  
    alignSelf: "center",
    shadowColor: theme.light.colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});