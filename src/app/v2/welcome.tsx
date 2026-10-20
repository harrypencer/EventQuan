import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

export default function QuietWelcome() {
  return (
    <View style={styles.screen}>
      <Image source={photos.kyleFieldNight} style={StyleSheet.absoluteFill} contentFit="cover" />
      <LinearGradient
        colors={['rgba(12,10,10,0.15)', 'rgba(12,10,10,0.35)', 'rgba(12,10,10,0.96)']}
        locations={[0, 0.45, 0.82]}
        style={StyleSheet.absoluteFill}
      />
      <DeviceStatusBar tone="light" />
      <Text style={styles.wordmark}>EventQuan</Text>

      <View style={styles.bottom}>
        <Text style={styles.title}>Everything happening{'\n'}on campus.</Text>
        <Text style={styles.sub}>Classes, games and plans with friends — in one calm place.</Text>

        <Pressable onPress={() => router.push('/v2/campus')} style={styles.primary}>
          <I.LetterBold size={18} color={quiet.ink} />
          <Text style={styles.primaryText}>Continue with school email</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/v2')} style={styles.secondary}>
          <Text style={styles.secondaryText}>Sign in with Apple</Text>
        </Pressable>
        <Text style={styles.legal}>By continuing you agree to our Terms and Privacy Policy.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.night },
  wordmark: { fontFamily: fonts.semibold, fontSize: 17, color: '#FFFFFF', letterSpacing: -0.3, textAlign: 'center', marginTop: 14 },
  bottom: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 24, paddingBottom: 40 },
  title: { fontFamily: fonts.bold, fontSize: 36, lineHeight: 40, color: '#FFFFFF', letterSpacing: -1.4 },
  sub: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 23, color: 'rgba(255,255,255,0.66)', marginTop: 12, marginBottom: 32 },
  primary: {
    height: 56,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryText: { fontFamily: fonts.semibold, fontSize: 16, color: quiet.ink, letterSpacing: -0.2 },
  secondary: {
    height: 56,
    borderRadius: 999,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { fontFamily: fonts.semibold, fontSize: 16, color: '#FFFFFF', letterSpacing: -0.2 },
  legal: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 20 },
});
