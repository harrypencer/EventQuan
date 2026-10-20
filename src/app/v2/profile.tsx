import type { ComponentType } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { QuietTabBar } from '@/components/quiet-tab-bar';
import { fonts, quiet } from '@/theme';

type IconType = ComponentType<{ size?: number; color?: string }>;

const ROWS: { icon: IconType; label: string; value?: string }[] = [
  { icon: I.UserIdOutline, label: 'Aggie ID', value: 'Valid' },
  { icon: I.CalendarOutline, label: 'My plan', value: '4 today' },
  { icon: I.UsersGroupRoundedOutline, label: 'Orgs', value: '3' },
  { icon: I.BellOutline, label: 'Notifications' },
  { icon: I.SettingsOutline, label: 'Settings' },
];

export default function QuietProfile() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <DeviceStatusBar tone="dark" />
        <View style={styles.top}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JL</Text>
          </View>
          <Text style={styles.name}>Jordan Lee</Text>
          <Text style={styles.sub}>Mechanical Engineering · Class of ’27</Text>
        </View>

        <View style={styles.stats}>
          {[
            ['14', 'Events'],
            ['3', 'Orgs'],
            ['128', 'Friends'],
          ].map(([n, l], i) => (
            <View key={l} style={[styles.stat, i > 0 && styles.statRule]}>
              <Text style={styles.statN}>{n}</Text>
              <Text style={styles.statL}>{l}</Text>
            </View>
          ))}
        </View>

        <View style={styles.list}>
          {ROWS.map((r, i) => (
            <View key={r.label} style={[styles.row, i > 0 && styles.rowRule]}>
              <r.icon size={22} color={quiet.ink} />
              <Text style={styles.rowLabel}>{r.label}</Text>
              {r.value && <Text style={styles.rowValue}>{r.value}</Text>}
              <I.AltArrowRightOutline size={18} color={quiet.ink3} />
            </View>
          ))}
        </View>
      </ScrollView>
      <QuietTabBar active="you" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  top: { alignItems: 'center', marginTop: 36 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#C9A27A', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.semibold, fontSize: 32, color: '#FFFFFF', letterSpacing: -0.5 },
  name: { fontFamily: fonts.bold, fontSize: 26, color: quiet.ink, letterSpacing: -0.9, marginTop: 16 },
  sub: { fontFamily: fonts.regular, fontSize: 14.5, color: quiet.ink2, marginTop: 4 },
  stats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 18,
    borderRadius: 24,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
  },
  stat: { flex: 1, alignItems: 'center' },
  statRule: { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: quiet.hair },
  statN: { fontFamily: fonts.bold, fontSize: 22, color: quiet.ink, letterSpacing: -0.6 },
  statL: { fontFamily: fonts.regular, fontSize: 13, color: quiet.ink3, marginTop: 2 },
  list: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    paddingHorizontal: 18,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, height: 60 },
  rowRule: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: quiet.hair },
  rowLabel: { flex: 1, fontFamily: fonts.medium, fontSize: 15.5, color: quiet.ink, letterSpacing: -0.2 },
  rowValue: { fontFamily: fonts.regular, fontSize: 14, color: quiet.ink3 },
});
