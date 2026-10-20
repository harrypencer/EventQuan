import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import type { ComponentType } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { AggieMark, NodeTag, SectionHeader } from '@/components/ui';
import { colors, fonts } from '@/theme';

type IconType = ComponentType<{ size?: number; color?: string }>;

const PLAN = [
  { time: '10:00 AM', title: 'ENGR 102 · Zachry 244', done: false, now: true },
  { time: '12:15 PM', title: 'Lunch · Sbisa Dining Hall', done: false },
  { time: '3:00 PM', title: 'Aggie Bowling Club meetup', done: false },
  { time: '6:00 PM', title: 'Texas A&M vs LSU · Kyle Field', done: false, big: true },
];

const SETTINGS: { label: string; icon: IconType; value?: string }[] = [
  { label: 'Friend Check & Safe Walk', icon: I.ShieldCheckBold, value: 'On' },
  { label: 'Notifications', icon: I.BellBold, value: 'Smart' },
  { label: 'Payment methods', icon: I.CardBold, value: 'Aggie Bucks' },
  { label: 'Settings', icon: I.SettingsBold },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
      <DeviceStatusBar tone="dark" />
      <View style={styles.titleRow}>
        <Text style={styles.title}>Profile</Text>
        <Pressable style={styles.iconBtn} onPress={() => router.push('/welcome')}>
          <I.SettingsOutline size={21} color={colors.ink} />
        </Pressable>
      </View>

      <LinearGradient colors={[colors.maroon, colors.maroonDeep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.idCard}>
        <View style={styles.idTop}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AggieMark size={30} inverted />
            <Text style={styles.idBrand}>AGGIE ID</Text>
          </View>
          <Text style={styles.idValid}>Valid · Fall 2026</Text>
        </View>
        <View style={styles.idMain}>
          <View style={styles.idPhoto}>
            <Text style={styles.idPhotoText}>JL</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.idName}>Jordan Lee</Text>
            <Text style={styles.idMeta}>Class of 2027 · Mechanical Engineering</Text>
            <Text style={styles.idUin}>UIN 627 004 871</Text>
          </View>
          <View style={styles.idQr}>
            <I.QrCodeBold size={40} color={colors.ink} />
          </View>
        </View>
        <View style={styles.idStrip}>
          <Text style={styles.idStripText}>Tap to enter Kyle Field · Rec Center · Evans</Text>
        </View>
      </LinearGradient>

      <View style={styles.stats}>
        {[
          ['14', 'Events this fall'],
          ['3', 'Orgs'],
          ['128', 'Aggie friends'],
        ].map(([v, l]) => (
          <View key={l} style={styles.stat}>
            <Text style={styles.statValue}>{v}</Text>
            <Text style={styles.statLabel}>{l}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="My Plan · Today" action="Edit" />
      <View style={styles.card}>
        {PLAN.map((p, i) => (
          <View key={p.time} style={[styles.planRow, i > 0 && styles.divider]}>
            <Text style={[styles.planTime, p.now && { color: colors.maroon }]}>{p.time}</Text>
            <View style={[styles.planDot, p.now && styles.planDotNow, p.big && styles.planDotBig]} />
            <Text style={[styles.planTitle, p.big && { fontFamily: fonts.bold }]} numberOfLines={1}>
              {p.title}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ height: 24 }} />
      <SectionHeader title="Your nodes" />
      <View style={[styles.card, { padding: 14, gap: 10 }]}>
        <View style={styles.nodeRow}>
          <NodeTag node="tamu" label="Texas A&M University" />
          <Text style={styles.nodeRole}>Home · Student</Text>
        </View>
        <View style={styles.nodeRow}>
          <NodeTag node="cstat" />
          <Text style={styles.nodeRole}>Following</Text>
        </View>
        <View style={styles.nodeRow}>
          <NodeTag node="bryan" />
          <Text style={styles.nodeRole}>Following</Text>
        </View>
      </View>

      <View style={{ height: 24 }} />
      <View style={styles.card}>
        {SETTINGS.map((s, i) => (
          <View key={s.label} style={[styles.setRow, i > 0 && styles.divider]}>
            <View style={styles.setIcon}>
              <s.icon size={18} color={colors.maroon} />
            </View>
            <Text style={styles.setLabel}>{s.label}</Text>
            {s.value && <Text style={styles.setValue}>{s.value}</Text>}
            <I.AltArrowRightOutline size={16} color={colors.ink3} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 6 },
  title: { fontFamily: fonts.heavy, fontSize: 30, color: colors.ink, letterSpacing: -1 },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },

  idCard: { marginHorizontal: 16, marginTop: 16, borderRadius: 26, padding: 16, overflow: 'hidden' },
  idTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  idBrand: { fontFamily: fonts.displayHeavy, fontSize: 17, color: '#FFFFFF', letterSpacing: 2 },
  idValid: { fontFamily: fonts.semibold, fontSize: 11.5, color: colors.gold },
  idMain: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 18 },
  idPhoto: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#C9A27A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  idPhotoText: { fontFamily: fonts.bold, fontSize: 19, color: '#FFFFFF' },
  idName: { fontFamily: fonts.heavy, fontSize: 20, color: '#FFFFFF', letterSpacing: -0.5 },
  idMeta: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  idUin: { fontFamily: fonts.semibold, fontSize: 12, color: colors.gold, marginTop: 4, letterSpacing: 0.6 },
  idQr: { width: 58, height: 58, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  idStrip: {
    marginTop: 16,
    marginHorizontal: -16,
    marginBottom: -16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  idStripText: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.8)' },

  stats: { flexDirection: 'row', gap: 8, marginHorizontal: 16, marginTop: 12, marginBottom: 24 },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: { fontFamily: fonts.displayHeavy, fontSize: 26, color: colors.maroon },
  statLabel: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.ink3, marginTop: -2 },

  card: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 14,
  },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  planTime: { width: 66, fontFamily: fonts.semibold, fontSize: 12.5, color: colors.ink3 },
  planDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.line },
  planDotNow: { backgroundColor: colors.gold, borderWidth: 2, borderColor: colors.maroon, width: 12, height: 12, borderRadius: 6 },
  planDotBig: { backgroundColor: colors.maroon },
  planTitle: { flex: 1, fontFamily: fonts.medium, fontSize: 14, color: colors.ink },

  nodeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nodeRole: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink3 },

  setRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  setIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: colors.maroonSoft, alignItems: 'center', justifyContent: 'center' },
  setLabel: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, color: colors.ink },
  setValue: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink3 },
});
