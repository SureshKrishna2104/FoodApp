import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Dimension,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {FlatList} from 'react-native';

const ImageCarousel = ({images}) => {
  console.log(images,"ii");
  const windowWidth = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = useState(0);
 //console.log(images,"images")
  const onFlatlistUpdate = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }

  }, []);
  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        //renderItem={renderItem}
        keyExtractor={id=>JSON.stringify(id)}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={[styles.image, {width: windowWidth-50 }]}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationsRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
      />
      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {},
  image: {
    margin: 18,
    height: 258,
    resizeMode: 'contain',
    //width: 50,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#ededed',
    borderColor: '#c9c9c9',
    margin: 5,
  },
});

export default ImageCarousel;
