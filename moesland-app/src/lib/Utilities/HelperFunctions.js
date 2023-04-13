import { Dimensions, Image } from 'react-native';

// Calculates the height of an image based on the device screen width and image aspect ratio
export const calculateImageHeightForAspectRatio = (uri) => {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => {
      const screenWidth = Dimensions.get('window').width;
      const aspectRatio = width / height;
      const calculatedImageHeight = screenWidth / aspectRatio;
      resolve(calculatedImageHeight);
    }, (error) => {
      reject(error);
    });
  });
}

// Returns 1/8th of the screen height to use as image height in lists
export const calculateImageHeightForScreenSize = () => {
  const screenHeight = Dimensions.get('window').height;
  return screenHeight * 0.125;
}