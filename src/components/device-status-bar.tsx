import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';

import { fonts } from '@/theme';

type Props = { tone?: 'light' | 'dark' };

// On device we defer to the real status bar and only reserve its height.
// On web (the canvas preview) we draw an iOS 9:41 bar so frames read as
// screenshots from a shipped app.
export function DeviceStatusBar({ tone = 'light' }: Props) {
  const insets = useSafeAreaInsets();
  const ink = tone === 'light' ? '#FFFFFF' : '#111111';

  if (Platform.OS !== 'web') {
    return (
      <View style={{ height: insets.top }}>
        <StatusBar style={tone === 'light' ? 'light' : 'dark'} />
      </View>
    );
  }

  return (
    <View style={styles.bar}>
      <Text style={[styles.time, { color: ink }]}>9:41</Text>
      <View style={styles.right}>
        <Svg width={18} height={12} viewBox="0 0 18 12">
          <Rect x={0} y={8} width={3} height={4} rx={1} fill={ink} />
          <Rect x={5} y={5.5} width={3} height={6.5} rx={1} fill={ink} />
          <Rect x={10} y={3} width={3} height={9} rx={1} fill={ink} />
          <Rect x={15} y={0} width={3} height={12} rx={1} fill={ink} />
        </Svg>
        <Svg width={16} height={12} viewBox="0 0 16 12">
          <Path
            d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3C13.3 1.6 10.8.6 8 .6S2.7 1.6.8 3.5L2 4.8c1.6-1.5 3.7-2.4 6-2.4Zm0 3.5c1.3 0 2.5.5 3.5 1.4l1.2-1.3C11.4 4.8 9.8 4.1 8 4.1s-3.4.7-4.7 1.9l1.2 1.3C5.5 6.4 6.7 5.9 8 5.9Zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.5l1.5-1.6c-.4-.4-.9-.6-1.5-.6Z"
            fill={ink}
          />
        </Svg>
        <Svg width={27} height={13} viewBox="0 0 27 13">
          <Rect x={0.5} y={0.5} width={23} height={12} rx={3.5} stroke={ink} strokeOpacity={0.4} fill="none" />
          <Rect x={2} y={2} width={20} height={9} rx={2} fill={ink} />
          <Path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill={ink} fillOpacity={0.45} />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 50,
    paddingHorizontal: 30,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  time: { fontFamily: fonts.semibold, fontSize: 16, letterSpacing: -0.2, width: 54, textAlign: 'center' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 3 },
});
