import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import type { ComponentType } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { StackTabBar } from '@/components/tab-bar';
import { DateBadge, LivePill, NodeTag, PillButton, SectionHeader } from '@/components/ui';
import { nodes, type CampusNode } from '@/data/campus';
import { colors, fonts, nodeColors } from '@/theme';

const INSIDE_ICONS: Record<CampusNode['inside'][number]['icon'], ComponentType<{ size?: number; color?: string }>> = {
  food: I.CupPaperBold,
  restroom: I.MenBold,
  aid: I.MedicalKitBold,
  help: I.InfoCircleBold,
  seat: I.SofaBold,
  shop: I.ShopBold,
  study: I.BookBookmarkBold,
  wifi: I.WiFiBold,
};

export default function NodeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const node = nodes[id ?? ''] ?? nodes['kyle-field'];

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={node.photo} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient
            colors={['rgba(20,0,0,0.55)', 'rgba(20,0,0,0.05)', 'rgba(30,0,0,0.88)']}
            locations={[0, 0.35, 1]}
            style={StyleSheet.absoluteFill}
          />
          <DeviceStatusBar tone="light" />
          <View style={styles.heroNav}>
            <Pressable style={styles.glassBtn} onPress={() => (router.canGoBack() ? router.back() : router.push('/map'))}>
              <I.AltArrowLeftOutline size={22} color="#FFFFFF" />
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={styles.glassBtn}>
                <I.ShareOutline size={19} color="#FFFFFF" />
              </View>
              <View style={styles.glassBtn}>
                <I.BookmarkOutline size={19} color="#FFFFFF" />
              </View>
            </View>
          </View>
          <View style={styles.heroBody}>
            <View style={styles.crumbs}>
              <Text style={styles.crumb}>{node.parent.name}</Text>
              <I.AltArrowRightOutline size={12} color="rgba(255,255,255,0.6)" />
              <Text style={styles.crumb}>{node.module}</Text>
            </View>
            <Text style={styles.name}>{node.name}</Text>
            <View style={styles.factsRow}>
              <View style={[styles.statusPill, !node.status.open && { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
                <View style={[styles.statusDot, !node.status.open && { backgroundColor: '#FFFFFF' }]} />
                <Text style={styles.statusText}>{node.status.label}</Text>
              </View>
              <Text style={styles.facts}>
                {node.kind} · {node.facts.join(' · ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={styles.pulse}>
            {node.pulse.map((p, i) => (
              <View key={p.label} style={[styles.pulseItem, i > 0 && styles.pulseDivider]}>
                <Text style={styles.pulseValue}>{p.value}</Text>
                <Text style={styles.pulseLabel}>{p.label}</Text>
              </View>
            ))}
          </View>

          <SectionHeader title="Live here now" />
          <View style={styles.liveCard}>
            <View style={styles.livePhoto}>
              <Image source={node.liveNow.photo} style={StyleSheet.absoluteFill} contentFit="cover" />
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.65)']} style={StyleSheet.absoluteFill} />
              <View style={{ position: 'absolute', top: 12, left: 12 }}>
                <LivePill />
              </View>
              <Text style={styles.liveMeta}>{node.liveNow.meta}</Text>
            </View>
            <View style={styles.liveBody}>
              <View style={{ flex: 1 }}>
                <Text style={styles.liveTitle}>{node.liveNow.title}</Text>
                <Text style={styles.liveDetail}>{node.liveNow.detail}</Text>
              </View>
              <PillButton label={node.liveNow.cta} size="sm" icon={<I.RoutingBold size={15} color={colors.maroonInk} />} />
            </View>
          </View>

          <View style={{ height: 26 }} />
          <SectionHeader title="Coming up here" action="Calendar" />
          <View style={styles.listCard}>
            {node.upcoming.map((u, i) => (
              <Pressable
                key={u.id}
                onPress={u.id === 'am-lsu' ? () => router.push('/gameday') : undefined}
                style={[styles.upRow, i > 0 && styles.upDivider]}>
                <DateBadge month={u.badge.month} day={u.badge.day} tone={i === 0 ? 'maroon' : 'light'} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.upTitle} numberOfLines={1}>
                    {u.title}
                  </Text>
                  <Text style={styles.upWhen}>{u.when}</Text>
                </View>
                <View style={styles.going}>
                  <Text style={styles.goingValue}>{u.going}</Text>
                  <Text style={styles.goingLabel}>going</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <View style={{ height: 26 }} />
          <SectionHeader title="Inside this venue" />
          <View style={styles.insideGrid}>
            {node.inside.map((s) => {
              const Icon = INSIDE_ICONS[s.icon];
              return (
                <View key={s.label} style={styles.insideTile}>
                  <View style={styles.insideIcon}>
                    <Icon size={20} color={colors.maroon} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.insideLabel}>{s.label}</Text>
                    <Text style={styles.insideDetail}>{s.detail}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{ height: 26 }} />
          <SectionHeader title="Where this fits" />
          <View style={styles.treeCard}>
            <TreeRow color={colors.maroon} title={node.parent.name} sub="University node" />
            <TreeRow color={colors.maroon} title={`${node.module} module`} sub="All sports · one destination" indent={1} />
            <TreeRow
              color={colors.gold}
              title={node.name}
              sub={`${node.upcoming.length} events this month · you are here`}
              indent={2}
              active
              last
            />
            <View style={styles.nearbyRow}>
              {node.nearby.map((n) => (
                <View key={n.name} style={[styles.nearbyChip, { borderColor: nodeColors[n.node].soft }]}>
                  <NodeTag node={n.node} label={n.name} />
                  <Text style={styles.nearbyDetail}>{n.detail}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <StackTabBar active="map" />
    </View>
  );
}

function TreeRow({
  color,
  title,
  sub,
  indent = 0,
  active,
  last,
}: {
  color: string;
  title: string;
  sub: string;
  indent?: number;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <View style={[styles.treeRow, { paddingLeft: indent * 22 }]}>
      <View style={styles.treeRail}>
        <View style={[styles.treeNode, { backgroundColor: color }, active && styles.treeNodeActive]} />
        {!last && <View style={styles.treeLine} />}
      </View>
      <View style={{ flex: 1, paddingBottom: last ? 0 : 14 }}>
        <Text style={[styles.treeTitle, active && { color: colors.maroon }]}>{title}</Text>
        <Text style={styles.treeSub}>{sub}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { height: 318, justifyContent: 'space-between' },
  heroNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 2 },
  glassBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBody: { paddingHorizontal: 20, paddingBottom: 44, marginTop: 'auto' },
  crumbs: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  crumb: { fontFamily: fonts.semibold, fontSize: 12, color: 'rgba(255,255,255,0.78)' },
  name: { fontFamily: fonts.displayHeavy, fontSize: 44, color: '#FFFFFF', letterSpacing: 0.2, marginTop: 2 },
  factsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.gold,
    borderRadius: 999,
    paddingHorizontal: 10,
    height: 26,
  },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.maroon },
  statusText: { fontFamily: fonts.bold, fontSize: 12, color: colors.maroonInk },
  facts: { fontFamily: fonts.medium, fontSize: 12.5, color: 'rgba(255,255,255,0.8)', flexShrink: 1 },

  sheet: { marginTop: -26, backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: 16 },
  pulse: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingVertical: 14,
  },
  pulseItem: { flex: 1, alignItems: 'center' },
  pulseDivider: { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: colors.line },
  pulseValue: { fontFamily: fonts.displayHeavy, fontSize: 24, color: colors.ink },
  pulseLabel: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.ink3, marginTop: -1 },

  liveCard: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  livePhoto: { height: 118, justifyContent: 'flex-end', padding: 12 },
  liveMeta: { fontFamily: fonts.bold, fontSize: 13, color: '#FFFFFF' },
  liveBody: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  liveTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, letterSpacing: -0.3 },
  liveDetail: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink2, marginTop: 2 },

  listCard: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 14,
  },
  upRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  upDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  upTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.ink, letterSpacing: -0.3 },
  upWhen: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink2, marginTop: 2 },
  going: { alignItems: 'flex-end' },
  goingValue: { fontFamily: fonts.bold, fontSize: 14, color: colors.maroon },
  goingLabel: { fontFamily: fonts.medium, fontSize: 11, color: colors.ink3 },

  insideGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 },
  insideTile: {
    width: '48.8%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  insideIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.maroonSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideLabel: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.ink },
  insideDetail: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.ok, marginTop: 1 },

  treeCard: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    padding: 16,
  },
  treeRow: { flexDirection: 'row', gap: 12 },
  treeRail: { alignItems: 'center', width: 14 },
  treeNode: { width: 12, height: 12, borderRadius: 6, marginTop: 3 },
  treeNodeActive: { width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: colors.maroon },
  treeLine: { flex: 1, width: 2, backgroundColor: colors.maroonLine, marginTop: 3 },
  treeTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink, letterSpacing: -0.2 },
  treeSub: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink3, marginTop: 1 },
  nearbyRow: { marginTop: 16, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line, gap: 8 },
  nearbyChip: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nearbyDetail: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink3 },
});
