import React, {useState, useEffect} from 'react';
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
const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const handleEndReached = () => {};
  const fetchImages = async () => {
    if (searchQuery !== '') {
      try {
        setLoading(true); // Show loader while fetching data

        const response = await axios.get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchQuery}&per_page=${RECORDS_PER_PAGE}&page=${page}&format=json&nojsoncallback=1`,
        );

        const newPhotos: Photo[] = response.data.photos.photo;

        if (newPhotos.length > 0) {
          setSearchResult(newPhotos);
          setSearchHistory(prevHistory => [...prevHistory, searchQuery]);
          setSearchQuery('');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false); // Hide loader when the request is complete
      }
    }
  };

  const clearSearchHistory = () => {
    setSearchQuery('');
    setSearchHistory([]);
    setSearchResult([]);
  };

  const searchBar = (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.search}>
          <TextInput
            style={styles.textField}
            placeholder="Enter your text here"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <View style={styles.searchButton}>
          <Button onPress={fetchImages} title="Search" />
        </View>
      </View>
      {searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyBreadcrumbs}>
            <View style={{width: '50%', justifyContent: 'center'}}>
              <Text>Search History:</Text>
            </View>
            <View
              style={{
                width: '50%',
                alignItems: 'flex-end',
                paddingRight: '2%',
              }}>
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
                onPress={() => console.log('Selected:', item)}
                style={styles.chip}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const renderItem = ({item}: {item: Photo}) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`,
        }}
        style={{width: 100, height: 100}}
      />
      <Text>{item.title}</Text>
    </View>
  );

  const renderFooter = () => {
    return loadingMore ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    ) : null;
  };

  const searchResults = (
    <View style={styles.resultContainer}>
      {searchResult.length > 0 && (
        <>
          <Text style={styles.resultHeader}>Search Results</Text>
          <FlatList
            data={searchResult}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            onEndReached={handleEndReached}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
          />
        </>
      )}
    </View>
  );

  return (
    <View style={styles.searchContainer}>
      {searchBar}
      {loading ? (
        // Show loader while loading data
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        // Show search results when not loading
        searchResults
      )}
    </View>
  );
};

export default SearchScreen;
