import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import openInApp from "@matt-block/react-native-in-app-browser";
import { SlidersColorPicker } from "react-native-color";
import tinycolor from "tinycolor2";

class Configurator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "https://www.wikipedia.org",
      barModalVisible: false,
      controlModalVisible: false,
      defaultCustomToolbarColor: "#490fa0",

      // Actual setting values.
      preferredBarTintColor: undefined,
      preferredControlTintColor: undefined,
      barCollapsingEnabled: false
    };
  }

  onOpen = () => {
    const { url, ...settings } = { ...this.state };
    openInApp(url, { ios: settings });
  };

  render() {
    const {
      barModalVisible,
      controlModalVisible,
      defaultCustomToolbarColor,
      preferredBarTintColor,
      preferredControlTintColor,
      barCollapsingEnabled
    } = this.state;
    const barOverlayTextColor =
      preferredBarTintColor && tinycolor(preferredBarTintColor).isDark()
        ? "#FAFAFA"
        : "#222";
    const controlOverlayTextColor =
      preferredControlTintColor && tinycolor(preferredControlTintColor).isDark()
        ? "#FAFAFA"
        : "#222";

    return (
      <View>
        <Text style={styles.intro}>
          The following is the available set of customizations for iOS.
        </Text>
        <Text style={styles.intro}>
          To try out the Android conterpart, run this example app on an Android
          device.
        </Text>
        <Text style={styles.heading}>iOS Settings</Text>
        <View style={styles.settingRow}>
          <Text>Set bar tint color</Text>
          <TouchableOpacity
            onPress={() => this.setState({ barModalVisible: true })}
            style={[
              styles.colorPreview,
              { backgroundColor: preferredBarTintColor }
            ]}
          >
            <Text style={[styles.colorString, { color: barOverlayTextColor }]}>
              {!preferredBarTintColor ? "Click to set" : preferredBarTintColor}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingRow}>
          <Text>Set controls tint color</Text>
          <TouchableOpacity
            onPress={() => this.setState({ controlModalVisible: true })}
            style={[
              styles.colorPreview,
              { backgroundColor: preferredControlTintColor }
            ]}
          >
            <Text
              style={[styles.colorString, { color: controlOverlayTextColor }]}
            >
              {!preferredControlTintColor
                ? "Click to set"
                : preferredControlTintColor}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingRow}>
          <Text>Enabled bar collapsing</Text>
          <Switch
            value={barCollapsingEnabled}
            onValueChange={barCollapsingEnabled =>
              this.setState({ barCollapsingEnabled })
            }
          />
        </View>
        <Button
          title="Open In-App Browser"
          onPress={this.onOpen}
          style={styles.openButton}
        />

        <SlidersColorPicker
          visible={barModalVisible}
          color={
            !preferredBarTintColor
              ? defaultCustomToolbarColor
              : preferredBarTintColor
          }
          returnMode={"hex"}
          onCancel={() => {
            this.setState({
              preferredBarTintColor: undefined,
              barModalVisible: false
            });
          }}
          onOk={preferredBarTintColor => {
            this.setState({ preferredBarTintColor, barModalVisible: false });
          }}
          okLabel="Done"
          cancelLabel="Reset"
          swatches={[]}
          swatchesLabel=""
        />
        <SlidersColorPicker
          visible={controlModalVisible}
          color={
            !preferredControlTintColor
              ? defaultCustomToolbarColor
              : preferredControlTintColor
          }
          returnMode={"hex"}
          onCancel={() => {
            this.setState({
              preferredControlTintColor: undefined,
              controlModalVisible: false
            });
          }}
          onOk={preferredControlTintColor => {
            this.setState({
              preferredControlTintColor,
              controlModalVisible: false
            });
          }}
          okLabel="Done"
          cancelLabel="Reset"
          swatches={[]}
          swatchesLabel=""
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    marginVertical: 4
  },
  heading: {
    marginVertical: 20,
    fontSize: 16,
    color: "#333"
  },
  colorString: {
    height: 24,
    paddingTop: 4
  },
  colorPreview: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#ebebeb"
  },
  settingRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48
  },
  openButton: {
    marginTop: 12
  }
});

export default Configurator;
