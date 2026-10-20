import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState, type ComponentType } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

type IconType = ComponentType<{ size?: number; color?: string }>;

const FIELDS: { icon: IconType; label: string; value: string }[] = [
  { icon: I.CalendarOutline, label: 'When', value: 'Sat, Oct 24 · 7:00 PM' },
  { icon: I.MapPointOutline, label: 'Where', value: 'Grand Station Entertainment' },
  { icon: I.UsersGroupRoundedOutline, label: 'Who', value: 'Aggie Bowling Club' },
];

const VISIBILITY = ['Friends', 'Aggies', 'Public'];

export default function QuietCreate() {
  const [visibility, setVisibility] = useState('Aggies');
  return (
    <View style={styles.screen}>
      <DeviceStatusBar tone="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.navigate('/v2'))} style={styles.iconBtn}>
          <I.CloseOutline size={20} color={quiet.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>New event</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View style={styles.cover}>
          <Image source={photos.bowling} style={StyleSheet.absoluteFill} contentFit="cover" />
          <View style={styles.coverBtn}>
            <I.GalleryEditOutline size={16} color="#FFFFFF" />
            <Text style={styles.coverBtnText}>Change</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Bowling league kickoff</Text>
          <Text style={styles.subtitle}>Add a description</Text>

          <View style={styles.fields}>
            {FIELDS.map((f, i) => (
              <View key={f.label} style={[styles.field, i > 0 && styles.fieldRule]}>
                <f.icon size={21} color={quiet.ink} />
                <Text style={styles.fieldLabel}>{f.label}</Text>
                <Text style={styles.fieldValue} numberOfLines={1}>
                  {f.value}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Who can see it</Text>
          <View style={styles.segment}>
            {VISIBILITY.map((v) => {
              const on = v === visibility;
              return (
                <Pressable key={v} onPress={() => setVisibility(v)} style={[styles.segItem, on && styles.segOn]}>
                  <Text style={[styles.segText, on && styles.segTextOn]}>{v}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push('/v2/posted')} style={styles.cta}>
          <Text style={styles.ctaText}>Post event</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 6 },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontFamily: fonts.semibold, fontSize: 16, color: quiet.ink, letterSpacing: -0.3 },
  cover: { marginHorizontal: 20, marginTop: 18, height: 200, borderRadius: 28, overflow: 'hidden', backgroundColor: quiet.sunk },
  coverBtn: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coverBtnText: { fontFamily: fonts.medium, fontSize: 13, color: '#FFFFFF' },
  body: { paddingHorizontal: 24, paddingTop: 24 },
  title: { fontFamily: fonts.bold, fontSize: 28, color: quiet.ink, letterSpacing: -1 },
  subtitle: { fontFamily: fonts.regular, fontSize: 15, color: quiet.ink3, marginTop: 6 },
  fields: {
    marginTop: 24,
    borderRadius: 24,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    paddingHorizontal: 18,
  },
  field: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 58 },
  fieldRule: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: quiet.hair },
  fieldLabel: { width: 52, fontFamily: fonts.regular, fontSize: 14.5, color: quiet.ink3 },
  fieldValue: { flex: 1, fontFamily: fonts.medium, fontSize: 15, color: quiet.ink, letterSpacing: -0.2 },
  label: { fontFamily: fonts.medium, fontSize: 13.5, color: quiet.ink3, marginTop: 26, marginBottom: 10 },
  segment: { flexDirection: 'row', padding: 4, borderRadius: 999, backgroundColor: quiet.sunk },
  segItem: { flex: 1, height: 40, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  segOn: { backgroundColor: quiet.surface },
  segText: { fontFamily: fonts.medium, fontSize: 14, color: quiet.ink2 },
  segTextOn: { color: quiet.ink, fontFamily: fonts.semibold },
  footer: { position: 'absolute', left: 20, right: 20, bottom: 34 },
  cta: { height: 56, borderRadius: 999, backgroundColor: quiet.accent, alignItems: 'center', justifyContent: 'center' },
  ctaText: { fontFamily: fonts.semibold, fontSize: 16, color: '#FFFFFF', letterSpacing: -0.2 },
});
