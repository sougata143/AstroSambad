const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add custom resolver for React Native modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
};

// Add additional watch folders
config.watchFolders = [
  ...(config.watchFolders || []),
  path.resolve(__dirname, 'node_modules/react-native/Libraries'),
  path.resolve(__dirname, 'node_modules/@react-native'),
];

// Add additional asset extensions
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg');

// Add sourceExts
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];

module.exports = config; 