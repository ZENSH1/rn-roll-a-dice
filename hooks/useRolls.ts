import { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { addDice } from "../db/functions"; // Adjust the path as needed
import User from "@/db/models/User"; // Adjust the path as needed
import DiceRoll from "@/db/models/DiceRoll";

