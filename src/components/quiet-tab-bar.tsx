import { router, type Href } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import * as I from '@/components/icons';
import { quiet } from '@/theme';

export type QuietTab = 'home' | 'discover' | 'map' | 'inbox' | 'you';

const TABS: { name: QuietTab; href: Href; on: typeof I.Home2Bold; off: typeof I.Home2Outline; badge?: boolean }[] = [
  { name: 'home', href: '/v2', on: I.Home2Bold, off: I.Home2Outline },
  { name: 'discover', href: '/v2/discover', on: I.CompassBold, off: I.CompassOutline },
  { name: 'map', href: '/v2/map', on: I.MapPointBold, off: I.MapPointOutline },
  { name: 'inbox', href: '/v2/messages', on: I.ChatRoundDotsBold, off: I.ChatRoundDotsOutline, badge: true },
  { name: 'you', href: '/v2/profile', on: I.UserCircleBold, off: I.UserCircleOutline },
];

// Floating icon-only pill. Labels dropped on purpose; the v2 direction
// keeps chrome to a minimum so content carries each screen.
export function QuietTabBar({ active, dark }: { active: QuietTab; dark?: boolean }) {
  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <View style={[styles.bar, dark && styles.barDark]}>
        {TABS.map((tab) => {
          const focused = tab.name === active;
          const Icon = focused ? tab.on : tab.off;
          const tint = focused ? (dark ? '#FFFFFF' : quiet.ink) : dark ? '#6F6664' : quiet.ink3;
          return (
            <Pressable
              key={tab.name}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              onPress={() => router.navigate(tab.href)}
              style={[styles.item, focused && (dark ? styles.itemOnDark : styles.itemOn)]}>
              <Icon size={24} color={tint} />
              {tab.badge && !focused && <View style={[styles.badge, dark && { borderColor: quiet.nightSurface }]} />}
            </Pressable>
          );
        })}
      </View>
      {Platform.OS === 'web' && <View style={[styles.homeIndicator, dark && { backgroundColor: '#FFFFFF' }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: 30 },
  bar: {
    flexDirection: 'row',
    gap: 4,
    padding: 6,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
  },
  barDark: { backgroundColor: quiet.nightSurface, borderColor: quiet.nightHair },
  item: { width: 54, height: 46, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  itemOn: { backgroundColor: quiet.sunk },
  itemOnDark: { backgroundColor: '#2A2424' },
  badge: {
    position: 'absolute',
    top: 10,
    right: 14,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: quiet.accent,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#111111',
  },
});
