import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { AggieMark, Chip, Thumb } from '@/components/ui';
import { photos } from '@/data/photos';
import { colors, fonts } from '@/theme';

const SEGMENTS = ['All', 'Groups', 'Orgs', 'Events'];

type Thread = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  kind: 'photo' | 'initials' | 'aggie';
  photo?: (typeof photos)[keyof typeof photos];
  initials?: string;
  tint?: string;
  tag?: string;
};

const THREADS: Thread[] = [
  {
    id: 'crew',
    name: 'Gameday Crew',
    preview: 'Maya: tailgate at Lot 61 by 3, I’ve got the brisket',
    time: '9:41',
    unread: 4,
    kind: 'photo',
    photo: photos.tailgate,
    tag: 'A&M vs LSU',
  },
  {
    id: 'engr',
    name: 'ENGR 102 · Section 504',
    preview: 'Dr. Rivera: Lab 6 rubric is posted on Canvas',
    time: '9:12',
    unread: 1,
    kind: 'initials',
    initials: '102',
    tint: colors.maroon,
  },
  {
    id: 'bowling',
    name: 'Aggie Bowling Club',
    preview: 'You posted a Quick Event · 3 going',
    time: '8:55',
    kind: 'photo',
    photo: photos.bowling,
    tag: 'Quick Event',
  },
  {
    id: 'maya',
    name: 'Maya Torres',
    preview: 'Sbisa at 12:15? I’ll grab a table by the windows',
    time: '8:30',
    unread: 1,
    kind: 'initials',
    initials: 'MT',
    tint: '#C9A27A',
  },
  {
    id: 'msc',
    name: 'MSC Open House',
    preview: 'Flag Room is packed. Head to Bethancourt for orgs A–M',
    time: 'Mon',
    kind: 'photo',
    photo: photos.orgMeeting,
    tag: 'Event chat',
  },
  { id: 'sac', name: '12th Man Student Aggie Club', preview: 'Midnight Yell carpool sign-up closes Thursday', time: 'Mon', kind: 'aggie' },
];

export default function MessagesScreen() {
  const [seg, setSeg] = useState('All');

  return (
    <View style={styles.screen}>
      <DeviceStatusBar tone="dark" />
      <View style={styles.titleRow}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.compose}>
          <I.PenNewSquareBold size={20} color={colors.maroonInk} />
        </View>
      </View>
      <View style={styles.search}>
        <I.MagnifierOutline size={18} color={colors.ink3} />
        <Text style={styles.searchText}>Search people, groups, events</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {SEGMENTS.map((s) => (
          <Chip key={s} label={s} active={seg === s} onPress={() => setSeg(s)} count={s === 'All' ? 6 : undefined} />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.alert}>
          <View style={styles.alertIcon}>
            <I.SirenBold size={20} color={colors.maroonInk} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Aggie Alert · Gameday traffic</Text>
            <Text style={styles.alertText}>Wellborn Rd closes at 3:30 PM. Use the Bryan shuttle from Lot 100.</Text>
          </View>
        </View>

        <View style={styles.list}>
          {THREADS.map((t, i) => (
            <View key={t.id} style={[styles.thread, i > 0 && styles.threadDivider]}>
              {t.kind === 'photo' && t.photo ? (
                <Thumb source={t.photo} size={52} radius={26} />
              ) : t.kind === 'aggie' ? (
                <AggieMark size={52} />
              ) : (
                <View style={[styles.initials, { backgroundColor: t.tint }]}>
                  <Text style={styles.initialsText}>{t.initials}</Text>
                </View>
              )}
              <View style={{ flex: 1, gap: 2 }}>
                <View style={styles.threadTop}>
                  <Text style={styles.threadName} numberOfLines={1}>
                    {t.name}
                  </Text>
                  <Text style={[styles.threadTime, t.unread ? { color: colors.maroon } : null]}>{t.time}</Text>
                </View>
                {t.tag && <Text style={styles.threadTag}>{t.tag}</Text>}
                <View style={styles.threadTop}>
                  <Text style={[styles.threadPreview, t.unread ? { color: colors.ink } : null]} numberOfLines={1}>
                    {t.preview}
                  </Text>
                  {t.unread ? (
                    <View style={styles.unread}>
                      <Text style={styles.unreadText}>{t.unread}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 6 },
  title: { fontFamily: fonts.heavy, fontSize: 30, color: colors.ink, letterSpacing: -1 },
  compose: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  search: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  searchText: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.ink3 },
  chips: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  alert: {
    marginHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: colors.goldSoft,
    borderWidth: 1,
    borderColor: '#F5DD8A',
    alignItems: 'center',
  },
  alertIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  alertTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink, letterSpacing: -0.2 },
  alertText: { fontFamily: fonts.medium, fontSize: 12.5, lineHeight: 17, color: colors.ink2, marginTop: 2 },
  list: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 14,
  },
  thread: { flexDirection: 'row', gap: 12, paddingVertical: 13, alignItems: 'center' },
  threadDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  threadTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  threadName: { flex: 1, fontFamily: fonts.bold, fontSize: 15, color: colors.ink, letterSpacing: -0.3 },
  threadTime: { fontFamily: fonts.semibold, fontSize: 12, color: colors.ink3 },
  threadTag: { fontFamily: fonts.bold, fontSize: 10.5, color: colors.maroon, letterSpacing: 0.4 },
  threadPreview: { flex: 1, fontFamily: fonts.medium, fontSize: 13, color: colors.ink3 },
  unread: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.maroon,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: { fontFamily: fonts.bold, fontSize: 11, color: '#FFFFFF' },
  initials: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  initialsText: { fontFamily: fonts.bold, fontSize: 15, color: '#FFFFFF' },
});
