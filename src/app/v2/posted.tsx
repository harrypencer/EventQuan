import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { AvatarStack } from '@/components/ui';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

// Confirmation after posting: one card, one link, one action.
export default function QuietPosted() {
  return (
    <View style={styles.screen}>
      <DeviceStatusBar tone="dark" />
      <View style={styles.body}>
        <View style={styles.check}>
          <I.CheckCircleBold size={34} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>It’s live.</Text>
        <Text style={styles.sub}>24 members of Aggie Bowling Club just got your invite.</Text>

        <View style={styles.card}>
          <Image source={photos.bowling} style={styles.cardPhoto} contentFit="cover" />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Bowling league kickoff</Text>
            <Text style={styles.cardMeta}>Sat, Oct 24 · 7:00 PM · Grand Station</Text>
            <View style={styles.going}>
              <AvatarStack count={3} size={22} ring={quiet.surface} />
              <Text style={styles.goingText}>3 going already</Text>
            </View>
          </View>
        </View>

        <View style={styles.link}>
          <I.LinkOutline size={18} color={quiet.ink2} />
          <Text style={styles.linkText} numberOfLines={1}>
            eventquan.app/e/bowl-oct24
          </Text>
          <Text style={styles.copy}>Copy</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.cta}>
          <I.ShareOutline size={18} color="#FFFFFF" />
          <Text style={styles.ctaText}>Share invite</Text>
        </Pressable>
        <Pressable onPress={() => router.navigate('/v2')} style={styles.done}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  body: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  check: { width: 64, height: 64, borderRadius: 32, backgroundColor: quiet.accent, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.bold, fontSize: 38, color: quiet.ink, letterSpacing: -1.5, marginTop: 24 },
  sub: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 23, color: quiet.ink2, marginTop: 8 },
  card: {
    marginTop: 32,
    borderRadius: 28,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    overflow: 'hidden',
  },
  cardPhoto: { height: 150, backgroundColor: quiet.sunk },
  cardBody: { padding: 18 },
  cardTitle: { fontFamily: fonts.semibold, fontSize: 18, color: quiet.ink, letterSpacing: -0.5 },
  cardMeta: { fontFamily: fonts.regular, fontSize: 14, color: quiet.ink2, marginTop: 3 },
  going: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14 },
  goingText: { fontFamily: fonts.medium, fontSize: 13.5, color: quiet.ink2 },
  link: {
    marginTop: 12,
    height: 52,
    borderRadius: 999,
    backgroundColor: quiet.sunk,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  linkText: { flex: 1, fontFamily: fonts.medium, fontSize: 14, color: quiet.ink2 },
  copy: { fontFamily: fonts.semibold, fontSize: 14, color: quiet.ink },
  footer: { paddingHorizontal: 20, paddingBottom: 34, gap: 6 },
  cta: {
    height: 56,
    borderRadius: 999,
    backgroundColor: quiet.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaText: { fontFamily: fonts.semibold, fontSize: 16, color: '#FFFFFF', letterSpacing: -0.2 },
  done: { height: 52, alignItems: 'center', justifyContent: 'center' },
  doneText: { fontFamily: fonts.semibold, fontSize: 15.5, color: quiet.ink2 },
});
