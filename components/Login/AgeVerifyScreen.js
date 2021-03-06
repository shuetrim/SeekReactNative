// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerIOS,
  DatePickerAndroid,
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";

import i18n from "../../i18n";
import { requiresParent } from "../../utility/dateHelpers";
import styles from "../../styles/login/login";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

class AgeVerifyScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      chosenDate: Platform.OS === "ios" ? new Date() : moment().format( "YYYY-MM-DD" )
    };

    this.setDate = this.setDate.bind( this );
  }

  setDate( newDate ) {
    this.setState( {
      chosenDate: newDate
    } );
  }

  async setDateAndroid() {
    try {
      const {
        action,
        year,
        month,
        day
      } = await DatePickerAndroid.open( {
        date: new Date(),
        maxDate: new Date(),
        mode: "spinner"
      } );
      if ( action !== DatePickerAndroid.dismissedAction ) {
        const userBirthday = moment( new Date( year, month, day ) ).format( "YYYY-MM-DD" );
        this.setDate( userBirthday );
      }
    } catch ( { code, message } ) {
      console.warn( "Cannot open date picker", message );
    }
  }

  submit() {
    const { navigation } = this.props;
    const { chosenDate } = this.state;

    if ( requiresParent( chosenDate ) ) {
      navigation.navigate( "Parent" );
    } else {
      navigation.navigate( "Signup" );
    }
  }

  render() {
    const { chosenDate } = this.state;
    const { navigation } = this.props;

    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={[colors.seekGreen, colors.seekTeal]}
      >
        <View style={styles.container}>
          <Text style={styles.headerText}>
            {i18n.t( "inat_signup.enter_birthday" )}
          </Text>
          <View style={styles.secondHeaderTextContainer}>
            <Text style={styles.secondHeaderText}>
              {i18n.t( "inat_signup.permission" )}
            </Text>
          </View>
        </View>
        <View style={styles.datePickerContainer}>
          { Platform.OS === "ios" ? (
            <DatePickerIOS
              date={chosenDate}
              maximumDate={new Date()}
              mode="date"
              onDateChange={this.setDate}
            />
          ) : (
            <TouchableOpacity
              style={styles.datePickerInputField}
              onPress={() => this.setDateAndroid()}
            >
              <Text style={[styles.text, styles.darkText]}>{chosenDate}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => this.submit()}
          >
            <Text style={styles.buttonText}>
              {i18n.t( "inat_signup.continue" )}
            </Text>
          </TouchableOpacity>
          <Text
            style={[styles.textLink, { fontSize: 17 }]}
            onPress={() => navigation.navigate( "Privacy" )}
          >
            {i18n.t( "inat_signup.privacy" )}
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

export default AgeVerifyScreen;
