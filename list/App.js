import React, { useState } from 'react';  
import { Text, View, StyleSheet, Button, FlatList, TextInput, Image, TouchableOpacity } from 'react-native'; 
import axios from 'axios'; 
import { Video } from 'expo-av';

const API_KEY = '0707f8530820689aeedf063175bcb2f6';

export default function App() { 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [movies, setMovies] = useState([]);
  const [watchingMovie, setWatchingMovie] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const fetchMovies = async () => { 
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`); 
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchNow = (url) => {
    setVideoUrl(url);
    setWatchingMovie(true);
  };

  const renderMovieList = () => (
    <View style={styles.container}> 
      <Text style={styles.title}>MovieMania</Text> 
      <TextInput  
        style={styles.input} 
        value={searchTerm} 
        onChangeText={setSearchTerm} 
        placeholder='Enter the title'
      /> 
      <Button title='Search' onPress={fetchMovies} color='orange' /> 
      <FlatList  
        data={movies} 
        keyExtractor={item => item.id.toString()} 
        renderItem={({ item }) => ( 
          <View style={styles.taskContainer}> 
            <Text style={styles.textContainer}>{item.title}</Text> 
            <Text style={styles.txtContainer}>{item.overview}</Text> 
            <Text style={styles.dtsContainer}>{item.release_date}</Text> 
            <Image   
              style={styles.imageContainer}
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            />             
            <TouchableOpacity 
              style={styles.watchButton} 
              onPress={() => handleWatchNow('https://path-to-your-video')}
            >
              <Text style={styles.watchButtonText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  const renderVideoPlayer = () => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
      <Button title="Close" onPress={() => setWatchingMovie(false)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {watchingMovie ? renderVideoPlayer() : renderMovieList()}
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20, 
    marginTop: 40, 
    marginBottom: 50 
  }, 
  title: {  
    fontSize: 24,  
    color: 'purple',
    letterSpacing: 1.2,
    marginBottom: 20,
    fontStyle: 'italic', 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }, 
  input: { 
    height: 40, 
    paddingLeft: 10, 
    marginBottom: 20, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 12
  }, 
  taskContainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column', 
    padding: 15, 
    marginBottom: 10, 
    backgroundColor: '#f9f9f9', 
    borderBottomColor: '#eee', 
    borderBottomWidth: 1, 
    borderRadius: 8, 
    marginTop: 20
  }, 
  txtContainer: { 
    fontSize: 14, 
    color: 'gray', 
    fontStyle: 'italic',
    marginBottom: 5, 
    marginTop: 10
  },  
  textContainer: { 
    fontSize: 14,  
    fontStyle: 'italic', 
    fontWeight: 'bold',
    color: 'red', 
    marginBottom: 5,
  },
  imageContainer: { 
    height: 150, 
    width: 100, 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 20, 
    marginBottom: 30,
  }, 
  dtsContainer: { 
    fontSize: 14, 
    color: 'purple', 
    marginBottom: 12, 
    fontWeight: 'bold', 
    fontStyle: 'italic'
  }, 
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  watchButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  watchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
