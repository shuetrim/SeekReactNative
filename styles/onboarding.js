import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts,
  padding
} from "./global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  carousel: {
    marginTop: 20
  },
  banner: {
    height: 150,
    width,
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  imageContainer: {
    alignItems: "center",
    marginHorizontal: 22
  },
  image1: {
    width: 256,
    height: height > 570 ? 304 : 250,
    resizeMode: "contain"
  },
  image: {
    width: 297,
    height: height > 570 ? 268 : 250,
    resizeMode: "contain"
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 42,
    marginRight: 42,
    marginTop: 29,
    marginBottom: 57
  },
  text: {
    maxWidth: 292,
    fontSize: height > 570 ? 19 : 16,
    textAlign: "center",
    color: colors.white,
    lineHeight: 24,
    fontFamily: fonts.medium
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height > 670 ? 94 : 34
  },
  button: {
    paddingTop: Platform.OS === "ios" ? padding.iOSPadding : null,
    justifyContent: "center",
    borderRadius: 34,
    width: 293,
    height: 50,
    backgroundColor: colors.seekForestGreen
  },
  skip: {
    fontSize: 18,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    letterSpacing: 1.0
  },
  skipText: {
    marginBottom: 30,
    fontSize: 16,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.book,
    textDecorationLine: "underline"
  },
  contentContainer: {
    width,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 57
  },
  pagination: {
    position: "absolute",
    bottom: height > 670 ? 190 : 130,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  dot: {
    backgroundColor: "#393939",
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
    marginHorizontal: 16,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 10,
    height: 10,
    borderRadius: 10 / 2
  }
} );
