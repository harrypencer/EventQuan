import { Image, type ImageProps } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, nodeColors, type NodeKey } from '@/theme';

export function PillButton({
  label,
  onPress,
  tone = 'gold',
  icon,
  size = 'md',
  style,
}: {
  label: string;
  onPress?: () => void;
  tone?: 'gold' | 'maroon' | 'ghost' | 'light' | 'dark';
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        size === 'sm' && styles.pillSm,
        size === 'lg' && styles.pillLg,
        tone === 'gold' && styles.pillGold,
        tone === 'maroon' && styles.pillMaroon,
        tone === 'ghost' && styles.pillGhost,
        tone === 'light' && styles.pillLight,
        tone === 'dark' && styles.pillDark,
        pressed && { opacity: 0.85 },
        style,
      ]}>
      {icon}
      <Text
        style={[
          styles.pillText,
          size === 'sm' && styles.pillTextSm,
          size === 'lg' && styles.pillTextLg,
          (tone === 'maroon' || tone === 'dark') && { color: '#FFFFFF' },
          tone === 'ghost' && { color: colors.maroon },
          tone === 'light' && { color: '#FFFFFF' },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Chip({ label, active, onPress, count }: { label: string; active?: boolean; onPress?: () => void; count?: number }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipOn]}>
      <Text style={[styles.chipText, active && styles.chipTextOn]}>{label}</Text>
      {count !== undefined && (
        <View style={[styles.chipCount, active && styles.chipCountOn]}>
          <Text style={[styles.chipCountText, active && { color: colors.maroon }]}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
  dark,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  dark?: boolean;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, dark && { color: '#FFFFFF' }]}>{title}</Text>
      {action && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={[styles.sectionAction, dark && { color: colors.gold }]}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

export function LiveDot({ color = colors.live, size = 7 }: { color?: string; size?: number }) {
  return (
    <View style={{ width: size + 6, height: size + 6, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{ position: 'absolute', width: size + 6, height: size + 6, borderRadius: size, backgroundColor: color, opacity: 0.22 }}
      />
      <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
    </View>
  );
}

export function LivePill({ label = 'LIVE', tone = 'red' }: { label?: string; tone?: 'red' | 'gold' | 'glass' }) {
  return (
    <View style={[styles.livePill, tone === 'gold' && { backgroundColor: colors.gold }, tone === 'glass' && styles.livePillGlass]}>
      <View style={[styles.livePillDot, tone === 'gold' && { backgroundColor: colors.maroon }]} />
      <Text style={[styles.livePillText, tone === 'gold' && { color: colors.maroonInk }]}>{label}</Text>
    </View>
  );
}

export function NodeTag({ node, label }: { node: NodeKey; label?: string }) {
  const c = nodeColors[node];
  return (
    <View style={[styles.nodeTag, { backgroundColor: c.soft }]}>
      <View style={[styles.nodeTagDot, { backgroundColor: c.solid }]} />
      <Text style={[styles.nodeTagText, { color: c.solid }]}>{label ?? c.label}</Text>
    </View>
  );
}

// Text monogram used for the A&M skin. A licensed logo drops in here later.
export function AggieMark({ size = 34, inverted }: { size?: number; inverted?: boolean }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: inverted ? '#FFFFFF' : colors.maroon,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: fonts.displayHeavy,
          fontSize: size * 0.5,
          letterSpacing: -0.5,
          color: inverted ? colors.maroon : '#FFFFFF',
          marginTop: -size * 0.04,
        }}>
        A&M
      </Text>
    </View>
  );
}

export function OpponentMark({ size = 30 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.lsu,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
      }}>
      <Text style={{ fontFamily: fonts.displayHeavy, fontSize: size * 0.38, color: colors.lsuGold, letterSpacing: 0.2 }}>LSU</Text>
    </View>
  );
}

const AVATAR_TINTS = ['#C9A27A', '#8C5A3C', '#E3B58F', '#6E4B3A', '#D7A982'];
const AVATAR_INITIALS = ['MJ', 'AR', 'KT', 'DL', 'SB'];

export function AvatarStack({ count = 3, size = 20, ring = '#FFFFFF' }: { count?: number; size?: number; ring?: string }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: AVATAR_TINTS[i % AVATAR_TINTS.length],
            borderWidth: 1.5,
            borderColor: ring,
            marginLeft: i === 0 ? 0 : -size * 0.32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontFamily: fonts.bold, fontSize: size * 0.36, color: '#FFFFFF' }}>
            {AVATAR_INITIALS[i % AVATAR_INITIALS.length]}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function Thumb({
  source,
  size = 76,
  radius = 14,
  children,
}: {
  source: ImageProps['source'];
  size?: number;
  radius?: number;
  children?: ReactNode;
}) {
  return (
    <View style={{ width: size, height: size, borderRadius: radius, overflow: 'hidden', backgroundColor: colors.lineSoft }}>
      <Image source={source} style={StyleSheet.absoluteFill} contentFit="cover" transition={150} />
      {children}
    </View>
  );
}

export function DateBadge({ month, day, tone = 'light' }: { month: string; day: string; tone?: 'light' | 'maroon' }) {
  return (
    <View style={[styles.dateBadge, tone === 'maroon' && { backgroundColor: colors.maroon }]}>
      <Text style={[styles.dateMonth, tone === 'maroon' && { color: colors.gold }]}>{month}</Text>
      <Text style={[styles.dateDay, tone === 'maroon' && { color: '#FFFFFF' }]}>{day}</Text>
    </View>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  pill: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  pillSm: { height: 34, paddingHorizontal: 14, gap: 6 },
  pillLg: { height: 54, paddingHorizontal: 26 },
  pillGold: { backgroundColor: colors.gold },
  pillMaroon: { backgroundColor: colors.maroon },
  pillGhost: { backgroundColor: colors.maroonSoft },
  pillLight: { backgroundColor: 'rgba(255,255,255,0.16)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.24)' },
  pillDark: { backgroundColor: colors.ink },
  pillText: { fontFamily: fonts.bold, fontSize: 15, color: colors.maroonInk, letterSpacing: -0.1 },
  pillTextSm: { fontSize: 13 },
  pillTextLg: { fontSize: 16.5 },

  chip: {
    height: 36,
    paddingHorizontal: 15,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chipOn: { backgroundColor: colors.maroon, borderColor: colors.maroon },
  chipText: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.ink2 },
  chipTextOn: { color: '#FFFFFF' },
  chipCount: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.lineSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  chipCountOn: { backgroundColor: colors.gold },
  chipCountText: { fontFamily: fonts.bold, fontSize: 11, color: colors.ink2 },

  section: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 19, color: colors.ink, letterSpacing: -0.4 },
  sectionAction: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.maroon },

  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.live,
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 999,
  },
  livePillGlass: { backgroundColor: 'rgba(0,0,0,0.45)' },
  livePillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' },
  livePillText: { fontFamily: fonts.heavy, fontSize: 10.5, color: '#FFFFFF', letterSpacing: 0.8 },

  nodeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  nodeTagDot: { width: 6, height: 6, borderRadius: 3 },
  nodeTagText: { fontFamily: fonts.semibold, fontSize: 11 },

  dateBadge: {
    width: 48,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.maroonSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateMonth: { fontFamily: fonts.bold, fontSize: 10.5, color: colors.maroon, letterSpacing: 0.8 },
  dateDay: { fontFamily: fonts.display, fontSize: 24, color: colors.ink, marginTop: -2 },

  card: { backgroundColor: colors.card, borderRadius: 20, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.line },
});
