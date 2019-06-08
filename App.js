import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

const notDoneIcon = require('./assets/circle.png')
const doneIcon = require('./assets/check-symbol.png')


export default class App extends React.Component {
  render() {
    const list = [{
      text: 'zvati dalibora',
      done: false,
    }, {
      text: 'doci na predavanje',
      done: false,
    }, {
      text: 'nauciti react',
      done: true,
    }, {
      text: 'zvati dalibora',
      done: false,
    }, {
      text: 'doci na predavanje',
      done: false,
    }, {
      text: 'nauciti react',
      done: true,
    }, {
      text: 'zvati dalibora',
      done: false,
    }, {
      text: 'doci na predavanje',
      done: false,
    }, {
      text: 'nauciti react',
      done: true,
    }];
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
            <Image
              source={item.done ? doneIcon : notDoneIcon}
              style={styles.icon}
            />
            <Text
              style={[
                styles.itemText,
                item.done ? styles.textDone : null
              ]}
            >
              {item.text}
            </Text>
          </View>))}
        </ScrollView>
        <View style={styles.inputWrap}>
          <TextInput placeholder="New Task" style={styles.input} />
          <View style={styles.button}>
            <Text>Save</Text>
          </View>
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
