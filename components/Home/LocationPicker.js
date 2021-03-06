// @flow

import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView
} from "react-native";
import Geocoder from "react-native-geocoder";

import i18n from "../../i18n";
import LocationMap from "./LocationMap";
import { truncateCoordinates, getLatAndLng } from "../../utility/locationHelpers";
import icons from "../../assets/icons";
import styles from "../../styles/home/locationPicker";

const latitudeDelta = 0.2;
const longitudeDelta = 0.2;

type Props = {
  latitude: number,
  longitude: number,
  location: string,
  updateLocation: Function,
  toggleLocationPicker: Function
}

class LocationPicker extends Component<Props> {
  constructor( {
    latitude,
    longitude,
    location
  }: Props ) {
    super();

    this.state = {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude,
        longitude
      },
      location
      // error: null
    };

    this.onRegionChange = this.onRegionChange.bind( this );
    this.returnToUserLocation = this.returnToUserLocation.bind( this );
  }

  onRegionChange( newRegion ) {
    this.setState( {
      region: newRegion
    }, () => this.reverseGeocodeLocation( newRegion.latitude, newRegion.longitude ) );
  }

  setLocationUndefined() {
    this.setState( { location: i18n.t( "location_picker.undefined" ) } );
  }

  setLocation( location ) {
    this.setState( { location } );
  }

  reverseGeocodeLocation( latitude, longitude ) {
    Geocoder.geocodePosition( { lat: latitude, lng: longitude } ).then( ( result ) => {
      if ( result.length === 0 ) {
        this.setLocationUndefined();
      }
      const { locality, subAdminArea } = result[0];
      if ( locality || subAdminArea ) {
        this.setLocation( locality || subAdminArea );
      } else {
        this.setLocationUndefined();
      }
    } ).catch( () => {
      this.setLocationUndefined();
    } );
  }

  findLatAndLng( location ) {
    Geocoder.geocodeAddress( location ).then( ( result ) => {
      if ( result.length === 0 ) {
        this.setLocationUndefined();
      }
      const { locality, subAdminArea, position } = result[0];
      const { lng, lat } = position;
      this.setState( {
        location: locality || subAdminArea,
        region: {
          latitude: truncateCoordinates( lat ),
          longitude: truncateCoordinates( lng ),
          latitudeDelta,
          longitudeDelta
        }
      } );
    } ).catch( () => {
      this.setLocationUndefined();
    } );
  }

  async returnToUserLocation() {
    const location = await getLatAndLng();

    this.setState( {
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      },
      location: this.reverseGeocodeLocation( location.latitude, location.longitude )
    } );
  }

  render() {
    const { region, location } = this.state;
    const { updateLocation, toggleLocationPicker } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <View style={styles.header}>
            <TouchableOpacity
              hitSlop={styles.touchable}
              style={styles.backButton}
              onPress={() => toggleLocationPicker()}
            >
              <Image
                source={icons.backButton}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>{i18n.t( "location_picker.species_nearby" ).toLocaleUpperCase()}</Text>
            </View>
            <View style={styles.row}>
              <Image source={icons.locationWhite} />
              <TextInput
                style={styles.inputField}
                placeholder={location}
                autoCapitalize="words"
                textContentType="addressCity"
                onChangeText={text => this.findLatAndLng( text )}
              />
            </View>
          </View>
          <View style={styles.mapContainer}>
            <LocationMap
              region={region}
              onRegionChange={this.onRegionChange}
              returnToUserLocation={this.returnToUserLocation}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateLocation( truncateCoordinates( region.latitude ), truncateCoordinates( region.longitude ), location )}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "location_picker.button" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default LocationPicker;
