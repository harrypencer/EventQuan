import { router, type Href } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as I from '@/components/icons';
import { colors, fonts } from '@/theme';

export type TabName = 'index' | 'events' | 'map' | 'messages' | 'profile';

const TABS: { name: TabName; label: string; href: Href; on: typeof I.Home2Bold; off: typeof I.Home2Outline }[] = [
  { name: 'index', label: 'Home', href: '/', on: I.Home2Bold, off: I.Home2Outline },
  { name: 'events', label: 'Events', href: '/events', on: I.CalendarBold, off: I.CalendarOutline },
  { name: 'map', label: 'Map', href: '/map', on: I.MapPointBold, off: I.MapPointOutline },
  { name: 'messages', label: 'Messages', href: '/messages', on: I.ChatRoundDotsBold, off: I.ChatRoundDotsOutline },
  { name: 'profile', label: 'Profile', href: '/profile', on: I.UserCircleBold, off: I.UserCircleOutline },
];

// Used by the tabs navigator.
export function TabBar({ state, navigateToTab }: BottomTabBarProps) {
  const active = (state.routes[state.index]?.name ?? 'index') as TabName;
  return (
    <TabBarView
      active={active}
      onSelect={(name) => {
        const route = state.routes.find((r) => r.name === name);
        if (route) navigateToTab(route.key);
      }}
    />
  );
}

// Used by stack screens (Gameday, node pages) so the five tabs stay
// identical on every screen, as the concept boards require.
export function StackTabBar({ active, dark }: { active: TabName; dark?: boolean }) {
  return <TabBarView active={active} dark={dark} onSelect={(name) => router.navigate(TABS.find((t) => t.name === name)!.href)} />;
}

function TabBarView({ active, dark, onSelect }: { active: TabName; dark?: boolean; onSelect: (name: TabName) => void }) {
  const insets = useSafeAreaInsets();
  const bottom = Platform.OS === 'web' ? 26 : Math.max(insets.bottom, 10);

  return (
    <View style={[styles.bar, dark && styles.barDark, { paddingBottom: bottom }]}>
      {TABS.map((tab) => {
        const focused = active === tab.name;
        const Icon = focused ? tab.on : tab.off;
        const tint = focused ? (dark ? colors.gold : colors.maroon) : dark ? '#8C7F7C' : '#9A918E';
        return (
          <Pressable
            key={tab.name}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            onPress={() => onSelect(tab.name)}
            style={styles.item}>
            <Icon size={25} color={tint} />
            <Text style={[styles.label, { color: tint }, focused && styles.labelOn]}>{tab.label}</Text>
            {tab.name === 'messages' && <View style={[styles.badge, dark && styles.badgeDark]} />}
          </Pressable>
        );
      })}
      {Platform.OS === 'web' && <View style={[styles.homeIndicator, dark && styles.homeIndicatorDark]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    paddingTop: 8,
  },
  barDark: { backgroundColor: 'rgba(16,10,10,0.97)', borderTopColor: colors.nightLine },
  item: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontFamily: fonts.medium, fontSize: 10.5, letterSpacing: 0.1 },
  labelOn: { fontFamily: fonts.bold },
  badge: {
    position: 'absolute',
    top: 0,
    right: '30%',
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.live,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeDark: { borderColor: colors.night },
  homeIndicator: {
    position: 'absolute',
    bottom: 7,
    left: '50%',
    marginLeft: -67,
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#111111',
  },
  homeIndicatorDark: { backgroundColor: '#FFFFFF' },
});
