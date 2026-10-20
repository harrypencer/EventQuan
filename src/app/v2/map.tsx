import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CampusMap } from '@/components/campus-map';
import type { MapPlace } from '@/components/campus-map-pin';
import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { QuietTabBar } from '@/components/quiet-tab-bar';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

// Same coordinates as the v1 map so both previews show the same campus.
const PLACES: MapPlace[] = [
  { id: 'kyle-field', label: 'Kyle Field', lat: 30.6101, lng: -96.3404, kind: 'stadium', href: '/v2/event' },
  { id: 'msc', label: 'MSC', lat: 30.6123, lng: -96.3415, kind: 'venue', href: '/v2/event' },
  { id: 'zachry', label: 'Zachry', lat: 30.6212, lng: -96.3407, kind: 'venue' },
  { id: 'sbisa', label: 'Sbisa', lat: 30.6171, lng: -96.3437, kind: 'dining' },
];

const YOU = { lat: 30.6159, lng: -96.3397 }; // Evans Library

export default function QuietMap() {
  return (
    <View style={styles.screen}>
      <CampusMap places={PLACES} you={YOU} onSelect={(p) => p.href && router.push(p.href)} />

      <View style={styles.top}>
        <DeviceStatusBar tone="dark" />
        <View style={styles.search}>
          <I.MagnifierOutline size={19} color={quiet.ink2} />
          <Text style={styles.searchText}>Search campus</Text>
        </View>
      </View>

      <View style={styles.locate}>
        <I.GpsOutline size={20} color={quiet.ink} />
      </View>

      <Pressable onPress={() => router.push('/v2/event')} style={styles.card}>
        <Image source={photos.orgMeeting} style={styles.cardPhoto} contentFit="cover" />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardKicker}>Happening now · 4 min walk</Text>
          <Text style={styles.cardTitle}>MSC Open House</Text>
          <Text style={styles.cardMeta} numberOfLines={1}>
            1.9K here · Memorial Student Center
          </Text>
        </View>
        <View style={styles.go}>
          <I.RoutingBold size={18} color="#FFFFFF" />
        </View>
      </Pressable>

      <QuietTabBar active="map" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  top: { position: 'absolute', top: 0, left: 0, right: 0 },
  search: {
    marginHorizontal: 20,
    marginTop: 6,
    height: 52,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  searchText: { flex: 1, fontFamily: fonts.medium, fontSize: 15.5, color: quiet.ink3 },
  locate: {
    position: 'absolute',
    right: 20,
    bottom: 236,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 112,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 12,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
  },
  cardPhoto: { width: 64, height: 64, borderRadius: 18, backgroundColor: quiet.sunk },
  cardKicker: { fontFamily: fonts.medium, fontSize: 12.5, color: quiet.accent },
  cardTitle: { fontFamily: fonts.semibold, fontSize: 16.5, color: quiet.ink, letterSpacing: -0.4, marginTop: 2 },
  cardMeta: { fontFamily: fonts.regular, fontSize: 13, color: quiet.ink2, marginTop: 2 },
  go: { width: 44, height: 44, borderRadius: 22, backgroundColor: quiet.ink, alignItems: 'center', justifyContent: 'center' },
});
