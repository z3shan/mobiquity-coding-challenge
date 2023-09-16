import 'react-native';
import React from 'react';
// Note: import explicitly to use the types shiped with jest.
import {it, describe, expect, jest} from '@jest/globals';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SearchScreen from './Search';

// Mock axios to prevent actual HTTP requests during tests
jest.mock('axios');

describe('SearchScreen', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<SearchScreen />);
    const inputElement = getByPlaceholderText('Enter your text here');
    expect(inputElement).toBeDefined();
  });

  it('updates the searchQuery state when the input value changes', () => {
    const { getByPlaceholderText } = render(<SearchScreen />);
    const inputElement = getByPlaceholderText('Enter your text here');

    fireEvent.changeText(inputElement, 'cats');
    expect(inputElement.props.value).toBe('cats');
  });




});
