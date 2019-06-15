import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';

const notDoneIcon = require('./assets/circle.png')
const doneIcon = require('./assets/check-symbol.png')
const deleteIcon = require('./assets/trash.png')

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.animateHeight = new Animated.Value(0);

    this.translateX = new Animated.Value(0);

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        this.translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 65) {
          this.delete();
        } else {
          Animated.spring(this.translateX, {
            toValue: 0,
          }).start();
        }
      },
      onPanResponderTerminationRequest: () => false,
    });
  }
  componentDidMount() {
    Animated.timing(this.animateHeight, {
      toValue: 50,
    }).start();
  }
  delete() {
    Animated.timing(this.animateHeight, {
      toValue: 0,
    }).start(() => {
      this.props.onDeleteItem();
    });
  }
  render() {
    const {
      item,
      onToggleItem,
    } = this.props;

    return (<View style={styles.itemWrap}>
      <View style={styles.bgDeleteWrap}>
        <Text style={styles.bgDelete}>DELETE</Text>
      </View>
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[styles.item, {
          height: this.animateHeight,
        }, {
          transform: [{
            translateX: this.translateX.interpolate({
              inputRange: [0, 70],
              outputRange: [0, 70],
              extrapolate: 'clamp',
            }),
          }]
        }]}
      >
        <TouchableOpacity
          onPress={onToggleItem}
        >
          <Image
            source={item.done ? doneIcon : notDoneIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={{ flex: 1}}>
          <Text
            style={[
              styles.itemText,
              item.done ? styles.textDone : null
            ]}
          >
            {item.text}
          </Text>
        </View>
        <TouchableOpacity onPress={() => this.delete()}>
          <Image
            source={deleteIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>);
  }
}

const styles = StyleSheet.create({
  itemWrap: {
    borderBottomWidth: 1,
    borderColor: '#dadada',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    height: 0,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  textDone: {
    textDecorationLine: 'line-through',
  },
  bgDeleteWrap: {
    position: 'absolute',
    backgroundColor: 'red',
    alignContent: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    width: 70,
  },
  bgDelete: {
    color: 'white',
    paddingHorizontal: 5,
  },
});
