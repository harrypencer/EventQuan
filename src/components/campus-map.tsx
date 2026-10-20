import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { CAMPUS_CENTER, MapPin, YouDot, type CampusMapProps } from '@/components/campus-map-pin';

// iOS: react-native-maps' default provider is Apple Maps (MapKit).
export function CampusMap({ places, you, onSelect }: CampusMapProps) {
  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{ latitude: CAMPUS_CENTER.lat - 0.0025, longitude: CAMPUS_CENTER.lng, latitudeDelta: 0.022, longitudeDelta: 0.012 }}
      showsCompass={false}
      showsPointsOfInterests>
      <Marker coordinate={{ latitude: you.lat, longitude: you.lng }} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
        <YouDot />
      </Marker>
      {places.map((p) => (
        <Marker
          key={p.id}
          coordinate={{ latitude: p.lat, longitude: p.lng }}
          anchor={{ x: 0.5, y: p.kind === 'stadium' ? 1 : 0.35 }}
          onPress={() => onSelect(p)}>
          <MapPin place={p} />
        </Marker>
      ))}
    </MapView>
  );
}
