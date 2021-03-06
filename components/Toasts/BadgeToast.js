// @flow

import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/banner/badgeToast";
import badges from "../../assets/badges";

type Props = {
  navigation: any,
  badge: Object
}

const BadgeToast = ( { navigation, badge }: Props ) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate( "Badges" )}
  >
    <View style={styles.row}>
      <View>
        <Text style={styles.headerText}>
          {i18n.t( badge.intlName ).toLocaleUpperCase()}
        </Text>
        <Text style={styles.description}>
          {i18n.t( "badges.you_found" )}
          {" "}
          {i18n.t( badge.infoText )}
        </Text>
        <Text style={styles.view}>{i18n.t( "banner.view" )}</Text>
      </View>
      <Image style={styles.image} source={badges[badge.earnedIconName]} />
    </View>
  </TouchableOpacity>
);

export default BadgeToast;
