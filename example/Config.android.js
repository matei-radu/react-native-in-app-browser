import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {InAppBrowser} from '@matt-block/react-native-in-app-browser';
import {SlidersColorPicker} from 'react-native-color';
import tinycolor from 'tinycolor2';
import pizzaIcon from './pizza-icon.png';

class Configurator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.wikipedia.org',
      modalVisible: false,
      defaultCustomToolbarColor: '#490fa0',

      // Actual setting values.
      toolbarColor: undefined,
      showTitle: false,
      addDefaultShareMenu: false,
      closeButtonIcon: false,
    };
  }

  onOpen = () => {
    const {url, ...settings} = {...this.state};
    if (settings.closeButtonIcon) {
      settings.closeButtonIcon = pizzaIcon;
    }

    InAppBrowser.open(url, {android: settings});
  };

  render() {
    const {
      modalVisible,
      showTitle,
      addDefaultShareMenu,
      toolbarColor,
      defaultCustomToolbarColor,
      closeButtonIcon,
    } = this.state;
    const overlayTextColor =
      toolbarColor && tinycolor(toolbarColor).isDark() ? '#FAFAFA' : '#222';
    return (
      <View>
        <Text style={styles.intro}>
          The following is the available set of customizations for Android.
        </Text>
        <Text style={styles.intro}>
          To try out the iOS conterpart, run this example app on an iOS device.
        </Text>
        <Text style={styles.heading}>Android Settings</Text>
        <View style={styles.settingRow}>
          <Text>Set toolbar color</Text>
          <TouchableOpacity
            onPress={() => this.setState({modalVisible: true})}
            style={[styles.colorPreview, {backgroundColor: toolbarColor}]}>
            <Text style={[styles.colorString, {color: overlayTextColor}]}>
              {!toolbarColor ? 'Click to set' : toolbarColor}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingRow}>
          <Text>Show site title</Text>
          <Switch
            value={showTitle}
            onValueChange={newValue => this.setState({showTitle: newValue})}
          />
        </View>
        <View style={styles.settingRow}>
          <Text>Add default share menu</Text>
          <Switch
            value={addDefaultShareMenu}
            onValueChange={newValue =>
              this.setState({addDefaultShareMenu: newValue})
            }
          />
        </View>
        <View style={styles.settingRow}>
          <Text>Use custom close button icon</Text>
          <Switch
            value={closeButtonIcon}
            onValueChange={newValue =>
              this.setState({closeButtonIcon: newValue})
            }
          />
        </View>
        <Button
          title="Open In-App Browser"
          onPress={this.onOpen}
          style={styles.openButton}
        />

        <SlidersColorPicker
          visible={modalVisible}
          color={!toolbarColor ? defaultCustomToolbarColor : toolbarColor}
          returnMode={'hex'}
          onCancel={() => {
            this.setState({toolbarColor: undefined, modalVisible: false});
          }}
          onOk={newValue => {
            this.setState({toolbarColor: newValue, modalVisible: false});
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
    marginVertical: 4,
  },
  heading: {
    marginVertical: 20,
    fontSize: 16,
    color: '#333',
  },
  colorPreview: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ebebeb',
    elevation: 1,
  },
  settingRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
  },
  openButton: {
    marginTop: 12,
  },
});

export default Configurator;
