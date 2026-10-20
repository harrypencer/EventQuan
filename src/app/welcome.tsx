import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { AggieMark, PillButton } from '@/components/ui';
import { photos } from '@/data/photos';
import { colors, fonts } from '@/theme';

const NODES = [
  { name: 'BRYAN', sub: 'City node', color: colors.bryan, photo: photos.academic },
  { name: 'TEXAS A&M', sub: 'University node', color: colors.maroon, photo: photos.kyleFieldNight },
  { name: 'COLLEGE STATION', sub: 'City node', color: colors.cstat, photo: photos.msc },
];

export default function WelcomeScreen() {
  const { step } = useLocalSearchParams<{ step?: string }>();
  const [current, setCurrent] = useState(step === 'campus' ? 'campus' : 'email');
  return current === 'campus' ? <CampusStep /> : <EmailStep onContinue={() => setCurrent('campus')} />;
}

function EmailStep({ onContinue }: { onContinue: () => void }) {
  const [email, setEmail] = useState('jordan.lee@tamu.edu');
  const isAggie = /@(email\.)?tamu\.edu$/i.test(email.trim());

  return (
    <View style={[styles.screen, { backgroundColor: colors.eqNavy }]}>
      <LinearGradient colors={['#0B1A33', '#10264A', '#0B1A33']} style={StyleSheet.absoluteFill} />
      <DeviceStatusBar tone="light" />
      <View style={styles.brandBlock}>
        <Text style={styles.wordmark}>
          EVENT<Text style={{ color: '#5AA9FF' }}>QUAN</Text>
        </Text>
        <Text style={styles.tagline}>PEOPLE · PLACES · EVENTS · TOGETHER</Text>
      </View>

      <View style={styles.nodes}>
        {NODES.map((n, i) => (
          <View key={n.name} style={[styles.nodeCard, i === 1 && styles.nodeCardMid]}>
            <Image source={n.photo} style={StyleSheet.absoluteFill} contentFit="cover" />
            <LinearGradient colors={['rgba(0,0,0,0)', n.color]} locations={[0.15, 0.85]} style={StyleSheet.absoluteFill} />
            <View style={styles.nodeLabel}>
              <Text style={styles.nodeName}>{n.name}</Text>
              <Text style={styles.nodeSub}>{n.sub}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.hero}>Discover.{'\n'}Experience. Belong.</Text>
      <Text style={styles.heroSub}>Every live event in Bryan / College Station, sliced to who you are.</Text>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Sign in with your school email</Text>
        <View style={[styles.input, isAggie && styles.inputOk]}>
          <I.LetterOutline size={19} color={colors.ink3} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@school.edu"
            placeholderTextColor={colors.ink3}
            style={styles.inputText}
          />
          {isAggie && <I.CheckCircleBold size={20} color={colors.ok} />}
        </View>

        {isAggie ? (
          <View style={styles.found}>
            <AggieMark size={44} />
            <View style={{ flex: 1 }}>
              <Text style={styles.foundEyebrow}>WE FOUND YOUR CAMPUS</Text>
              <Text style={styles.foundTitle}>Texas A&M University</Text>
              <Text style={styles.foundSub}>College Station, TX · Aggie skin ready</Text>
            </View>
            <View style={styles.swatches}>
              <View style={[styles.swatch, { backgroundColor: colors.maroon }]} />
              <View style={[styles.swatch, { backgroundColor: colors.gold, marginLeft: -6 }]} />
            </View>
          </View>
        ) : (
          <Text style={styles.hint}>We’ll match your email to your campus and set up your app for it.</Text>
        )}

        <PillButton label={isAggie ? 'Continue as an Aggie' : 'Continue'} size="lg" onPress={onContinue} />
        <View style={styles.altRow}>
          <PillButton label="Apple" size="md" tone="dark" style={{ flex: 1 }} />
          <PillButton
            label="NetID (SSO)"
            size="md"
            tone="ghost"
            icon={<I.ShieldUserBold size={17} color={colors.maroon} />}
            style={{ flex: 1.3 }}
          />
        </View>
        <Text style={styles.legal}>By continuing you agree to EventQuan’s Terms and Privacy Policy.</Text>
      </View>
    </View>
  );
}

const ROLES = [
  { key: 'student', title: 'Student', sub: 'Class of 2027 · College of Engineering', icon: I.SquareAcademicCapBold },
  { key: 'staff', title: 'Faculty & Staff', sub: 'Departments, meetings, campus services', icon: I.UserIdBold },
  { key: 'former', title: 'Former Student', sub: 'Reunions, Ring Day, gameday travel', icon: I.StarBold },
  { key: 'fan', title: 'Visitor & Fan', sub: 'Games, parking, hotels, Fan Guide', icon: I.TicketBold },
] as const;

const INTERESTS = [
  'Football',
  'Midnight Yell',
  'Career fairs',
  'Corps of Cadets',
  'Northgate',
  'Intramurals',
  'Free food',
  'Volleyball',
  'MSC Town Hall',
  'Study groups',
];

function CampusStep() {
  const [role, setRole] = useState<(typeof ROLES)[number]['key']>('student');
  const [picked, setPicked] = useState<string[]>(['Football', 'Midnight Yell', 'Career fairs', 'Free food']);

  return (
    <View style={[styles.screen, { backgroundColor: colors.maroon }]}>
      <LinearGradient colors={[colors.maroon, colors.maroonDeep]} style={StyleSheet.absoluteFill} />
      <DeviceStatusBar tone="light" />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.stepTop}>
          <View style={styles.progress}>
            <View style={[styles.progressSeg, styles.progressOn]} />
            <View style={[styles.progressSeg, styles.progressOn]} />
            <View style={styles.progressSeg} />
          </View>
          <Text style={styles.skip}>Skip</Text>
        </View>

        <View style={styles.skinBadge}>
          <AggieMark size={30} inverted />
          <Text style={styles.skinBadgeText}>Aggie skin applied</Text>
        </View>
        <Text style={styles.howdy}>Howdy, Jordan!</Text>
        <Text style={styles.howdySub}>You’re in at Texas A&M. Tell us how you’re here and we’ll shape what goes live for you.</Text>

        <View style={styles.roles}>
          {ROLES.map((r) => {
            const on = role === r.key;
            return (
              <Pressable key={r.key} onPress={() => setRole(r.key)} style={[styles.role, on && styles.roleOn]}>
                <View style={[styles.roleIcon, on && { backgroundColor: colors.maroon }]}>
                  <r.icon size={20} color={on ? colors.gold : '#FFFFFF'} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.roleTitle, on && { color: colors.ink }]}>{r.title}</Text>
                  <Text style={[styles.roleSub, on && { color: colors.ink2 }]}>{r.sub}</Text>
                </View>
                <View style={[styles.radio, on && styles.radioOn]}>{on && <View style={styles.radioDot} />}</View>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.pickTitle}>What should light up your feed?</Text>
        <View style={styles.interests}>
          {INTERESTS.map((i) => {
            const on = picked.includes(i);
            return (
              <Pressable
                key={i}
                onPress={() => setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                style={[styles.interest, on && styles.interestOn]}>
                {on && <I.CheckCircleBold size={15} color={colors.maroon} />}
                <Text style={[styles.interestText, on && { color: colors.maroonInk }]}>{i}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.campusFooter}>
        <PillButton label="Gig ’Em, let’s go" size="lg" onPress={() => router.replace('/')} />
        <Text style={styles.campusFooterHint}>Also following Bryan and College Station city nodes</Text>
      </View>
    </View>
  );
}

const webInput = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  brandBlock: { alignItems: 'center', marginTop: 14 },
  wordmark: { fontFamily: fonts.displayHeavy, fontSize: 34, color: '#FFFFFF', letterSpacing: 2.5 },
  tagline: { fontFamily: fonts.semibold, fontSize: 10, color: '#8FB4E3', letterSpacing: 3, marginTop: 2 },
  nodes: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 22, paddingHorizontal: 16 },
  nodeCard: { flex: 1, height: 132, borderRadius: 18, overflow: 'hidden', justifyContent: 'flex-end' },
  nodeCardMid: { height: 156, borderWidth: 2, borderColor: colors.gold },
  nodeLabel: { padding: 10 },
  nodeName: { fontFamily: fonts.displayHeavy, fontSize: 14, color: '#FFFFFF', letterSpacing: 0.6 },
  nodeSub: { fontFamily: fonts.medium, fontSize: 10, color: 'rgba(255,255,255,0.75)' },
  hero: { fontFamily: fonts.heavy, fontSize: 30, lineHeight: 34, color: '#FFFFFF', letterSpacing: -1, textAlign: 'center', marginTop: 22 },
  heroSub: {
    fontFamily: fonts.medium,
    fontSize: 13.5,
    color: '#A9BEDB',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 36,
    lineHeight: 19,
  },

  sheet: {
    marginTop: 'auto',
    backgroundColor: colors.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: Platform.OS === 'web' ? 30 : 34,
    gap: 12,
  },
  sheetTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink, letterSpacing: -0.3 },
  input: {
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  inputOk: { borderColor: colors.ok },
  inputText: { flex: 1, height: 50, fontFamily: fonts.semibold, fontSize: 15, color: colors.ink, padding: 0, ...webInput },
  hint: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink2 },
  found: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 20,
    backgroundColor: colors.maroonSoft,
    borderWidth: 1,
    borderColor: colors.maroonLine,
  },
  foundEyebrow: { fontFamily: fonts.bold, fontSize: 10, color: colors.maroon, letterSpacing: 1.1 },
  foundTitle: { fontFamily: fonts.bold, fontSize: 15.5, color: colors.ink, letterSpacing: -0.3, marginTop: 1 },
  foundSub: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink2, marginTop: 1 },
  swatches: { flexDirection: 'row' },
  swatch: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.maroonSoft },
  altRow: { flexDirection: 'row', gap: 8 },
  legal: { fontFamily: fonts.medium, fontSize: 11, color: colors.ink3, textAlign: 'center' },

  stepTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 6 },
  progress: { flexDirection: 'row', gap: 6 },
  progressSeg: { width: 34, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.22)' },
  progressOn: { backgroundColor: colors.gold },
  skip: { fontFamily: fonts.semibold, fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  skinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 26,
    paddingLeft: 4,
    paddingRight: 12,
    height: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  skinBadgeText: { fontFamily: fonts.semibold, fontSize: 12.5, color: '#FFFFFF' },
  howdy: { fontFamily: fonts.heavy, fontSize: 34, color: '#FFFFFF', letterSpacing: -1.1, paddingHorizontal: 20, marginTop: 14 },
  howdySub: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.75)',
    paddingHorizontal: 20,
    marginTop: 6,
  },
  roles: { paddingHorizontal: 16, marginTop: 20, gap: 8 },
  role: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  roleOn: { backgroundColor: '#FFFFFF', borderColor: colors.gold, borderWidth: 2 },
  roleIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: { fontFamily: fonts.bold, fontSize: 15, color: '#FFFFFF', letterSpacing: -0.2 },
  roleSub: { fontFamily: fonts.medium, fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 1 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.maroon },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.maroon },
  pickTitle: { fontFamily: fonts.bold, fontSize: 16, color: '#FFFFFF', paddingHorizontal: 20, marginTop: 24, letterSpacing: -0.3 },
  interests: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, marginTop: 12 },
  interest: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  interestOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  interestText: { fontFamily: fonts.semibold, fontSize: 13, color: '#FFFFFF' },
  campusFooter: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: Platform.OS === 'web' ? 30 : 34, gap: 8 },
  campusFooterHint: { fontFamily: fonts.medium, fontSize: 11.5, color: 'rgba(255,255,255,0.6)', textAlign: 'center' },
});
