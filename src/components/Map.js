import {
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Map = ({ geometery,_toggleSearch }) => {
  
  const [region, setRegion] = useState({
    latitude: 3.9154373729341923,
    longitude: 102.07059907908699,
    latitudeDelta: 1,
    longitudeDelta: 5,
  });

  useEffect(() => {
    if (geometery.length > 0) { 
      setRegion({
        latitude: geometery[0]?.latitude,
        longitude: geometery[0]?.longitude,
        latitudeDelta: 1,
        longitudeDelta: 5,
      })
    }
  }, [geometery]);

  return (
    <MapView
      style={{height: windowHeight, width: windowWidth}}
      provider={PROVIDER_GOOGLE}
      loadingEnabled={true}
      region={region}
      onRegionChangeComplete={setRegion}
      onPress={e => {
        console.log(e.nativeEvent);
        _toggleSearch(true)
      }}
      onMarkerPress={e => {
        console.log('Clicked on Marker!');
        console.log(e.nativeEvent);
      }}>
      {geometery?.length > 0
        ? geometery?.map((location, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={location.address}
              />
            );
          })
        : null}
    </MapView>
  );
};

export default Map;
