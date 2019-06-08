import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

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
        <Text style={styles.title}>
          My ToDo List
        </Text>
        {list.map((item, index) => (<View
          key={index}
          style={styles.item}
        >
          <Image
            source={require('./assets/circle.png')}
            style={styles.icon}
          />
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
  }
});
