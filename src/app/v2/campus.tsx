import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

const ROLES = [
  { key: 'student', label: 'Student', sub: 'Class of 2027' },
  { key: 'staff', label: 'Faculty or staff', sub: 'Departments and meetings' },
  { key: 'alum', label: 'Former student', sub: 'Reunions and gamedays' },
  { key: 'visitor', label: 'Visitor', sub: 'Games, parking and hotels' },
];

// Step two of sign-in: confirm the campus we matched from the email, pick a role.
export default function QuietCampus() {
  const [role, setRole] = useState('student');
  return (
    <View style={styles.screen}>
      <DeviceStatusBar tone="dark" />
      <View style={styles.progress}>
        <View style={[styles.step, styles.stepOn]} />
        <View style={[styles.step, styles.stepOn]} />
        <View style={styles.step} />
      </View>

      <View style={styles.body}>
        <View style={styles.campus}>
          <Image source={photos.msc} style={styles.campusPhoto} contentFit="cover" />
          <View style={{ flex: 1 }}>
            <Text style={styles.campusName}>Texas A&M University</Text>
            <Text style={styles.campusSub}>College Station, TX</Text>
          </View>
          <I.CheckCircleBold size={22} color={quiet.accent} />
        </View>

        <Text style={styles.title}>Howdy, Jordan.{'\n'}How are you here?</Text>
        <Text style={styles.sub}>We’ll shape your feed around it. You can change this any time.</Text>

        <View style={styles.roles}>
          {ROLES.map((r) => {
            const on = r.key === role;
            return (
              <Pressable key={r.key} onPress={() => setRole(r.key)} style={[styles.role, on && styles.roleOn]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.roleLabel}>{r.label}</Text>
                  <Text style={styles.roleSub}>{r.sub}</Text>
                </View>
                <View style={[styles.radio, on && styles.radioOn]}>{on && <View style={styles.radioDot} />}</View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push('/v2')} style={styles.cta}>
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.paper },
  progress: { flexDirection: 'row', gap: 6, paddingHorizontal: 24, marginTop: 10 },
  step: { flex: 1, height: 3, borderRadius: 2, backgroundColor: quiet.hair },
  stepOn: { backgroundColor: quiet.ink },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 28 },
  campus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    paddingRight: 16,
    borderRadius: 999,
    backgroundColor: quiet.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.hair,
    alignSelf: 'flex-start',
  },
  campusPhoto: { width: 40, height: 40, borderRadius: 20 },
  campusName: { fontFamily: fonts.semibold, fontSize: 14.5, color: quiet.ink, letterSpacing: -0.2 },
  campusSub: { fontFamily: fonts.regular, fontSize: 12.5, color: quiet.ink3 },
  title: { fontFamily: fonts.bold, fontSize: 32, lineHeight: 36, color: quiet.ink, letterSpacing: -1.2, marginTop: 28 },
  sub: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22, color: quiet.ink2, marginTop: 10 },
  roles: { marginTop: 28, gap: 10 },
  role: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 68,
    borderRadius: 22,
    backgroundColor: quiet.surface,
    borderWidth: 1,
    borderColor: quiet.hair,
  },
  roleOn: { borderColor: quiet.ink },
  roleLabel: { fontFamily: fonts.semibold, fontSize: 15.5, color: quiet.ink, letterSpacing: -0.3 },
  roleSub: { fontFamily: fonts.regular, fontSize: 13, color: quiet.ink3, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: quiet.ink3, alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: quiet.ink },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: quiet.ink },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
  cta: { height: 56, borderRadius: 999, backgroundColor: quiet.ink, alignItems: 'center', justifyContent: 'center' },
  ctaText: { fontFamily: fonts.semibold, fontSize: 16, color: '#FFFFFF', letterSpacing: -0.2 },
});
