import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  margins
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 15 + 5 : 15,
    marginHorizontal: 25
  },
  backButton: {
    padding: 10
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 14,
    marginHorizontal: 5,
    color: colors.white,
    fontFamily: fonts.medium,
    textAlign: "center",
    letterSpacing: 1.0
  }
} );
