import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableOpacity
} from 'react-native';

const notDoneIcon = require('./assets/circle.png')
const doneIcon = require('./assets/check-symbol.png')
const deleteIcon = require('./assets/trash.png')


// za domaci brisanje todo-a koji su zavrseni
// this.setState({
//   list: this.state.list.filter(item => {
//     return !item.done;
//   })
// });

// this.setState({
//   list: this.state.list.filter(item => !item.done)
// });

// Za domaci isto
// AsyncStorage da cuva podatke todo liste

// ko hoce moze i da implementira swipe to delete
// https://www.npmjs.com/package/react-native-swipeout

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      input: '',
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem() {
    this.setState({
      list: [...this.state.list, {
        text: this.state.input,
        done: false,
      }],
      input: '',
    });
  }
  toggleItem(index) {
    this.setState({
      list: this.state.list.map((item, i) => {
          if (i !== index) {
            return item;
          }
          return {
            ...item,
            done: !item.done,
          };
      })
    })
  }
  deleteItem(index) {
    this.setState({
      list: this.state.list.filter((item, i) => {
          return i !== index;
      })
    })
  }
  render() {
    const {
      list,
    } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <ScrollView style={styles.list}>
          <Text style={styles.title}>
            My ToDo List
          </Text>
          {list.map((item, index) => (<View
            key={index}
            style={styles.item}
          >
            <TouchableOpacity
              onPress={() => this.toggleItem(index)}
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
            <TouchableOpacity onPress={() => this.deleteItem(index)}>
              <Image
                source={deleteIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>))}
        </ScrollView>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="New Task"
            style={styles.input}
            value={this.state.input}
            onChangeText={(newText) => {
              this.setState({ input: newText });
            }}
            onSubmitEditing={this.addItem}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.addItem}
          >
            <Text>Save</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  inputWrap: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 20,
  },
  button: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    paddingHorizontal: 40,
    paddingTop: 15,
    marginBottom: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#dadada',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  textDone: {
    textDecorationLine: 'line-through',
  },
});
