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
import { Animated, Easing } from "react-native";

export default function Index() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [useAutoHeight, setUseAutoHeight] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0)); // Start with height 0
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
  
  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showNames ? 700 : 0, // Target height (e.g., 300px) when `showNames` is true
      duration: 300, // Animation duration in milliseconds
      easing: Easing.ease, // Optional easing function
      useNativeDriver: false, // `false` because height cannot use the native driver
      
    }).start(()=> {
      if (!showNames) {
        console.log("Height animation completed 0");
        setUseAutoHeight(false); // Reset auto height when hiding
      } else {
        setUseAutoHeight(true); // Set auto height when showing
        console.log("Height animation completed full");
      }

  });

  }, [showNames]);

  const handleNamePress = (name) => {
    setSelectedName(name);
    setName(name.name);
    setModalVisible(true);
  };
  const handleDeletePress = (name) => {
    removeName(name.id);
    setRefresh(!refresh); // Trigger a refresh
  };
  const handleEditPress = (name) => {
    setSelectedName(name);
    setName(name.name);
    setModalVisible(true);
  };
  const handleAddPress = () => {
    setSelectedName(null);
    setName("");
    setModalVisible(true);
  };
  const handleCancelPress = () => {
    setModalVisible(false);
    setName("");
    setSelectedName(null);
  };
  const handleSavePress = () => {
    if (selectedName) {
      editName(selectedName.id, name);
    } else {
      addName(name);
    }
    setName("");
    setRefresh(!refresh); // Trigger a refresh
    setModalVisible(false);
  }
  const handleShowNamesPress = () => {
    setShowNames(!showNames);
  }


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
          overflow: '', // Hide overflow to prevent content from spilling out
        }
      }>
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
              <View style={styles.card} key={name.id}>
                <ThemedText fontsize={18}>{name.name}</ThemedText>
                </View>
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
    backgroundColor: theme.light.colors.background,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: theme.light.colors.text,
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    color: theme.light.colors.text,
    marginTop: 20,
    marginHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 20,
    width: "100%",
    flex: 1
  },
  scrollViewContent: {
    padding: 20,
    flexGrow: 1,
    alignItems: "stretch"
  },
  card: {
    backgroundColor: theme.light.colors.background,
    borderRadius: 10,
    padding: 20,
    flex:1,
    marginVertical: 10,
    width: 300,
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