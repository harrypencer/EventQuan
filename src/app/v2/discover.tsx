import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { QuietTabBar } from '@/components/quiet-tab-bar';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

const FILTERS = ['Today', 'This week', 'Free', 'Sports'];

const EVENTS = [
  { title: 'Texas A&M vs LSU', meta: 'Tonight, 6:00 PM · Kyle Field', going: '125K going', photo: photos.stadiumCrowd },
  { title: 'Midnight Yell Practice', meta: 'Tonight, 11:59 PM · Kyle Field', going: '8.4K going', photo: photos.yell },
  { title: 'Aggie Bowling League', meta: 'Sat, 7:00 PM · Grand Station', going: '24 going', photo: photos.bowling },
];

export default function QuietDiscover() {
  const [filter, setFilter] = useState('Today');
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <DeviceStatusBar tone="dark" />
        <View style={styles.header}>
          <Text style={styles.title}>Discover</Text>
          <View style={styles.searchBtn}>
            <I.MagnifierOutline size={20} color={quiet.ink} />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filter, on && styles.filterOn]}>
                <Text style={[styles.filterText, on && styles.filterTextOn]}>{f}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, gap: 28 }}>
          {EVENTS.map((e) => (
            <Pressable key={e.title} onPress={() => router.push('/v2/event')}>
              <View style={styles.photo}>
                <Image source={e.photo} style={StyleSheet.absoluteFill} contentFit="cover" />
                <View style={styles.save}>
                  <I.BookmarkOutline size={18} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.cardTitle}>{e.title}</Text>
              <Text style={styles.cardMeta}>{e.meta}</Text>
              <Text style={styles.cardGoing}>{e.going}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <QuietTabBar active="discover" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 18 },
  title: { fontFamily: fonts.bold, fontSize: 34, color: quiet.ink, letterSpacing: -1.3 },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: { paddingHorizontal: 20, gap: 8, marginTop: 20, marginBottom: 26 },
  filter: { height: 38, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, borderColor: quiet.hair, justifyContent: 'center' },
  filterOn: { backgroundColor: quiet.ink, borderColor: quiet.ink },
  filterText: { fontFamily: fonts.medium, fontSize: 14, color: quiet.ink2 },
  filterTextOn: { color: '#FFFFFF' },
  photo: { height: 220, borderRadius: 24, overflow: 'hidden', backgroundColor: quiet.sunk },
  save: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontFamily: fonts.semibold, fontSize: 18, color: quiet.ink, letterSpacing: -0.5, marginTop: 14 },
  cardMeta: { fontFamily: fonts.regular, fontSize: 14, color: quiet.ink2, marginTop: 3 },
  cardGoing: { fontFamily: fonts.medium, fontSize: 13.5, color: quiet.accent, marginTop: 6 },
});
