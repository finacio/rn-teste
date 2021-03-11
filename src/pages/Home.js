import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=f3d08986955380b5ccc7ad7d8918f3ae&hash=0896943f190926c3a23bf998ffe3dea6";

  useEffect(() => {
    async function fetchData() {
      await axios.get(url).then(result => {
        setPosts(result.data.data.results)
      })
    }
    fetchData();
  }, [])

  const Item = ({ title, image, keyItem }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{uri: image.path + '.' + image.extension}} />
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
        <TouchableOpacity onPress={() => {navigation.navigate('Details', { name: title, idItem: keyItem })}}>
            <Text style={styles.itemLink}>See more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.name} image={item.thumbnail} keyItem={item.id}/>
  );

  return (
    <View style={styles.container}>
      {console.log("verificando os heroes", posts)}
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
    justifyContent: 'center',
},
itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    paddingBottom: 20
  },
  itemImage: {
    width: 60, 
    height: 60,
    marginRight: 20,
    borderColor: '#000',
    borderWidth: 1
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
