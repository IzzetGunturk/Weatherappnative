import { StyleSheet, TextInput, View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';

export default function App() {

  const API_KEY = '[API-KEY]';

  const [searchCity, setSearchCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(result.data);
    } catch (error) {
      console.log("Data can not be fetched.");
    }
  };

  return (
  <ImageBackground
    source={require('./assets/background.jpg')}
    resizeMode='cover'
    style={styles.image}
  >
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a city name"
          value={searchCity}
          onChangeText={(text) => setSearchCity(text)}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={fetchData}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {weatherData && (
      <View style={styles.weatherInfo}>
        <Text> City: {weatherData.name}</Text>
        <Text> Temperature: {weatherData.main.temp}°C</Text>
      </View>
      )}
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  searchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  weatherInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',  // Adjusted the width to center it horizontally
    alignItems: 'center',  // Center horizontally
    justifyContent: 'center'
  },
  errorText: {
    color: 'red',
  }
});
