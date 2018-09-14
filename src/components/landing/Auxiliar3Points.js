import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Root, ActionSheet } from "native-base";

export default class Auxiliar3Points extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    const buttons = ["Ir a Home", "Ir preferencias", "Cancelar"];
    const cancelIndex = 2;
    return (
      <Root>
        <View>
          <TouchableOpacity
            onPress={() =>
              ActionSheet.show(
                {
                  options: buttons,
                  cancelButtonIndex: cancelIndex
                  //title: "Testing ActionSheet"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    navigate("Home");
                  } else if (buttonIndex == 1) {
                    navigate("Preference");
                  }
                }
              )
            }
          >
            <View style={Styles.buttonHabilitado}>
              <Text style={Styles.textButton}> {"3 Puntos ..."} </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Root>
    );
  }
}

const Styles = StyleSheet.create({
  buttonHabilitado: {
    marginTop: 40,
    width: 100,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#0f74e0",
    borderColor: "#0f74e0",
    borderWidth: 2
  },
  textButton: {
    fontSize: 13,
    color: "#ffffff"
  }
});
