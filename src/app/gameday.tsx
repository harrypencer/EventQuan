import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import type { ComponentType } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { StackTabBar } from '@/components/tab-bar';
import { AggieMark, OpponentMark, PillButton } from '@/components/ui';
import { photos } from '@/data/photos';
import { colors, fonts } from '@/theme';

type IconType = ComponentType<{ size?: number; color?: string }>;

const TOOLS: { label: string; icon: IconType; live: string; hot?: boolean }[] = [
  { label: 'Game Info', icon: I.InfoCircleBold, live: 'Clear bag' },
  { label: 'Stadium Map', icon: I.MapBold, live: 'AR view' },
  { label: 'Live Stats', icon: I.Chart2Bold, live: 'Pregame' },
  { label: 'Fan Cam', icon: I.CameraBold, live: '2.4K live', hot: true },
  { label: 'Parking', icon: I.CarBold, live: 'Lot 74 · 62%' },
  { label: 'Shuttles', icon: I.BusBold, live: 'Every 6 min' },
  { label: 'Concessions', icon: I.CupPaperBold, live: 'Order ahead', hot: true },
  { label: 'Merch', icon: I.TShirtBold, live: '20% off' },
];

const UPDATES = [
  { who: 'Aggie Football', time: '2m', text: 'Kyle Field is filling up! Gig ’Em, Aggies. Gates 1–8 are open now.', tag: 'Stadium' },
  {
    who: '12th Man Kickoff Team',
    time: '18m',
    text: 'Tonight’s walk-on kickoff unit is set. Find them on the Stadium Map, Sec 119.',
    tag: 'Team',
  },
  {
    who: 'Aggie Alert',
    time: '41m',
    text: 'Clear skies, 68° at kickoff. Bryan–College Station shuttles running every 6 min.',
    tag: 'Weather',
  },
];

export default function GamedayScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={photos.kyleFieldNight} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient
            colors={['rgba(14,8,8,0.55)', 'rgba(60,0,0,0.35)', colors.night]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
          />
          <DeviceStatusBar tone="light" />
          <View style={styles.nav}>
            <Pressable style={styles.glassBtn} onPress={() => (router.canGoBack() ? router.back() : router.navigate('/'))}>
              <I.AltArrowLeftOutline size={22} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.navTitle}>Texas A&M Football</Text>
            <View style={styles.glassBtn}>
              <I.BellOutline size={20} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.modePill}>
            <I.BoltBold size={15} color={colors.gold} />
            <Text style={styles.modeText}>
              <Text style={{ color: colors.gold, fontFamily: fonts.heavy }}>GAME MODE ON</Text> · You’re 0.4 mi from Kyle Field
            </Text>
          </View>

          <Text style={styles.gameday}>GAMEDAY</Text>
          <View style={styles.board}>
            <View style={styles.team}>
              <AggieMark size={58} />
              <Text style={styles.teamName}>TEXAS A&M</Text>
              <Text style={styles.teamRec}>#9 · 6–1</Text>
            </View>
            <View style={styles.clock}>
              <Text style={styles.clockLabel}>KICKOFF IN</Text>
              <Text style={styles.clockValue}>2:14:32</Text>
              <Text style={styles.clockMeta}>6:00 PM · ESPN</Text>
            </View>
            <View style={styles.team}>
              <OpponentMark size={58} />
              <Text style={styles.teamName}>LSU</Text>
              <Text style={styles.teamRec}>#14 · 5–2</Text>
            </View>
          </View>
        </View>

        <View style={styles.ticket}>
          <View style={styles.ticketTop}>
            <View>
              <Text style={styles.ticketEyebrow}>YOUR SEAT · STUDENT SECTION</Text>
              <View style={styles.seatRow}>
                {[
                  ['SEC', '125'],
                  ['ROW', '22'],
                  ['SEAT', '14'],
                ].map(([k, v]) => (
                  <View key={k}>
                    <Text style={styles.seatKey}>{k}</Text>
                    <Text style={styles.seatVal}>{v}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.qr}>
              <I.QrCodeBold size={44} color={colors.ink} />
            </View>
          </View>
          <View style={styles.ticketPerf}>
            <View style={[styles.notch, { left: -9 }]} />
            <View style={styles.dash} />
            <View style={[styles.notch, { right: -9 }]} />
          </View>
          <View style={styles.gateRow}>
            <I.WalkingBold size={18} color={colors.gold} />
            <Text style={styles.gateText}>
              Enter at <Text style={{ color: '#FFFFFF', fontFamily: fonts.bold }}>Gate 6</Text> · 8 min wait · 9 min walk
            </Text>
          </View>
          <PillButton label="Get Tickets / Access" size="lg" icon={<I.TicketBold size={19} color={colors.maroonInk} />} />
        </View>

        <View style={styles.grid}>
          {TOOLS.map((t) => (
            <View key={t.label} style={styles.tool}>
              <View style={[styles.toolIcon, t.hot && { backgroundColor: colors.gold }]}>
                <t.icon size={23} color={t.hot ? colors.maroonInk : colors.gold} />
              </View>
              <Text style={styles.toolLabel} numberOfLines={1}>
                {t.label}
              </Text>
              <Text style={[styles.toolLive, t.hot && { color: colors.gold }]} numberOfLines={1}>
                {t.live}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={styles.liveDot} />
            <Text style={styles.sectionTitle}>Live Updates</Text>
          </View>
          <Text style={styles.sectionAction}>See all</Text>
        </View>

        <View style={styles.feed}>
          {UPDATES.map((u, i) => (
            <View key={u.who} style={[styles.update, i > 0 && styles.updateDivider]}>
              <AggieMark size={36} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.updateWho}>{u.who}</Text>
                  <Text style={styles.updateTime}>· {u.time}</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={styles.updateTag}>{u.tag}</Text>
                </View>
                <Text style={styles.updateText}>{u.text}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.poll}>
          <Text style={styles.pollEyebrow}>FAN ZONE · 1,234 VOTES</Text>
          <Text style={styles.pollQ}>Which unit makes the biggest impact tonight?</Text>
          {[
            ['Offense', 48, true],
            ['Defense', 32, false],
            ['Special Teams', 12, false],
          ].map(([label, pct, lead]) => (
            <View key={label as string} style={styles.pollRow}>
              <View style={[styles.pollFill, { width: `${pct}%` }, lead ? { backgroundColor: colors.gold } : null]} />
              <Text style={[styles.pollLabel, lead ? { color: colors.maroonInk } : null]}>{label as string}</Text>
              <Text style={[styles.pollPct, lead ? { color: colors.maroonInk } : null]}>{pct as number}%</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <StackTabBar active="events" dark />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.night },
  hero: { paddingBottom: 20 },
  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 2 },
  navTitle: { fontFamily: fonts.bold, fontSize: 15, color: '#FFFFFF' },
  glassBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modePill: {
    alignSelf: 'center',
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,203,47,0.5)',
  },
  modeText: { fontFamily: fonts.medium, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', letterSpacing: 0.2 },
  gameday: { fontFamily: fonts.displayHeavy, fontSize: 18, letterSpacing: 6, color: colors.gold, textAlign: 'center', marginTop: 26 },
  board: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, marginTop: 14 },
  team: { alignItems: 'center', width: 92, gap: 6 },
  teamName: { fontFamily: fonts.displayHeavy, fontSize: 17, color: '#FFFFFF', letterSpacing: 0.6 },
  teamRec: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.nightInk2, marginTop: -4 },
  clock: { alignItems: 'center' },
  clockLabel: { fontFamily: fonts.bold, fontSize: 10.5, color: colors.nightInk2, letterSpacing: 1.4 },
  clockValue: { fontFamily: fonts.displayHeavy, fontSize: 44, color: '#FFFFFF', letterSpacing: 0.5, marginTop: -2 },
  clockMeta: { fontFamily: fonts.semibold, fontSize: 12, color: colors.gold, marginTop: -2 },

  ticket: {
    marginHorizontal: 16,
    backgroundColor: colors.nightCard,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.nightLine,
    gap: 14,
  },
  ticketTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ticketEyebrow: { fontFamily: fonts.bold, fontSize: 10.5, color: colors.nightInk2, letterSpacing: 1.2 },
  seatRow: { flexDirection: 'row', gap: 22, marginTop: 8 },
  seatKey: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.nightInk2, letterSpacing: 1 },
  seatVal: { fontFamily: fonts.displayHeavy, fontSize: 30, color: '#FFFFFF', marginTop: -2 },
  qr: { width: 64, height: 64, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  ticketPerf: { height: 2, justifyContent: 'center', marginHorizontal: -16 },
  dash: { marginHorizontal: 18, borderTopWidth: 1.5, borderStyle: 'dashed', borderColor: colors.nightLine },
  notch: { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: colors.night, top: -8 },
  gateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gateText: { fontFamily: fonts.medium, fontSize: 13, color: colors.nightInk2 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 16, gap: 8 },
  tool: {
    width: 83,
    height: 100,
    borderRadius: 18,
    backgroundColor: colors.nightCard,
    borderWidth: 1,
    borderColor: colors.nightLine,
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  toolIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,203,47,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolLabel: { fontFamily: fonts.semibold, fontSize: 11, color: '#FFFFFF', marginTop: 8, letterSpacing: -0.3 },
  toolLive: { fontFamily: fonts.medium, fontSize: 9.5, color: colors.nightInk2, marginTop: 2 },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 26,
    marginBottom: 12,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.live },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 19, color: '#FFFFFF', letterSpacing: -0.4 },
  sectionAction: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.gold },
  feed: {
    marginHorizontal: 16,
    backgroundColor: colors.nightCard,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.nightLine,
    paddingHorizontal: 14,
  },
  update: { flexDirection: 'row', gap: 12, paddingVertical: 14 },
  updateDivider: { borderTopWidth: 1, borderTopColor: colors.nightLine },
  updateWho: { fontFamily: fonts.bold, fontSize: 13.5, color: '#FFFFFF' },
  updateTime: { fontFamily: fonts.medium, fontSize: 12, color: colors.nightInk2 },
  updateTag: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.gold, letterSpacing: 0.3 },
  updateText: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18.5, color: '#E7DEDC', marginTop: 3 },

  poll: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.nightCard,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.nightLine,
    padding: 16,
    gap: 8,
  },
  pollEyebrow: { fontFamily: fonts.bold, fontSize: 10.5, color: colors.nightInk2, letterSpacing: 1.2 },
  pollQ: { fontFamily: fonts.bold, fontSize: 16, color: '#FFFFFF', letterSpacing: -0.3, marginBottom: 4 },
  pollRow: {
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  pollFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 999 },
  pollLabel: { flex: 1, fontFamily: fonts.semibold, fontSize: 13.5, color: '#FFFFFF' },
  pollPct: { fontFamily: fonts.bold, fontSize: 13.5, color: '#FFFFFF' },
});
