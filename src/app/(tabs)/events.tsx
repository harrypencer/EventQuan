import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import { EventCard } from '@/components/event-card';
import * as I from '@/components/icons';
import { Chip, SectionHeader } from '@/components/ui';
import { todayEvents, weekEvents, type EventCategory } from '@/data/campus';
import { colors, fonts } from '@/theme';

const FILTERS: ('All' | EventCategory)[] = ['All', 'Athletics', 'Student Life', 'Academic', 'Traditions'];

export default function EventsScreen() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const match = (category: EventCategory) => filter === 'All' || filter === category;
  const today = todayEvents.filter((e) => match(e.category));
  const week = weekEvents.filter((e) => match(e.category));

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <DeviceStatusBar tone="light" />
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.eyebrow}>EVENTFINDER</Text>
            <Text style={styles.title}>Texas A&M Events</Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.roundBtn}>
              <I.MagnifierOutline size={20} color="#FFFFFF" />
            </View>
            <View style={styles.roundBtn}>
              <I.Tuning2Outline size={20} color="#FFFFFF" />
            </View>
          </View>
        </View>
        <View style={styles.forYou}>
          <I.StarsMinimalisticBold size={16} color={colors.gold} />
          <Text style={styles.forYouText}>
            <Text style={{ fontFamily: fonts.bold, color: '#FFFFFF' }}>For you:</Text> Class of ’27 · Engineering · Corps-friendly
          </Text>
        </View>
      </View>

      <View style={styles.chipsWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((f) => (
            <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} count={f === 'All' ? 23 : undefined} />
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        {today.length > 0 && (
          <>
            <View style={{ height: 18 }} />
            <SectionHeader title="Today" action="See all" />
            <View style={styles.list}>
              {today.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </View>
          </>
        )}

        <Pressable style={styles.mapStrip} onPress={() => router.push('/map')}>
          <View style={styles.mapStripIcon}>
            <I.MapPointBold size={20} color={colors.maroon} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.mapStripTitle}>6 events within a 10 min walk</Text>
            <Text style={styles.mapStripSub}>Kyle Field, MSC and Zachry are busiest right now</Text>
          </View>
          <I.AltArrowRightOutline size={18} color={colors.ink3} />
        </Pressable>

        {week.length > 0 && (
          <>
            <SectionHeader title="This Week" action="See all" />
            <View style={styles.list}>
              {week.map((e) => (
                <EventCard key={e.id} event={e} showDate />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.maroon, paddingBottom: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 8 },
  eyebrow: { fontFamily: fonts.bold, fontSize: 11, color: colors.gold, letterSpacing: 1.4 },
  title: { fontFamily: fonts.heavy, fontSize: 26, color: '#FFFFFF', letterSpacing: -0.8, marginTop: 2 },
  headerActions: { flexDirection: 'row', gap: 8 },
  roundBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forYou: {
    marginHorizontal: 20,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 32,
  },
  forYouText: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.78)' },
  chipsWrap: { backgroundColor: colors.bg, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  chips: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  list: { paddingHorizontal: 16, gap: 10 },
  mapStrip: {
    marginHorizontal: 16,
    marginVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: colors.maroonSoft,
    borderWidth: 1,
    borderColor: colors.maroonLine,
  },
  mapStripIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  mapStripTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink, letterSpacing: -0.2 },
  mapStripSub: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink2, marginTop: 2 },
});
