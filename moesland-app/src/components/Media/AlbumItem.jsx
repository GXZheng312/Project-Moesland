import { Image, Pressable, Text, View } from 'react-native';
import styles from '../../styles/components/AlbumItemStyles';

export default AlbumItem = ({ navigation, album, coverPhoto }) => {
  return (
    <Pressable key={album.id} style={styles.itemContainer} onPress={() => navigation.navigate('AlbumView', {
      albumName: album.title._content, albumId: album.id, photoCount: album.count_photos,
    })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: coverPhoto }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{album.title._content}</Text>
        <Text style={styles.description}>{album.count_photos} {album.count_photos <= 1 ? 'foto' : 'foto\'s'}</Text>
      </View>
    </Pressable>
  );
};