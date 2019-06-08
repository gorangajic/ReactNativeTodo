import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const list = [{
    text: 'zvati dalibora',
    done: false,
  }, {
    text: 'doci na predavanje',
    done: false,
  }, {
    text: 'nauciti react',
    done: false,
  }];
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {list.map((item, index) => (<View key={index}>
          <Text>{item.text}</Text>
        </View>))}
      </View>
      <View style={styles.inputWrap}>
        <TextInput placeholder="New Task" style={styles.input} />
        <View style={styles.button}>
          <Text>Save</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  list: {
    flex: 1,
    backgroundColor: 'red',
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
  }
});
