import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { QrCode } from '@/components/qr-code';
import { passQr } from '@/data/pass-qr';
import { photos } from '@/data/photos';
import { fonts, quiet } from '@/theme';

const SEAT = [
  { label: 'Section', value: '125' },
  { label: 'Row', value: '22' },
  { label: 'Seat', value: '14' },
  { label: 'Gate', value: '6' },
];

// Gameday collapses to the one thing you need at the stadium: your pass.
export default function QuietTicket() {
  return (
    <View style={styles.screen}>
      <DeviceStatusBar tone="light" />
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Kickoff in 8h 12m</Text>
          <Text style={styles.title}>Your pass</Text>
        </View>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.navigate('/v2'))} style={styles.close}>
          <I.CloseOutline size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.pass}>
        <View style={styles.passPhoto}>
          <Image source={photos.kyleFieldNight} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={StyleSheet.absoluteFill} />
          <View style={styles.passPhotoBody}>
            <Text style={styles.passTitle}>Texas A&M vs LSU</Text>
            <Text style={styles.passMeta}>Tonight · 6:00 PM · Kyle Field</Text>
          </View>
        </View>

        <View style={styles.seats}>
          {SEAT.map((s) => (
            <View key={s.label} style={{ flex: 1 }}>
              <Text style={styles.seatLabel}>{s.label}</Text>
              <Text style={styles.seatValue}>{s.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.perf}>
          <View style={[styles.notch, { left: -12 }]} />
          <View style={styles.dash} />
          <View style={[styles.notch, { right: -12 }]} />
        </View>

        <View style={styles.qrWrap}>
          <QrCode rows={passQr} size={176} color={quiet.ink} />
          <Text style={styles.holder}>Jordan Lee · Student</Text>
        </View>
      </View>

      <View style={styles.wallet}>
        <I.WalletOutline size={18} color="#FFFFFF" />
        <Text style={styles.walletText}>Add to Wallet</Text>
      </View>

      <Text style={styles.hint}>Brightness goes up automatically at the gate.</Text>
      {Platform.OS === 'web' && <View style={styles.homeIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: quiet.night },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 18 },
  close: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: quiet.nightSurface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: quiet.nightHair,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kicker: { fontFamily: fonts.medium, fontSize: 14, color: 'rgba(255,255,255,0.5)' },
  title: { fontFamily: fonts.bold, fontSize: 32, color: '#FFFFFF', letterSpacing: -1.2, marginTop: 4 },

  pass: { marginHorizontal: 20, marginTop: 24, borderRadius: 28, backgroundColor: '#FFFFFF', overflow: 'hidden' },
  passPhoto: { height: 150, justifyContent: 'flex-end' },
  passPhotoBody: { padding: 18 },
  passTitle: { fontFamily: fonts.bold, fontSize: 22, color: '#FFFFFF', letterSpacing: -0.7 },
  passMeta: { fontFamily: fonts.medium, fontSize: 13, color: 'rgba(255,255,255,0.78)', marginTop: 3 },
  seats: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 18 },
  seatLabel: { fontFamily: fonts.medium, fontSize: 12, color: quiet.ink3 },
  seatValue: { fontFamily: fonts.bold, fontSize: 22, color: quiet.ink, letterSpacing: -0.6, marginTop: 2 },
  perf: { height: 34, justifyContent: 'center' },
  notch: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: quiet.night },
  dash: { marginHorizontal: 22, borderTopWidth: 1.5, borderStyle: 'dashed', borderColor: quiet.hair },
  qrWrap: { alignItems: 'center', paddingBottom: 20, marginTop: -6 },
  holder: { fontFamily: fonts.medium, fontSize: 13, color: quiet.ink2, marginTop: 2 },

  wallet: {
    marginHorizontal: 20,
    marginTop: 14,
    height: 54,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  walletText: { fontFamily: fonts.semibold, fontSize: 15.5, color: '#FFFFFF', letterSpacing: -0.2 },
  hint: { fontFamily: fonts.regular, fontSize: 12.5, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 16 },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
});
