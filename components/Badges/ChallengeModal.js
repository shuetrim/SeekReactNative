import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
  // ImageBackground
} from "react-native";

import styles from "../../styles/badges/challengeBadge";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import badges from "../../assets/badges";
import icons from "../../assets/icons";

type Props = {
  toggleChallengeModal: Function,
  challenge: Object
};

const ChallengeModal = ( { toggleChallengeModal, challenge }: Props ) => (
  <SafeAreaView style={styles.safeView}>
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={badges[challenge.earnedIconName]}
            style={styles.image}
          />
          {/* <ImageBackground source={icons.banner} style={styles.banner}>
            <Text style={styles.bannerText}>{challenge.name}</Text>
          </ImageBackground> */}
        </View>
        <Text style={styles.headerText}>
          {i18n.t( "challenges.congrats", { month: i18n.t( challenge.month ).toLocaleUpperCase() } ).toLocaleUpperCase()}
        </Text>
        <Text style={styles.text}>
          {i18n.t( "challenges.thanks" )}
        </Text>
        <View style={styles.center}>
          <Image source={logos.wwfop} style={styles.logo} />
        </View>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => toggleChallengeModal()}>
        <Image source={icons.closeModal} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default ChallengeModal;
