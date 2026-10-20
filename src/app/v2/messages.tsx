import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { QuietTabBar } from '@/components/quiet-tab-bar';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

type Thread = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: boolean;
  photo?: (typeof photos)[keyof typeof photos];
  initials?: string;
  tint?: string;
};

const THREADS: Thread[] = [
  { id: 'crew', name: 'Gameday Crew', preview: 'Maya: tailgate at Lot 61 by 3, I’ve got the brisket', time: '9:41', unread: true, photo: photos.tailgate },
  { id: 'maya', name: 'Maya Torres', preview: 'Sbisa at 12:15? I’ll grab a table by the windows', time: '8:30', unread: true, initials: 'MT', tint: '#C9A27A' },
  { id: 'engr', name: 'ENGR 102 · Section 504', preview: 'Dr. Rivera: Lab 6 rubric is posted', time: '9:12', initials: '102', tint: quiet.accent },
  { id: 'bowling', name: 'Aggie Bowling Club', preview: 'You posted Bowling league kickoff', time: '8:55', photo: photos.bowling },
  { id: 'msc', name: 'MSC Open House', preview: 'Flag Room is packed. Head to Bethancourt', time: 'Mon', photo: photos.orgMeeting },
  { id: 'kyle', name: 'Kyle Nguyen', preview: 'See you at Midnight Yell', time: 'Mon', initials: 'KN', tint: '#8C5A3C' },
];

export default function QuietMessages() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <DeviceStatusBar tone="dark" />
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          <View style={styles.compose}>
            <I.PenNewSquareOutline size={20} color={quiet.ink} />
          </View>
        </View>
        <View style={styles.search}>
          <I.MagnifierOutline size={18} color={quiet.ink3} />
          <Text style={styles.searchText}>Search</Text>
        </View>

        <View style={styles.list}>
          {THREADS.map((t) => (
            <Pressable key={t.id} onPress={() => router.push('/v2/chat')} style={styles.thread}>
              {t.photo ? (
                <Image source={t.photo} style={styles.avatar} contentFit="cover" />
              ) : (
                <View style={[styles.avatar, { backgroundColor: t.tint, alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={styles.initials}>{t.initials}</Text>
                </View>
              )}
              <View style={styles.threadBody}>
                <View style={styles.threadTop}>
                  <Text style={[styles.name, t.unread && { fontFamily: fonts.bold }]} numberOfLines={1}>
                    {t.name}
                  </Text>
                  <Text style={styles.time}>{t.time}</Text>
                </View>
                <View style={styles.threadTop}>
                  <Text style={[styles.preview, t.unread && { color: quiet.ink }]} numberOfLines={1}>
                    {t.preview}
                  </Text>
                  {t.unread && <View style={styles.dot} />}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <QuietTabBar active="inbox" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 18 },
  title: { fontFamily: fonts.bold, fontSize: 34, color: quiet.ink, letterSpacing: -1.3 },
  compose: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    marginHorizontal: 20,
    marginTop: 18,
    height: 46,
    borderRadius: 999,
    backgroundColor: quiet.sunk,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  searchText: { fontFamily: fonts.regular, fontSize: 15, color: quiet.ink3 },
  list: { marginTop: 14 },
  thread: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingLeft: 24 },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: quiet.sunk },
  initials: { fontFamily: fonts.semibold, fontSize: 16, color: '#FFFFFF', letterSpacing: -0.3 },
  threadBody: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 24,
    gap: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: quiet.hair,
  },
  threadTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  name: { flex: 1, fontFamily: fonts.semibold, fontSize: 16, color: quiet.ink, letterSpacing: -0.3 },
  time: { fontFamily: fonts.regular, fontSize: 13, color: quiet.ink3 },
  preview: { flex: 1, fontFamily: fonts.regular, fontSize: 14.5, color: quiet.ink2 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: quiet.accent },
});
