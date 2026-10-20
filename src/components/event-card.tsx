import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import * as I from '@/components/icons';
import { AvatarStack, DateBadge, LivePill, OpponentMark, Thumb } from '@/components/ui';
import type { CampusEvent } from '@/data/campus';
import { colors, fonts } from '@/theme';

const CATEGORY_TINT: Record<CampusEvent['category'], string> = {
  Athletics: colors.maroon,
  'Student Life': '#B4570B',
  Academic: colors.bryan,
  Traditions: '#6B4E16',
};

export function EventCard({ event, showDate }: { event: CampusEvent; showDate?: boolean }) {
  return (
    <Pressable onPress={() => router.push(event.href)} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <Thumb source={event.photo} size={84} radius={16}>
        {event.opponent && (
          <View style={styles.opponent}>
            <OpponentMark size={30} />
          </View>
        )}
        {event.live && (
          <View style={styles.live}>
            <LivePill label="TONIGHT" />
          </View>
        )}
      </Thumb>
      <View style={styles.body}>
        <Text style={[styles.category, { color: CATEGORY_TINT[event.category] }]}>{event.category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={styles.metaRow}>
          <I.ClockCircleOutline size={14} color={colors.ink3} />
          <Text style={styles.meta} numberOfLines={1}>
            {event.when}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <I.MapPointOutline size={14} color={colors.ink3} />
          <Text style={styles.meta} numberOfLines={1}>
            {event.venue}
          </Text>
        </View>
        <View style={[styles.metaRow, { marginTop: 4 }]}>
          <AvatarStack count={3} size={18} />
          <Text style={styles.going}>{event.attending}</Text>
        </View>
      </View>
      {showDate && event.dateBadge ? (
        <DateBadge month={event.dateBadge.month} day={event.dateBadge.day} />
      ) : (
        <View style={styles.save}>
          <I.BookmarkOutline size={20} color={colors.ink3} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    alignItems: 'flex-start',
  },
  opponent: { position: 'absolute', right: 5, bottom: 5 },
  live: { position: 'absolute', left: 6, top: 6 },
  body: { flex: 1, gap: 2, paddingTop: 1 },
  category: { fontFamily: fonts.bold, fontSize: 10.5, letterSpacing: 0.9 },
  title: { fontFamily: fonts.bold, fontSize: 15.5, color: colors.ink, letterSpacing: -0.3, marginBottom: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  meta: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink2, flexShrink: 1 },
  going: { fontFamily: fonts.semibold, fontSize: 12, color: colors.ink2 },
  save: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});
