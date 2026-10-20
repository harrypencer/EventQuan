import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CAMPUS_CENTER, MapPin, YouDot, type CampusMapProps } from '@/components/campus-map-pin';
import { fonts } from '@/theme';

// Web has no MapKit without an Apple MapKit JS token, so the canvas preview uses
// real OpenStreetMap tiles (Stadia OSM Bright, keyless on localhost) at the same
// region iOS shows in Apple Maps.
const ZOOM = 15;
const SCALE = 0.8;
const TILE = 256;
const VIEW_OFFSET_Y = -110; // lift the campus above the bottom sheet

function project(lat: number, lng: number) {
  const n = TILE * 2 ** ZOOM;
  const s = Math.sin((lat * Math.PI) / 180);
  return { x: ((lng + 180) / 360) * n, y: (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n };
}

export function CampusMap({ places, you, onSelect }: CampusMapProps) {
  const [size, setSize] = useState({ w: 390, h: 844 });
  const center = project(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng);
  const toScreen = (lat: number, lng: number) => {
    const p = project(lat, lng);
    return { left: (p.x - center.x) * SCALE + size.w / 2, top: (p.y - center.y) * SCALE + size.h / 2 + VIEW_OFFSET_Y };
  };

  const tilePx = TILE * SCALE;
  const originX = center.x - size.w / 2 / SCALE;
  const originY = center.y - (size.h / 2 + VIEW_OFFSET_Y) / SCALE;
  const x0 = Math.floor(originX / TILE);
  const y0 = Math.floor(originY / TILE);
  const cols = Math.ceil(size.w / tilePx) + 1;
  const rows = Math.ceil(size.h / tilePx) + 1;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tx = x0 + c;
      const ty = y0 + r;
      tiles.push({
        key: `${tx}-${ty}`,
        uri: `https://tiles.stadiamaps.com/tiles/osm_bright/${ZOOM}/${tx}/${ty}@2x.png`,
        left: (tx * TILE - originX) * SCALE,
        top: (ty * TILE - originY) * SCALE,
      });
    }
  }

  const youPos = toScreen(you.lat, you.lng);

  return (
    <View style={styles.map} onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}>
      {tiles.map((t) => (
        <Image
          key={t.key}
          source={{ uri: t.uri }}
          style={{ position: 'absolute', left: t.left, top: t.top, width: tilePx + 0.5, height: tilePx + 0.5 }}
        />
      ))}
      <View style={[styles.marker, { left: youPos.left - 20, top: youPos.top - 20 }]}>
        <YouDot />
      </View>
      {places.map((p) => {
        const pos = toScreen(p.lat, p.lng);
        const stadium = p.kind === 'stadium';
        return (
          <View
            key={p.id}
            style={[
              styles.marker,
              stadium ? { left: pos.left - 110, top: pos.top - 22, width: 220 } : { left: pos.left - 40, top: pos.top - 16, width: 80 },
            ]}>
            <MapPin place={p} onPress={() => onSelect(p)} />
          </View>
        );
      })}
      <Text style={styles.attribution}>© Stadia Maps © OpenMapTiles © OpenStreetMap</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#F2EFE9', overflow: 'hidden' },
  marker: { position: 'absolute', alignItems: 'center' },
  attribution: { position: 'absolute', left: 10, bottom: 334, fontFamily: fonts.medium, fontSize: 9, color: 'rgba(0,0,0,0.45)' },
});
