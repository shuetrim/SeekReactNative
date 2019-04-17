// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import RNFS from "react-native-fs";

import styles from "../../styles/menu/observations";
import iconicTaxa from "../../assets/iconicTaxa";

type Props = {
  navigation: any,
  item: Object
}

const ObservationCard = ( { navigation, item }: Props ) => {
  const { taxon } = item;
  const { defaultPhoto } = taxon;
  let photo;

  let seekV1Photo;

  if ( Platform.OS === "ios" ) {
    RNFS.readdir( `${RNFS.DocumentDirectoryPath}/large` ).then( ( result ) => {
      result.forEach( ( path ) => {
        if ( path === item.uuidString ) {
          seekV1Photo = `${RNFS.DocumentDirectoryPath}/large/${result}`;
        }
      } );
    } );
  }

  if ( defaultPhoto ) {
    if ( defaultPhoto.mediumUrl ) {
      photo = { uri: defaultPhoto.mediumUrl };
    } else if ( seekV1Photo ) {
      photo = { uri: seekV1Photo };
    } else if ( defaultPhoto.squareUrl ) {
      photo = { uri: defaultPhoto.squareUrl };
    } else if ( taxon.iconicTaxonId ) {
      photo = iconicTaxa[taxon.iconicTaxonId];
    }
  } else {
    photo = iconicTaxa[taxon.iconicTaxonId];
  }


  return (
    <TouchableOpacity
      style={styles.card}
      onPress={ () => navigation.push( "Species", {
        id: taxon.id,
        commonName: taxon.preferredCommonName,
        scientificName: taxon.name
      } )}
    >
      <Image style={styles.image} source={photo} />
      <View style={styles.speciesNameContainer}>
        <Text style={styles.commonNameText}>
          {taxon.preferredCommonName ? taxon.preferredCommonName : taxon.name}
        </Text>
        <Text style={styles.scientificNameText}>{taxon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ObservationCard;
