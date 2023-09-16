module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect', // Extends Jest with @testing-library/react-native matchers
  ],
};
