import 'react-native';
import React from 'react';
// Note: import explicitly to use the types shiped with jest.
import {it, describe, expect, jest, beforeEach} from '@jest/globals';
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from '@testing-library/react-native';
import SearchScreen from './Search';
import axios from 'axios';

// Mock axios to prevent actual HTTP requests during tests
jest.mock('axios');

const mockResponse = {
  data: {
    photos: {
      photo: [
        {
          id: '1',
          isfamily: 0,
          isfriend: 0,
          ispublic: 1,
          owner: 'owner1',
          title: 'Cat 1',
          farm: 1,
          server: 'server1',
          secret: 'secret1',
        },
        {
          id: '2',
          isfamily: 0,
          isfriend: 0,
          ispublic: 1,
          title: 'Cat 2',
          farm: 2,
          server: 'server2',
          secret: 'secret2',
        }
      ],
    },
  },
};

describe('<SearchScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    const {getByPlaceholderText} = render(<SearchScreen />);
    const inputElement = getByPlaceholderText('Enter your text here');
    expect(inputElement).toBeDefined();
  });

  it('updates the searchQuery state when the input value changes', () => {
    const {getByPlaceholderText} = render(<SearchScreen />);
    const inputElement = getByPlaceholderText('Enter your text here');

    fireEvent.changeText(inputElement, 'cats');
    expect(inputElement.props.value).toBe('cats');
  });

  it('fetches and displays search results correctly', async () => {
    // Mock axios.get to return the mock response
    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    const {getByTestId} = render(<SearchScreen />);
    const searchButton = getByTestId('search-button');

    // Change the input value and click the search button
    const inputElement = getByTestId('search-field');
    fireEvent.changeText(inputElement, 'cats');
    act(() => {
      fireEvent.press(searchButton);
    });

    // Wait for the component to finish fetching data
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Verify that the search results are displayed
    const cat1Text = screen.getByText('Cat 1');
    const cat2Text = screen.getByText('Cat 2');

    expect(cat1Text).toBeDefined();
    expect(cat2Text).toBeDefined();
  });

  it('should not display data if no results are found', async () => {
    // Mock axios.get to return an empty response
    jest.spyOn(axios, 'get').mockResolvedValue({data: {photos: {photo: []}}});

    const {getByTestId} = render(<SearchScreen />);
    const searchButton = getByTestId('search-button');

    // Change the input value and click the search button
    const inputElement = getByTestId('search-field');
    fireEvent.changeText(inputElement, 'nonexistentkeyword');
    act(() => {
      fireEvent.press(searchButton);
    });

    // Wait for the component to finish fetching data
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Verify that no search results are displayed
    const cat1Text = screen.queryByText('Cat 1');
    const cat2Text = screen.queryByText('Cat 2');

    expect(cat1Text).toBeNull();
    expect(cat2Text).toBeNull();
  });

  /*Ideally we should add few more tests for cases like ( load more when user scrolls down, for search history etc. to achieve 100% code coverage*/
});
