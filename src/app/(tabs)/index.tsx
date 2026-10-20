import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import type { ComponentType } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { AggieMark, AvatarStack, LiveDot, OpponentMark, PillButton, SectionHeader } from '@/components/ui';
import { photos } from '@/data/photos';
import { colors, fonts } from '@/theme';

type IconType = ComponentType<{ size?: number; color?: string }>;

const MOMENTS = [
  { time: '8:00', label: 'Dorm', state: 'done' },
  { time: '10:00', label: 'Class', state: 'now' },
  { time: '12:15', label: 'Lunch', state: 'next' },
  { time: '3:00', label: 'Org', state: 'next' },
  { time: '4:40', label: 'Transit', state: 'next' },
  { time: '6:00', label: 'Football', state: 'big' },
  { time: '10:30', label: 'Night', state: 'next' },
] as const;

const TILES: { label: string; icon: IconType; live: string; tone?: 'ok' | 'live' | 'gold'; href?: Href }[] = [
  { label: 'Classes', icon: I.NotebookBold, live: 'Next in 12m', tone: 'live', href: '/node/zachry' },
  { label: 'Campus Map', icon: I.MapBold, live: 'You’re at Evans', href: '/map' },
  { label: 'Dining', icon: I.ChefHatBold, live: 'Sbisa · open', tone: 'ok', href: '/node/msc' },
  { label: 'Transit', icon: I.BusBold, live: 'Bus 12 · 4 min', tone: 'ok', href: '/map' },
  { label: 'Events', icon: I.CalendarMarkBold, live: '8 today', href: '/events' },
  { label: 'Orgs', icon: I.UsersGroupRoundedBold, live: '2 meetings', href: '/messages' },
  { label: 'Athletics', icon: I.FootballBold, live: 'Tonight 6 PM', tone: 'gold', href: '/gameday' },
  { label: 'Safety', icon: I.ShieldCheckBold, live: 'All clear', tone: 'ok', href: '/profile' },
  { label: 'Quick Event', icon: I.AddCircleBold, live: 'Post in 30s', href: '/quick-event' },
  { label: 'Messages', icon: I.ChatRoundDotsBold, live: '3 unread', tone: 'live', href: '/messages' },
  { label: 'Aggie ID', icon: I.UserIdBold, live: 'Tap to show', href: '/profile' },
  { label: 'More', icon: I.WidgetBold, live: '24 services' },
];

const NEARBY = [
  {
    title: 'MSC Open House',
    meta: 'Now · Memorial Student Center',
    going: '1.9K here',
    photo: photos.orgMeeting,
    live: true,
    href: '/node/msc' as Href,
  },
  {
    title: 'Corps March-In',
    meta: '4:15 PM · Quad → Kyle Field',
    going: 'Open to public',
    photo: photos.band,
    live: false,
    href: '/node/kyle-field' as Href,
  },
  {
    title: 'Engineering Career Fair',
    meta: 'Thu · Zachry',
    going: '2.1K going',
    photo: photos.careerFair,
    live: false,
    href: '/node/zachry' as Href,
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[colors.maroon, colors.maroonDeep]} style={styles.header}>
        <DeviceStatusBar tone="light" />
        <View style={styles.topRow}>
          <View style={styles.brand}>
            <AggieMark size={34} inverted />
            <View>
              <Text style={styles.brandName}>TEXAS A&M UNIVERSITY</Text>
              <Text style={styles.brandSub}>on EventQuan</Text>
            </View>
          </View>
          <View style={styles.topActions}>
            <View style={styles.roundBtn}>
              <I.BellOutline size={21} color="#FFFFFF" />
              <View style={styles.bellDot} />
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JL</Text>
            </View>
          </View>
        </View>

        <Text style={styles.greeting}>Good Morning, Aggie!</Text>
        <View style={styles.greetRow}>
          <Text style={styles.greetSub}>Tuesday, Oct 20 · College Station, TX</Text>
          <View style={styles.weather}>
            <I.Sun2Bold size={18} color={colors.gold} />
            <Text style={styles.weatherTemp}>72° Sunny</Text>
          </View>
        </View>

        <View style={styles.search}>
          <I.MagnifierOutline size={19} color={colors.ink3} />
          <Text style={styles.searchText}>Search events, places, people…</Text>
        </View>
      </LinearGradient>

      {/* What's live leads; the launcher grid follows. */}
      <View style={styles.nowCard}>
        <View style={styles.nowLabelRow}>
          <LiveDot />
          <Text style={styles.nowLabel}>RIGHT NOW · 9:48 AM</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.nowCount}>1 of 3</Text>
        </View>
        <View style={styles.nowMain}>
          <View style={styles.nowIcon}>
            <Text style={styles.nowIconCode}>ENGR</Text>
            <Text style={styles.nowIconNum}>102</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nowTitle}>Engineering Design in 12 min</Text>
            <Text style={styles.nowMeta}>Zachry 244 · 6 min walk · Dr. Rivera</Text>
          </View>
        </View>
        <View style={styles.nowActions}>
          <PillButton
            label="Navigate"
            size="sm"
            onPress={() => router.push('/node/zachry')}
            icon={<I.RoutingBold size={16} color={colors.maroonInk} />}
            style={{ flex: 1 }}
          />
          <PillButton label="Order Sbisa for 12:15" size="sm" tone="ghost" style={{ flex: 1.4 }} />
        </View>

        <View style={styles.rail}>
          {MOMENTS.map((m, i) => (
            <View key={m.label} style={styles.railItem}>
              <View style={styles.railTrack}>
                <View
                  style={[styles.railLine, i === 0 && { opacity: 0 }, m.state === 'done' || m.state === 'now' ? styles.railLineDone : null]}
                />
                <View
                  style={[
                    styles.railDot,
                    m.state === 'done' && styles.railDotDone,
                    m.state === 'now' && styles.railDotNow,
                    m.state === 'big' && styles.railDotBig,
                  ]}
                />
                <View style={[styles.railLine, i === MOMENTS.length - 1 && { opacity: 0 }, m.state === 'done' && styles.railLineDone]} />
              </View>
              <Text style={[styles.railLabel, m.state === 'now' && styles.railLabelNow, m.state === 'big' && styles.railLabelBig]}>
                {m.label}
              </Text>
              <Text style={styles.railTime}>{m.time}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.grid}>
        {TILES.map((t) => {
          return (
            <Pressable
              key={t.label}
              onPress={t.href ? () => router.push(t.href!) : undefined}
              style={[styles.tile, t.tone === 'gold' && styles.tileGold]}>
              <View style={[styles.tileIcon, t.tone === 'gold' && { backgroundColor: colors.maroon }]}>
                <t.icon size={24} color={t.tone === 'gold' ? colors.gold : colors.maroon} />
              </View>
              <Text style={styles.tileLabel} numberOfLines={1}>
                {t.label}
              </Text>
              <View style={styles.tileLiveRow}>
                {(t.tone === 'live' || t.tone === 'ok' || t.tone === 'gold') && (
                  <View
                    style={[
                      styles.tileDot,
                      { backgroundColor: t.tone === 'ok' ? colors.ok : t.tone === 'gold' ? colors.goldDeep : colors.live },
                    ]}
                  />
                )}
                <Text style={[styles.tileLive, t.tone === 'gold' && { color: colors.maroon }]} numberOfLines={1}>
                  {t.live}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={() => router.push('/gameday')} style={styles.gameday}>
        <Image source={photos.kyleFieldNight} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient colors={['rgba(40,0,0,0.25)', 'rgba(30,0,0,0.92)']} style={StyleSheet.absoluteFill} />
        <View style={styles.gamedayTop}>
          <View style={styles.gamedayTag}>
            <Text style={styles.gamedayTagText}>GAMEDAY · TONIGHT</Text>
          </View>
          <Text style={styles.gamedayCountdown}>Kickoff in 8h 12m</Text>
        </View>
        <View style={styles.gamedayMatch}>
          <AggieMark size={40} />
          <Text style={styles.gamedayVs}>A&M vs LSU</Text>
          <OpponentMark size={40} />
        </View>
        <View style={styles.gamedayBottom}>
          <View>
            <Text style={styles.gamedayMeta}>6:00 PM · Kyle Field</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <AvatarStack count={3} size={18} ring={colors.maroonDeep} />
              <Text style={styles.gamedayFriends}>14 friends going</Text>
            </View>
          </View>
          <View style={styles.gamedayCta}>
            <I.BoltBold size={16} color={colors.maroonInk} />
            <Text style={styles.gamedayCtaText}>Game Mode</Text>
          </View>
        </View>
      </Pressable>

      <SectionHeader title="Happening around you" action="See all" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
        {NEARBY.map((n) => (
          <Pressable key={n.title} onPress={() => router.push(n.href)} style={styles.nearCard}>
            <View style={styles.nearPhoto}>
              <Image source={n.photo} style={StyleSheet.absoluteFill} contentFit="cover" />
              {n.live && (
                <View style={styles.nearLive}>
                  <View style={styles.nearLiveDot} />
                  <Text style={styles.nearLiveText}>LIVE NOW</Text>
                </View>
              )}
            </View>
            <View style={{ padding: 12, gap: 3 }}>
              <Text style={styles.nearTitle} numberOfLines={1}>
                {n.title}
              </Text>
              <Text style={styles.nearMeta} numberOfLines={1}>
                {n.meta}
              </Text>
              <Text style={styles.nearGoing}>{n.going}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { paddingBottom: 66, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 4 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandName: { fontFamily: fonts.display, fontSize: 15.5, color: '#FFFFFF', letterSpacing: 1.1 },
  brandSub: { fontFamily: fonts.medium, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: -1 },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  roundBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
    borderWidth: 1.5,
    borderColor: colors.maroon,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#C9A27A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: { fontFamily: fonts.bold, fontSize: 13, color: '#FFFFFF' },

  greetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 6 },
  greeting: { fontFamily: fonts.heavy, fontSize: 28, color: '#FFFFFF', letterSpacing: -0.9, paddingHorizontal: 20, marginTop: 22 },
  greetSub: { fontFamily: fonts.medium, fontSize: 13, color: 'rgba(255,255,255,0.68)', marginTop: 3 },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 10,
    height: 28,
  },
  weatherTemp: { fontFamily: fonts.bold, fontSize: 12.5, color: '#FFFFFF' },

  search: {
    marginHorizontal: 20,
    marginTop: 18,
    height: 46,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  searchText: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.ink3 },

  nowCard: {
    marginHorizontal: 16,
    marginTop: -46,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  nowLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  nowLabel: { fontFamily: fonts.bold, fontSize: 11, color: colors.live, letterSpacing: 1 },
  nowCount: { fontFamily: fonts.semibold, fontSize: 11.5, color: colors.ink3 },
  nowMain: { flexDirection: 'row', gap: 12, marginTop: 10, alignItems: 'center' },
  nowIcon: { width: 54, height: 54, borderRadius: 16, backgroundColor: colors.maroon, alignItems: 'center', justifyContent: 'center' },
  nowIconCode: { fontFamily: fonts.bold, fontSize: 10, color: colors.gold, letterSpacing: 1 },
  nowIconNum: { fontFamily: fonts.displayHeavy, fontSize: 22, color: '#FFFFFF', marginTop: -3 },
  nowTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, letterSpacing: -0.35, lineHeight: 21 },
  nowMeta: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink2, marginTop: 3 },
  nowActions: { flexDirection: 'row', gap: 8, marginTop: 14 },

  rail: { flexDirection: 'row', marginTop: 16, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  railItem: { flex: 1, alignItems: 'center' },
  railTrack: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', height: 14 },
  railLine: { flex: 1, height: 2, backgroundColor: colors.line },
  railLineDone: { backgroundColor: colors.maroon },
  railDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.card, borderWidth: 2, borderColor: colors.line },
  railDotDone: { backgroundColor: colors.maroon, borderColor: colors.maroon },
  railDotNow: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.gold, borderWidth: 3, borderColor: colors.maroon },
  railDotBig: { width: 12, height: 12, borderRadius: 6, borderColor: colors.goldDeep, backgroundColor: colors.goldSoft },
  railLabel: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.ink3, marginTop: 6 },
  railLabelNow: { color: colors.maroon, fontFamily: fonts.bold },
  railLabelBig: { color: colors.ink, fontFamily: fonts.bold },
  railTime: { fontFamily: fonts.medium, fontSize: 9.5, color: colors.ink3, marginTop: 1 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 18, gap: 8 },
  tile: {
    width: 83,
    height: 104,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 4,
    paddingTop: 12,
    alignItems: 'center',
  },
  tileGold: { borderColor: colors.gold, borderWidth: 1.5, backgroundColor: colors.goldSoft },
  tileIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.maroonSoft, alignItems: 'center', justifyContent: 'center' },
  tileLabel: { fontFamily: fonts.semibold, fontSize: 11, color: colors.ink, marginTop: 8, letterSpacing: -0.35 },
  tileLiveRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 3 },
  tileDot: { width: 5, height: 5, borderRadius: 3 },
  tileLive: { fontFamily: fonts.medium, fontSize: 9.5, color: colors.ink3 },

  gameday: {
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 26,
    height: 196,
    borderRadius: 24,
    overflow: 'hidden',
    padding: 16,
    justifyContent: 'space-between',
  },
  gamedayTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  gamedayTag: { backgroundColor: colors.gold, borderRadius: 999, paddingHorizontal: 10, height: 24, justifyContent: 'center' },
  gamedayTagText: { fontFamily: fonts.heavy, fontSize: 10.5, color: colors.maroonInk, letterSpacing: 1 },
  gamedayCountdown: { fontFamily: fonts.semibold, fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  gamedayMatch: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  gamedayVs: { fontFamily: fonts.displayHeavy, fontSize: 34, color: '#FFFFFF', letterSpacing: 0.2 },
  gamedayBottom: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  gamedayMeta: { fontFamily: fonts.bold, fontSize: 14, color: '#FFFFFF' },
  gamedayFriends: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  gamedayCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.gold,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  gamedayCtaText: { fontFamily: fonts.bold, fontSize: 14, color: colors.maroonInk },

  nearCard: {
    width: 214,
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  nearPhoto: { height: 116, backgroundColor: colors.lineSoft },
  nearLive: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 999,
  },
  nearLiveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.live },
  nearLiveText: { fontFamily: fonts.heavy, fontSize: 10, color: '#FFFFFF', letterSpacing: 0.8 },
  nearTitle: { fontFamily: fonts.bold, fontSize: 14.5, color: colors.ink, letterSpacing: -0.3 },
  nearMeta: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink2 },
  nearGoing: { fontFamily: fonts.semibold, fontSize: 11.5, color: colors.maroon, marginTop: 2 },
});
