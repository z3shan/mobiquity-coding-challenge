import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import styles from './Search.styles';

import {Photo} from '../types/types';
import {API_KEY, RECORDS_PER_PAGE} from '../config/constants';


/**
 * Define the SearchScreen component.
 * @returns {React.ReactNode} The SearchScreen component.
 */

const SearchScreen = () => {
  // State variables for search functionality and data handling.
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [data, setData] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Function to fetch images from Flickr API.
   */
  const getImages = async () => {
    if (searchQuery !== '' && !isLoading) {
      try {
        setIsLoading(true);
        axios
          .get(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchQuery}&per_page=${RECORDS_PER_PAGE}&page=${currentPage}&format=json&nojsoncallback=1`,
          )
          .then(res => {
            if (currentPage === 1) {
              setData(res.data.photos.photo);
              if (!searchHistory.includes(searchQuery)) {
                setSearchHistory(prevHistory => [...prevHistory, searchQuery]);
              }
            } else {
              setData(prevData => [...prevData, ...res.data.photos.photo]);
            }
            setIsLoading(false);
          });
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  };

  useEffect(() => {
    getImages();
  }, [currentPage]);

  /**
   * Function to load more items when reaching the end of the list.
   */
  const loadMoreItem = () => {
    if (!isLoading) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * Function to handle search button press.
   */
  const handleSearch = async () => {
    await setCurrentPage(1);
    getImages();
  };

  /**
   * Function to clear search history and reset data.
   */
  const clearSearchHistory = () => {
    setSearchQuery('');
    setSearchHistory([]);
    setData([]);
    setCurrentPage(1);
  };


  /**
   * Memoized renderItem function to render individual list items.
   * @param {Object} param0 - The item and index to render.
   * @returns {React.ReactNode} The rendered list item.
   */
  const renderItem = useMemo(
    () =>
      ({item}: {item: Photo; index: number}) =>
        (
          <View style={styles.item}>
            <Image
              source={{
                uri: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`,
              }}
              style={{width: 100, height: 100}}
            />
            <Text>{item.title}</Text>
          </View>
        ),
    [],
  );


  /**
   * Function to render the loading indicator at the end of the list.
   * @returns {React.ReactNode|null} The loading indicator component or null.
   */
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
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            testID="search-field"
          />
        </View>
        <View style={styles.searchButton}>
          <Button testID="search-button" onPress={handleSearch} title="Search" />
        </View>
      </View>
      {searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyBreadcrumbs}>
            <View style={{width: '50%', justifyContent: 'center'}}>
              <Text>Search History:</Text>
            </View>
            <View
              style={styles.historyClearStyle}>
              {searchHistory.length > 0 && (
                <TouchableOpacity onPress={clearSearchHistory}>
                  <Text style={styles.historyText}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.chipsContainer}>
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chip}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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


export default SearchScreen;
