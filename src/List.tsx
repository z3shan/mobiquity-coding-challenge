import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';
import { API_KEY, RECORDS_PER_PAGE } from './config/constants';
import { Photo } from './types/types';

const List = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);





  const getImages = async () => {
    console.log('CALLED')
    if(searchQuery !== '' && !isLoading) {
      try {
        setIsLoading(true); // Show loader while fetching data
        axios
          .get(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchQuery}&per_page=${RECORDS_PER_PAGE}&page=${currentPage}&format=json&nojsoncallback=1`
          )
          .then((res) => {
            console.log('RESPONSE COMING', currentPage)
            if(currentPage === 1){
              setData(res.data.photos.photo);
            }else {
              setData([...data, ...res.data.photos.photo]);
            }
            setIsLoading(false);
          });
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  };


  useEffect(() => {
    console.log('CURRENT PAGE IN USE EFFECT', currentPage)

      getImages();

  }, [currentPage]);


  const loadMoreItem = () => {
    console.log('LOAD MORE CALLED')

      setCurrentPage(currentPage + 1);
  };
  const handleSearch = () => {
   // console.log('CURRENT PAGE IN NORMAL', currentPage);
    setCurrentPage(1);
    getImages();
  };

  const renderItem = ({ item }: { item: Photo; index: number }) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`,
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{item.title}</Text>
    </View>
  );

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.search}>
          <TextInput
            style={styles.textField}
            placeholder="Enter your text here"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <View style={styles.searchButton}>
          <Button onPress={handleSearch} title="Search" />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (!isLoading) {
            loadMoreItem();
          }
        }}
        onEndReachedThreshold={0.001}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle : {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  itemImageStyle:{
    width: 50,
    height: 50,
    marginRight: 16,

  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  textNameStyle: {
    fontSize: 16,
  },
  textEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',

  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  searchContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    margin: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#ccc',
    flexDirection: 'row',
    padding: 2,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
  },
  textField: {
    flex: 1,
    padding: 5,
  },
  searchButton: {
    paddingTop: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  historyContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  historyBreadcrumbs: {
    flexDirection: 'row',
  },
  historyText: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },

  resultContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
})

export default List;
