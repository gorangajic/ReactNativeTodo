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
import TodoItem from './TodoItem';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        text: 'Something',
        done: false,
      }],
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
          {list.map((item, index) => (<TodoItem
            key={index}
            item={item}
            onToggleItem={() => this.toggleItem(index)}
            onDeleteItem={() => this.deleteItem(index)}
          />))}
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
