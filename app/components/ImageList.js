import React from 'react'
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native'

const ImageList = ({response, changeModalImage}) => {
  const { results } = response

  if(results) {
    const listItems = results.map(photo => {
      const { id, alt_description, user: {name}, urls: {thumb, regular} } = photo
      const onPress = () => {
        changeModalImage(regular)
      }
  
      return (
        <View style={styles.item} key={id}>
          <TouchableHighlight onPress={onPress}>
            <View>
              <Image
                source={{
                  uri: thumb,
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.itemInfo}>
            <Text style={styles.itemDescription}>{alt_description}</Text>
            <Text style={styles.itemAuthor}>{name}</Text>
          </View>
        </View>
      )
    })
    return (listItems)
  }
  return (null)
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    minHeight: 50,
    marginTop: 15,
  },
  itemInfo: {
    marginLeft: 8,
    marginRight: 40,
  },
  itemDescription: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
  itemAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: 'black',
  }
});

export default ImageList
