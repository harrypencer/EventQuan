import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

const MESSAGES = [
  { from: 'Maya', text: 'Tailgate at Lot 61 by 3, I’ve got the brisket 🔥', mine: false },
  { from: 'Kyle', text: 'I’ll bring chairs. Who has the speaker?', mine: false },
  { from: 'me', text: 'Me. Leaving Zachry at 2:30', mine: true },
  { from: 'me', text: 'Want me to grab ice on the way?', mine: true },
  { from: 'Maya', text: 'Yes please, two bags', mine: false },
];

export default function QuietChat() {
  return (
    <View style={styles.screen}>
      <DeviceStatusBar tone="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.navigate('/v2/messages'))} style={styles.back}>
          <I.AltArrowLeftOutline size={20} color={quiet.ink} />
        </Pressable>
        <Image source={photos.tailgate} style={styles.headerAvatar} contentFit="cover" />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerName}>Gameday Crew</Text>
          <Text style={styles.headerSub}>6 members</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.thread} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.push('/v2/event')} style={styles.pinned}>
          <Image source={photos.kyleFieldNight} style={styles.pinnedPhoto} contentFit="cover" />
          <View style={{ flex: 1 }}>
            <Text style={styles.pinnedTitle}>Texas A&M vs LSU</Text>
            <Text style={styles.pinnedMeta}>Tonight · 6:00 PM · 5 of 6 going</Text>
          </View>
          <I.AltArrowRightOutline size={18} color={quiet.ink3} />
        </Pressable>

        <Text style={styles.day}>Today 9:41</Text>
        {MESSAGES.map((m, i) => {
          const showName = !m.mine && MESSAGES[i - 1]?.from !== m.from;
          return (
            <View key={i} style={{ alignItems: m.mine ? 'flex-end' : 'flex-start' }}>
              {showName && <Text style={styles.sender}>{m.from}</Text>}
              <View style={[styles.bubble, m.mine ? styles.mine : styles.theirs]}>
                <Text style={[styles.text, m.mine && { color: '#FFFFFF' }]}>{m.text}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.composer}>
        <View style={styles.input}>
          <Text style={styles.placeholder}>Message</Text>
        </View>
        <View style={styles.send}>
          <I.ArrowRightOutline size={20} color="#FFFFFF" />
        </View>
      </View>
      {Platform.OS === 'web' && <View style={styles.homeIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: quiet.hair,
  },
  back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerAvatar: { width: 40, height: 40, borderRadius: 20 },
  headerName: { fontFamily: fonts.semibold, fontSize: 16, color: quiet.ink, letterSpacing: -0.3 },
  headerSub: { fontFamily: fonts.regular, fontSize: 12.5, color: quiet.ink3 },

  thread: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, gap: 6 },
  pinned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    paddingRight: 14,
    borderRadius: 22,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
  },
  pinnedPhoto: { width: 48, height: 48, borderRadius: 14 },
  pinnedTitle: { fontFamily: fonts.semibold, fontSize: 15, color: quiet.ink, letterSpacing: -0.3 },
  pinnedMeta: { fontFamily: fonts.regular, fontSize: 13, color: quiet.ink2, marginTop: 1 },
  day: { fontFamily: fonts.medium, fontSize: 12, color: quiet.ink3, textAlign: 'center', marginTop: 20, marginBottom: 8 },
  sender: { fontFamily: fonts.medium, fontSize: 12, color: quiet.ink3, marginLeft: 14, marginTop: 8, marginBottom: 3 },
  bubble: { maxWidth: '78%', paddingHorizontal: 16, paddingVertical: 11, borderRadius: 22 },
  theirs: { backgroundColor: quiet.surface, borderWidth: StyleSheet.hairlineWidth, borderColor: quiet.hair },
  mine: { backgroundColor: quiet.ink },
  text: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 21, color: quiet.ink },

  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 34 },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  placeholder: { fontFamily: fonts.regular, fontSize: 15, color: quiet.ink3 },
  send: { width: 48, height: 48, borderRadius: 24, backgroundColor: quiet.accent, alignItems: 'center', justifyContent: 'center' },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#111111',
  },
});
