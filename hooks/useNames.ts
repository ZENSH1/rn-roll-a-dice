import { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { fetchNames, removeName, editName, addName } from "../db/functions"; // Adjust the path as needed
import User from "../db/models/User"; // Adjust the path as needed

const useNames = () => {
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
        }).start(() => {
            if (!showNames) {
                console.log("Height animation completed 0");
                setUseAutoHeight(false); // Reset auto height when hiding
            } else {
                setUseAutoHeight(true); // Set auto height when showing
                console.log("Height animation completed full");
            }
        });
    }, [showNames]);

    const handleNamePress = (name: User) => {
        setSelectedName(name);
        setName(name.name);
        setModalVisible(true);
    };

    const handleDeletePress = (name: User) => {
        removeName(name.id);
        setRefresh(!refresh); // Trigger a refresh
    };

    const handleEditPress = (name: User) => {
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
    };

    const handleShowNamesPress = () => {
        setShowNames(!showNames);
    };

    return {
        name,
        names,
        modalVisible,
        selectedName,
        showNames,
        useAutoHeight,
        refresh,
        heightAnim,
        handleNamePress,
        handleDeletePress,
        handleEditPress,
        handleAddPress,
        handleCancelPress,
        handleSavePress,
        setModalVisible,
        setName,
        handleShowNamesPress,
    };
};

export default useNames;