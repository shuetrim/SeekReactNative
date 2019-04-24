// @flow

import React, { Component } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Platform,
  Alert
} from "react-native";
import RNFS from "react-native-fs";

import styles from "../../styles/menu/observations";
import iconicTaxa from "../../assets/iconicTaxa";

type Props = {
  navigation: any,
  item: Object
}

class ObservationCard extends Component<Props> {
  constructor() {
    super();

    this.state = {
      photo: null
    };
  }

  componentWillMount() {
    this.checkForSeekV1Photos();
  }

  setPhoto( photo ) {
    this.setState( { photo } );
  }

  checkForSeekV1Photos() {
    const { item } = this.props;

    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;

    if ( Platform.OS === "ios" && seekv1Photos ) {
      const photoPath = `${seekv1Photos}/${item.uuidString}`;
      if ( RNFS.exists( photoPath ) ) {
        RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } );
      } else {
        this.checkForSeekV2Photos();
      }
    } else {
      this.checkForSeekV2Photos();
    }
  }

  checkForSeekV2Photos() {
    const { item } = this.props;
    const { taxon } = item;
    const { defaultPhoto } = taxon;

    if ( defaultPhoto ) {
      if ( defaultPhoto.mediumUrl ) {
        this.setPhoto( { uri: defaultPhoto.mediumUrl } );
      } else if ( defaultPhoto.squareUrl ) {
        this.setPhoto( { uri: defaultPhoto.squareUrl } );
      } else {
        this.setPhoto( iconicTaxa[taxon.iconicTaxonId] );
      }
    } else {
      this.setPhoto( iconicTaxa[taxon.iconicTaxonId] );
    }
  }

  render() {
    const { navigation, item } = this.props;
    const { photo } = this.state;
    const { taxon } = item;

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
  }
}

export default ObservationCard;
