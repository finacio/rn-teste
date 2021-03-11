import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

import axios from "axios";

export default function DetailScreen({ route }) {
    const [posts, setPosts] = useState([]);
    const url = `http://gateway.marvel.com/v1/public/characters/${route.params.idItem}?ts=1&apikey=f3d08986955380b5ccc7ad7d8918f3ae&hash=0896943f190926c3a23bf998ffe3dea6`;

    useEffect(() => {
      async function fetchData() {
        await axios.get(url).then(result => {
          setPosts(result.data.data.results)
        })
      }
      fetchData();
    }, [])
  
    const Item = ({ title, image, comics }) => (
      <View style={styles.itemContainer}>
        <Image style={styles.itemImage} source={{uri: image.path + '/portrait_xlarge.' + image.extension}} />
        <View style={styles.itemContainerDescription}>
          <Text style={styles.itemTitleDescription}>Description</Text>
          <Text style={styles.itemDescription}>{title !== "" ? title : "No description..."}</Text>
        </View>
        <View style={styles.itemContainerComics}>
          <Text style={styles.itemTitleDescription}>Comics</Text>
          <FlatList
            data={comics}
            renderItem={({item}) => <Text style={styles.itemDescription}>{item.name}</Text>}
            keyExtractor={({name}) => name} 
          />
        </View>
      </View>
    );
  
    const renderItem = ({ item }) => (
      <Item title={item.description} image={item.thumbnail} comics={item.comics.items}/>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={({id}) => id.toString()}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
    justifyContent: 'center',
  },
  itemContainer: {
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  itemContainerDescription: {
    textAlign: 'center',
    marginTop: 35,
    borderBottomWidth: 1,
    paddingBottom: 35,
  },
  itemTitleDescription: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20
  },
  itemDescription: {
      color: '#a2a2a2',
      marginTop: 2,
      marginBottom: 2
    },
  itemTitleComics: {
    fontSize: 20,
    color: '#a2a2a2',
    marginBottom: 20
  },
  itemContainerComics: {
    alignContent: 'center',
    marginTop: 35,
  },
  itemImage: {
    width: 200, 
    height: 200,
    marginRight: 20,
    borderColor: '#000',
    borderWidth: 1,
    alignSelf: 'center',
    margin: 0
  },
  itemTitle: {
    fontSize: 18
  },
  itemLink: {
    fontSize: 16,
    marginTop: 2,
    color: '#aaaaaa',
  }
});
