import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CampusMap } from '@/components/campus-map';
import type { MapPlace } from '@/components/campus-map-pin';
import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { Chip, PillButton, Thumb } from '@/components/ui';
import { photos } from '@/data/photos';
import { colors, fonts } from '@/theme';

const FILTERS = ['All', 'Events', 'Dining', 'Transit', 'Safety'];

// Real Texas A&M coordinates so iOS (Apple Maps) and web line up.
const PLACES: MapPlace[] = [
  { id: 'kyle-field', label: 'Kyle Field', lat: 30.6101, lng: -96.3404, kind: 'stadium', href: '/node/kyle-field' },
  { id: 'msc', label: 'MSC', lat: 30.6123, lng: -96.3415, kind: 'venue', href: '/node/msc' },
  { id: 'zachry', label: 'Zachry', lat: 30.6212, lng: -96.3407, kind: 'venue', href: '/node/zachry' },
  { id: 'sbisa', label: 'Sbisa', lat: 30.6171, lng: -96.3437, kind: 'dining' },
  { id: 'reed', label: 'Reed Arena', lat: 30.6063, lng: -96.3462, kind: 'venue', href: '/node/reed-arena' },
  { id: 'bus', label: 'Bus 12', lat: 30.6148, lng: -96.3372, kind: 'transit' },
];

const YOU = { lat: 30.6159, lng: -96.3397 }; // Evans Library

export default function MapScreen() {
  const [filter, setFilter] = useState('All');

  return (
    <View style={styles.screen}>
      <CampusMap places={PLACES} you={YOU} onSelect={(p) => p.href && router.push(p.href)} />

      <View style={styles.top}>
        <DeviceStatusBar tone="dark" />
        <View style={styles.search}>
          <I.MagnifierOutline size={19} color={colors.ink3} />
          <Text style={styles.searchText}>Search Texas A&M…</Text>
          <View style={styles.searchDivider} />
          <I.GpsOutline size={19} color={colors.maroon} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((f) => (
            <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.sheetHead}>
          <View>
            <Text style={styles.sheetTitle}>Live within 10 min</Text>
            <Text style={styles.sheetSub}>You’re at Evans Library · 72° and sunny</Text>
          </View>
          <PillButton label="List" size="sm" tone="ghost" icon={<I.SortVerticalOutline size={15} color={colors.maroon} />} />
        </View>
        <Pressable style={styles.row} onPress={() => router.push('/node/msc')}>
          <Thumb source={photos.orgMeeting} size={52} radius={14} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>MSC Open House</Text>
            <Text style={styles.rowSub}>Memorial Student Center · 4 min walk</Text>
          </View>
          <Text style={styles.rowMeta}>1.9K</Text>
        </Pressable>
        <View style={styles.row}>
          <View style={styles.busIcon}>
            <I.BusBold size={22} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>Bus 12 · Reveille</Text>
            <Text style={styles.rowSub}>Arrives at Evans in 4 min</Text>
          </View>
          <Text style={[styles.rowMeta, { color: colors.ok }]}>On time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EEE9E2' },
  top: { position: 'absolute', top: 0, left: 0, right: 0 },
  search: {
    marginHorizontal: 16,
    marginTop: 4,
    height: 50,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  searchText: { flex: 1, fontFamily: fonts.medium, fontSize: 15, color: colors.ink3 },
  searchDivider: { width: 1, height: 22, backgroundColor: colors.line },
  chips: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },

  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  handle: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: '#D6CFCA', marginBottom: 6 },
  sheetHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 4 },
  sheetTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.ink, letterSpacing: -0.4 },
  sheetSub: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink3, marginTop: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  rowTitle: { fontFamily: fonts.bold, fontSize: 14.5, color: colors.ink, letterSpacing: -0.2 },
  rowSub: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink2, marginTop: 1 },
  rowMeta: { fontFamily: fonts.bold, fontSize: 13, color: colors.maroon },
  busIcon: { width: 52, height: 52, borderRadius: 14, backgroundColor: colors.eqBlue, alignItems: 'center', justifyContent: 'center' },
});
