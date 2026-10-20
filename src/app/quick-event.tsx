import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, type ComponentType } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DeviceStatusBar } from '@/components/device-status-bar';
import * as I from '@/components/icons';
import { AvatarStack, NodeTag, PillButton } from '@/components/ui';
import { photos } from '@/data/photos';
import { colors, fonts } from '@/theme';

type IconType = ComponentType<{ size?: number; color?: string }>;

const TEMPLATES: { key: string; label: string; icon: IconType; title: string; photo: (typeof photos)[keyof typeof photos] }[] = [
  { key: 'bowling', label: 'Bowling night', icon: I.BowlingBold, title: 'Bowling league kickoff', photo: photos.bowling },
  { key: 'birthday', label: 'Birthday', icon: I.GiftBold, title: 'Maya’s 21st at Northgate', photo: photos.party },
  { key: 'golf', label: 'Golf outing', icon: I.GolfBold, title: 'Saturday nine at Traditions', photo: photos.golf },
  { key: 'watch', label: 'Watch party', icon: I.ClapperboardPlayBold, title: 'Away game watch party', photo: photos.crowd },
  { key: 'study', label: 'Study group', icon: I.BookBookmarkBold, title: 'ENGR 102 exam cram', photo: photos.library },
];

const VISIBILITY = ['Friends', 'Aggies', 'Public'] as const;

export default function QuickEventScreen() {
  const { state } = useLocalSearchParams<{ state?: string }>();
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [title, setTitle] = useState(TEMPLATES[0].title);
  const [visibility, setVisibility] = useState<(typeof VISIBILITY)[number]>('Aggies');
  const [posted, setPosted] = useState(state === 'posted');
  const [editing, setEditing] = useState(false);
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === 'web' ? 30 : Math.max(insets.bottom, 16);

  if (posted) return <Posted title={title} photo={template.photo} onDone={() => router.navigate('/events')} />;

  return (
    <View style={styles.screen}>
      <DeviceStatusBar tone="dark" />
      <View style={styles.header}>
        <Pressable style={styles.closeBtn} onPress={() => (router.canGoBack() ? router.back() : router.navigate('/'))}>
          <I.CloseOutline size={20} color={colors.ink} />
        </Pressable>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Quick Event</Text>
          <Text style={styles.headerSub}>Posting as Jordan Lee</Text>
        </View>
        <View style={styles.draft}>
          <Text style={styles.draftText}>Draft saved</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templates}>
          {TEMPLATES.map((t) => {
            const on = t.key === template.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => {
                  setTemplate(t);
                  setTitle(t.title);
                }}
                style={[styles.template, on && styles.templateOn]}>
                <t.icon size={17} color={on ? colors.gold : colors.maroon} />
                <Text style={[styles.templateText, on && { color: '#FFFFFF' }]}>{t.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.cover}>
          <Image source={template.photo} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
          <LinearGradient colors={['rgba(0,0,0,0.05)', 'rgba(20,4,4,0.85)']} style={StyleSheet.absoluteFill} />
          <View style={styles.coverTop}>
            <View style={styles.coverChip}>
              <I.GalleryEditBold size={14} color="#FFFFFF" />
              <Text style={styles.coverChipText}>Change cover</Text>
            </View>
          </View>
          {editing ? (
            <TextInput
              autoFocus
              value={title}
              onChangeText={setTitle}
              onBlur={() => setEditing(false)}
              placeholder="What are you planning?"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={[styles.titleText, styles.titleInput]}
            />
          ) : (
            <Pressable onPress={() => setEditing(true)} style={styles.titleRow}>
              <Text style={styles.titleText}>{title || 'What are you planning?'}</Text>
              <I.PenBold size={16} color="rgba(255,255,255,0.75)" />
            </Pressable>
          )}
          <Text style={styles.coverHost}>Hosted by Jordan Lee · Aggie Bowling Club</Text>
        </View>

        <View style={styles.details}>
          <DetailRow icon={I.CalendarBold} label="Sat, Oct 24 · 7:00 PM" hint="Suggested: no Aggie home game that night" />
          <DetailRow
            icon={I.MapPointBold}
            label="Grand Station Entertainment"
            hint="2400 Texas Ave S"
            extra={<NodeTag node="cstat" label="College Station" />}
          />
          <DetailRow
            icon={I.UsersGroupRoundedBold}
            label="Aggie Bowling Club"
            hint="24 members invited · 3 already said yes"
            extra={<AvatarStack count={4} size={22} />}
          />
          <DetailRow icon={I.ClockCircleBold} label="Repeats every Saturday" hint="It’s a league: we’ll remind everyone weekly" last />
        </View>

        <Text style={styles.label}>WHO CAN SEE THIS</Text>
        <View style={styles.segment}>
          {VISIBILITY.map((v) => (
            <Pressable key={v} onPress={() => setVisibility(v)} style={[styles.segItem, visibility === v && styles.segOn]}>
              <Text style={[styles.segText, visibility === v && styles.segTextOn]}>{v}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.segHint}>
          {visibility === 'Aggies'
            ? 'Shows in EventFinder for Texas A&M students near College Station.'
            : visibility === 'Friends'
              ? 'Only people you invite can see and join.'
              : 'Anyone in Bryan / College Station can find it.'}
        </Text>

        <View style={styles.extras}>
          {['+ RSVP limit', '+ Bring list', '+ Split cost', '+ Add co-host'].map((x) => (
            <View key={x} style={styles.extra}>
              <Text style={styles.extraText}>{x}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottomPad }]}>
        <PillButton
          label="Post Quick Event"
          size="lg"
          onPress={() => setPosted(true)}
          icon={<I.BoltBold size={18} color={colors.maroonInk} />}
        />
        <Text style={styles.footerHint}>Free · you can edit anything after it’s live</Text>
      </View>
    </View>
  );
}

function DetailRow({
  icon: Icon,
  label,
  hint,
  extra,
  last,
}: {
  icon: IconType;
  label: string;
  hint: string;
  extra?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <View style={[styles.detail, !last && styles.detailDivider]}>
      <View style={styles.detailIcon}>
        <Icon size={19} color={colors.maroon} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailHint}>{hint}</Text>
        {extra && <View style={{ marginTop: 5 }}>{extra}</View>}
      </View>
      <I.AltArrowRightOutline size={16} color={colors.ink3} />
    </View>
  );
}

function Posted({ title, photo, onDone }: { title: string; photo: (typeof photos)[keyof typeof photos]; onDone: () => void }) {
  return (
    <View style={[styles.screen, { backgroundColor: colors.maroon }]}>
      <DeviceStatusBar tone="light" />
      <View style={styles.postedBody}>
        <View style={styles.postedCheck}>
          <I.CheckCircleBold size={44} color={colors.maroonInk} />
        </View>
        <Text style={styles.postedTitle}>It’s live. Gig ’em!</Text>
        <Text style={styles.postedSub}>Two taps, done. 24 invites just went out to Aggie Bowling Club.</Text>

        <View style={styles.previewCard}>
          <View style={styles.previewPhoto}>
            <Image source={photo} style={StyleSheet.absoluteFill} contentFit="cover" />
          </View>
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={styles.previewCat}>QUICK EVENT · WEEKLY</Text>
            <Text style={styles.previewTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.previewMeta}>Sat · 7:00 PM · Grand Station</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
              <AvatarStack count={3} size={18} />
              <Text style={styles.previewGoing}>3 going · 21 invited</Text>
            </View>
          </View>
        </View>

        <View style={styles.linkPill}>
          <I.LinkBold size={16} color={colors.gold} />
          <Text style={styles.linkText}>eventquan.app/e/bowl-oct24</Text>
          <Text style={styles.linkCopy}>Copy</Text>
        </View>
      </View>
      <View style={styles.postedActions}>
        <PillButton label="Share to group chat" size="lg" icon={<I.ShareBold size={18} color={colors.maroonInk} />} />
        <PillButton label="See it in EventFinder" size="lg" tone="light" onPress={onDone} />
      </View>
    </View>
  );
}

const webInput = Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : null;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 10 },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, letterSpacing: -0.3 },
  headerSub: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.ink3, marginTop: 1 },
  draft: { height: 28, paddingHorizontal: 10, borderRadius: 999, backgroundColor: colors.lineSoft, justifyContent: 'center' },
  draftText: { fontFamily: fonts.semibold, fontSize: 11, color: colors.ink3 },

  templates: { paddingHorizontal: 16, gap: 8, paddingVertical: 6 },
  template: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  templateOn: { backgroundColor: colors.maroon, borderColor: colors.maroon },
  templateText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink },

  cover: {
    marginHorizontal: 16,
    marginTop: 10,
    height: 196,
    borderRadius: 26,
    overflow: 'hidden',
    padding: 16,
    justifyContent: 'flex-end',
  },
  coverTop: { position: 'absolute', top: 14, right: 14 },
  coverChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 30,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  coverChipText: { fontFamily: fonts.semibold, fontSize: 12, color: '#FFFFFF' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  titleText: { flexShrink: 1, fontFamily: fonts.heavy, fontSize: 27, lineHeight: 31, color: '#FFFFFF', letterSpacing: -0.8 },
  titleInput: { padding: 0, ...webInput },
  coverHost: { fontFamily: fonts.medium, fontSize: 12.5, color: 'rgba(255,255,255,0.78)', marginTop: 6 },

  details: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    paddingHorizontal: 14,
  },
  detail: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  detailDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  detailIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.maroonSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailLabel: { fontFamily: fonts.bold, fontSize: 14.5, color: colors.ink, letterSpacing: -0.2 },
  detailHint: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink3 },

  label: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.ink3,
    letterSpacing: 1.1,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  segment: { flexDirection: 'row', marginHorizontal: 16, backgroundColor: colors.lineSoft, borderRadius: 999, padding: 4 },
  segItem: { flex: 1, height: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  segOn: { backgroundColor: colors.card },
  segText: { fontFamily: fonts.semibold, fontSize: 13.5, color: colors.ink3 },
  segTextOn: { color: colors.maroon, fontFamily: fonts.bold },
  segHint: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink2, paddingHorizontal: 20, marginTop: 8 },

  extras: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, marginTop: 16 },
  extra: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  extraText: { fontFamily: fonts.semibold, fontSize: 12.5, color: colors.ink2 },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.bg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    gap: 8,
  },
  footerHint: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.ink3, textAlign: 'center' },

  postedBody: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' },
  postedCheck: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  postedTitle: { fontFamily: fonts.heavy, fontSize: 30, color: '#FFFFFF', letterSpacing: -0.9, marginTop: 22 },
  postedSub: {
    fontFamily: fonts.medium,
    fontSize: 14.5,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 300,
  },
  previewCard: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    marginTop: 28,
  },
  previewPhoto: { width: 76, height: 76, borderRadius: 16, overflow: 'hidden' },
  previewCat: { fontFamily: fonts.bold, fontSize: 10.5, color: colors.maroon, letterSpacing: 0.9 },
  previewTitle: { fontFamily: fonts.bold, fontSize: 15.5, color: colors.ink, letterSpacing: -0.3 },
  previewMeta: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink2 },
  previewGoing: { fontFamily: fonts.semibold, fontSize: 12, color: colors.ink2 },
  linkPill: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 46,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  linkText: { flex: 1, fontFamily: fonts.semibold, fontSize: 13.5, color: '#FFFFFF' },
  linkCopy: { fontFamily: fonts.bold, fontSize: 13, color: colors.gold },
  postedActions: { paddingHorizontal: 16, paddingBottom: 34, gap: 10 },
});
