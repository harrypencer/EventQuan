import { Image } from 'expo-image';
import { router } from 'expo-router';
import type { ComponentType } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { AvatarStack } from '@/components/ui';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

type IconType = ComponentType<{ size?: number; color?: string }>;

const FACTS: { icon: IconType; title: string; sub: string }[] = [
  { icon: I.CalendarOutline, title: 'Tonight, Oct 20', sub: '6:00 – 9:30 PM · Gates 4:00 PM' },
  { icon: I.MapPointOutline, title: 'Kyle Field', sub: 'Home of the 12th Man · 8 min walk' },
];

export default function QuietEvent() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <DeviceStatusBar tone="dark" />
        <View style={styles.nav}>
          <Pressable onPress={() => router.back()} style={styles.navBtn}>
            <I.AltArrowLeftOutline size={20} color={quiet.ink} />
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={styles.navBtn}>
              <I.ShareOutline size={19} color={quiet.ink} />
            </View>
            <View style={styles.navBtn}>
              <I.BookmarkOutline size={19} color={quiet.ink} />
            </View>
          </View>
        </View>

        <View style={styles.cover}>
          <Image source={photos.kyleFieldNight} style={StyleSheet.absoluteFill} contentFit="cover" />
        </View>

        <View style={styles.body}>
          <Text style={styles.kicker}>Athletics</Text>
          <Text style={styles.title}>Texas A&M vs LSU</Text>

          <View style={styles.facts}>
            {FACTS.map((f) => (
              <View key={f.title} style={styles.fact}>
                <View style={styles.factIcon}>
                  <f.icon size={20} color={quiet.ink} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.factTitle}>{f.title}</Text>
                  <Text style={styles.factSub}>{f.sub}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.friends}>
            <AvatarStack count={4} size={28} ring={quiet.paper} />
            <Text style={styles.friendsText}>Maya, Kyle and 12 friends are going</Text>
          </View>

          <Text style={styles.about}>
            The biggest night of the season. Wear maroon, get there early for the march-in, and stay for Midnight Yell
            after the final whistle.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>Student pass</Text>
          <Text style={styles.priceSub}>Included with ID</Text>
        </View>
        <Pressable onPress={() => router.push('/v2/ticket')} style={styles.cta}>
          <Text style={styles.ctaText}>I’m going</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  nav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 6 },
  navBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: { marginHorizontal: 20, marginTop: 16, height: 260, borderRadius: 28, overflow: 'hidden', backgroundColor: quiet.sunk },
  body: { paddingHorizontal: 24, paddingTop: 24 },
  kicker: { fontFamily: fonts.medium, fontSize: 13.5, color: quiet.accent },
  title: { fontFamily: fonts.bold, fontSize: 30, color: quiet.ink, letterSpacing: -1.1, marginTop: 4 },
  facts: { marginTop: 22, gap: 16 },
  fact: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  factIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: quiet.sunk, alignItems: 'center', justifyContent: 'center' },
  factTitle: { fontFamily: fonts.semibold, fontSize: 15.5, color: quiet.ink, letterSpacing: -0.3 },
  factSub: { fontFamily: fonts.regular, fontSize: 13.5, color: quiet.ink2, marginTop: 2 },
  friends: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
    paddingTop: 22,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: quiet.hair,
  },
  friendsText: { fontFamily: fonts.medium, fontSize: 14, color: quiet.ink2 },
  about: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: quiet.ink2, marginTop: 20 },
  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 30,
    height: 72,
    borderRadius: 999,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 8,
  },
  price: { fontFamily: fonts.semibold, fontSize: 15.5, color: quiet.ink, letterSpacing: -0.3 },
  priceSub: { fontFamily: fonts.regular, fontSize: 12.5, color: quiet.ink3, marginTop: 1 },
  cta: { height: 56, paddingHorizontal: 30, borderRadius: 999, backgroundColor: quiet.accent, alignItems: 'center', justifyContent: 'center' },
  ctaText: { fontFamily: fonts.semibold, fontSize: 16, color: '#FFFFFF', letterSpacing: -0.2 },
});
