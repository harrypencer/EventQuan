import type { Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as I from '@/components/icons';
import { LiveDot, Thumb } from '@/components/ui';
import { photos } from '@/data/photos';
import { colors, fonts } from '@/theme';

export type MapPlace = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  kind: 'venue' | 'dining' | 'transit' | 'stadium';
  href?: Href;
};

export type CampusMapProps = {
  places: MapPlace[];
  you: { lat: number; lng: number };
  onSelect: (place: MapPlace) => void;
};

// Center of the College Station campus view (between MSC and Kyle Field).
export const CAMPUS_CENTER = { lat: 30.6128, lng: -96.3418 };

// Shared marker art so Apple Maps (iOS) and the web tile map look identical.
export function MapPin({ place, onPress }: { place: MapPlace; onPress?: () => void }) {
  if (place.kind === 'stadium') {
    return (
      <Pressable onPress={onPress} style={styles.callout}>
        <View style={styles.calloutCard}>
          <Thumb source={photos.football} size={40} radius={11} />
          <View>
            <Text style={styles.calloutTitle}>{place.label}</Text>
            <Text style={styles.calloutSub}>Football · Today 6:00 PM</Text>
          </View>
          <View style={styles.calloutLive}>
            <LiveDot size={6} />
            <Text style={styles.calloutLiveText}>11.8K</Text>
          </View>
        </View>
        <View style={styles.calloutStem} />
        <View style={styles.calloutPin}>
          <Text style={styles.calloutPinText}>A&M</Text>
        </View>
      </Pressable>
    );
  }

  const tint = place.kind === 'dining' ? colors.ok : place.kind === 'transit' ? colors.eqBlue : colors.maroon;
  const Icon = place.kind === 'dining' ? I.ChefHatBold : place.kind === 'transit' ? I.BusBold : I.MapPointBold;
  return (
    <Pressable onPress={onPress} style={styles.pin}>
      <View style={[styles.pinDot, { backgroundColor: tint }]}>
        <Icon size={15} color="#FFFFFF" />
      </View>
      <Text style={styles.pinLabel}>{place.label}</Text>
    </Pressable>
  );
}

export function YouDot() {
  return (
    <View style={styles.youHalo}>
      <View style={styles.youDot} />
    </View>
  );
}

const styles = StyleSheet.create({
  pin: { alignItems: 'center' },
  pinDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  pinLabel: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.ink,
    marginTop: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },

  callout: { alignItems: 'center' },
  calloutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 7,
    paddingRight: 11,
    borderWidth: 1,
    borderColor: colors.line,
  },
  calloutTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink },
  calloutSub: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.ink2 },
  calloutLive: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDECEC', borderRadius: 999, paddingRight: 8, height: 22 },
  calloutLiveText: { fontFamily: fonts.bold, fontSize: 11, color: colors.live },
  calloutStem: { width: 2, height: 10, backgroundColor: colors.maroon },
  calloutPin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.maroon,
    borderWidth: 4,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutPinText: { fontFamily: fonts.displayHeavy, fontSize: 14, color: '#FFFFFF' },

  youHalo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(47,128,237,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.eqBlue, borderWidth: 3, borderColor: '#FFFFFF' },
});
