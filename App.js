
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Button, TextInput, Modal, TouchableHighlight } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ImageList from './app/components/ImageList';

const APP_ACCESS_KEY = 'axNBnsOWS9a1Joggi1L8-3LGqkfuxjrXubhs26DMQy0';
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
  accessKey: APP_ACCESS_KEY
})
const toJson = require('unsplash-js').toJson;
const App = () => {
  const [searchValue, setSearchValue] = useState('good day')
  const [response, setResponse] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImageUri, setModalImageUri] = useState('https://reactnative.dev/img/tiny_logo.png')
  const searchImage = (searchValue) => {
    unsplash.search.photos(searchValue, 1)
      .then(toJson)
      .then(json => {
        setResponse(json)
      })
  }
  const onPress = () => {
    setModalVisible(!modalVisible)
  }
  const setModalImage = (image) => {
    setModalImageUri(image)
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    searchImage(searchValue)
  }, [])

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.searchInput}
          placeholder='input some word for search'
          autoFocus={true}
          onChangeText={text => setSearchValue(text)} 
          onSubmitEditing={() => {searchImage(searchValue)}}
        />
        <Button title='Search Foto' onPress={() => searchImage(searchValue)}/>
        <ScrollView style={styles.scrollView}>
          <ImageList 
            style={styles.imageList} 
            response={response} 
            changeModalImage={setModalImage} 
          />
        </ScrollView>
        <View>
          <Modal visible={modalVisible}>
            <TouchableHighlight onPress={onPress} style={styles.modalContainer}>
              <Image
                style={styles.imageModale}
                source={{
                uri: modalImageUri,
                }}
              />
            </TouchableHighlight>
          </Modal>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  imageList: {
    flex: 5,
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageModale: {
    width: '100%',
    height: '100%'
  },
});

export default App;
