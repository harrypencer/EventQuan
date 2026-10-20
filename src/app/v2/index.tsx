import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { QuietTabBar } from '@/components/quiet-tab-bar';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

const AROUND = [
  { title: 'MSC Open House', meta: 'Now · 4 min walk', photo: photos.orgMeeting },
  { title: 'Corps March-In', meta: '4:15 PM · The Quad', photo: photos.band },
  { title: 'Career Fair', meta: 'Thu · Zachry', photo: photos.careerFair },
];

// One thing up next, one hero for tonight, a short list nearby. Nothing else.
export default function QuietHome() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <DeviceStatusBar tone="dark" />
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.date}>Tuesday, October 20</Text>
            <Text style={styles.greeting}>Good morning,{'\n'}Jordan</Text>
          </View>
          <View style={styles.actions}>
            <Pressable onPress={() => router.push('/v2/create')} style={styles.add}>
              <I.AddOutline size={20} color={quiet.ink} />
            </Pressable>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JL</Text>
            </View>
          </View>
        </View>

        <Pressable onPress={() => router.push('/node/zachry')} style={styles.next}>
          <View style={styles.nextTime}>
            <Text style={styles.nextIn}>12</Text>
            <Text style={styles.nextUnit}>min</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextLabel}>Up next</Text>
            <Text style={styles.nextTitle}>Engineering Design</Text>
            <Text style={styles.nextMeta}>Zachry 244 · 6 min walk</Text>
          </View>
          <I.AltArrowRightOutline size={20} color={quiet.ink3} />
        </Pressable>

        <Text style={styles.section}>Tonight</Text>
        <Pressable onPress={() => router.push('/v2/event')} style={styles.hero}>
          <Image source={photos.kyleFieldNight} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.78)']} locations={[0.35, 1]} style={StyleSheet.absoluteFill} />
          <View style={styles.heroBody}>
            <Text style={styles.heroMeta}>6:00 PM · Kyle Field</Text>
            <Text style={styles.heroTitle}>Texas A&M vs LSU</Text>
            <Text style={styles.heroFriends}>14 friends going</Text>
          </View>
        </Pressable>

        <View style={styles.sectionRow}>
          <Text style={[styles.section, { marginTop: 0, marginBottom: 0 }]}>Around you</Text>
          <Pressable onPress={() => router.push('/v2/discover' as Href)} hitSlop={8}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>
        <View style={styles.list}>
          {AROUND.map((a, i) => (
            <Pressable key={a.title} onPress={() => router.push('/v2/event')} style={[styles.row, i > 0 && styles.rowRule]}>
              <Image source={a.photo} style={styles.rowPhoto} contentFit="cover" />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{a.title}</Text>
                <Text style={styles.rowMeta}>{a.meta}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <QuietTabBar active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingHorizontal: 24, marginTop: 18 },
  date: { fontFamily: fonts.medium, fontSize: 14, color: quiet.ink3 },
  greeting: { fontFamily: fonts.bold, fontSize: 30, lineHeight: 34, color: quiet.ink, letterSpacing: -1.1, marginTop: 6 },
  actions: { flexDirection: 'row', gap: 8 },
  add: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#C9A27A', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.semibold, fontSize: 14, color: '#FFFFFF' },

  next: {
    marginHorizontal: 20,
    marginTop: 28,
    padding: 16,
    borderRadius: 24,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  nextTime: { width: 60, height: 60, borderRadius: 18, backgroundColor: quiet.accent, alignItems: 'center', justifyContent: 'center' },
  nextIn: { fontFamily: fonts.bold, fontSize: 22, color: '#FFFFFF', letterSpacing: -0.6, lineHeight: 24 },
  nextUnit: { fontFamily: fonts.medium, fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  nextLabel: { fontFamily: fonts.medium, fontSize: 12.5, color: quiet.ink3 },
  nextTitle: { fontFamily: fonts.semibold, fontSize: 17, color: quiet.ink, letterSpacing: -0.4, marginTop: 2 },
  nextMeta: { fontFamily: fonts.regular, fontSize: 13.5, color: quiet.ink2, marginTop: 2 },

  section: { fontFamily: fonts.semibold, fontSize: 19, color: quiet.ink, letterSpacing: -0.5, paddingHorizontal: 24, marginTop: 34, marginBottom: 14 },
  sectionRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingRight: 24, marginTop: 34, marginBottom: 6 },
  seeAll: { fontFamily: fonts.medium, fontSize: 14, color: quiet.ink2 },

  hero: { marginHorizontal: 20, height: 300, borderRadius: 28, overflow: 'hidden', justifyContent: 'flex-end' },
  heroBody: { padding: 22 },
  heroMeta: { fontFamily: fonts.medium, fontSize: 13.5, color: 'rgba(255,255,255,0.75)' },
  heroTitle: { fontFamily: fonts.bold, fontSize: 28, color: '#FFFFFF', letterSpacing: -1, marginTop: 4 },
  heroFriends: { fontFamily: fonts.medium, fontSize: 13.5, color: 'rgba(255,255,255,0.75)', marginTop: 8 },

  list: { paddingHorizontal: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12 },
  rowRule: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: quiet.hair },
  rowPhoto: { width: 52, height: 52, borderRadius: 14, backgroundColor: quiet.sunk },
  rowTitle: { fontFamily: fonts.semibold, fontSize: 15.5, color: quiet.ink, letterSpacing: -0.3 },
  rowMeta: { fontFamily: fonts.regular, fontSize: 13.5, color: quiet.ink2, marginTop: 2 },
});
