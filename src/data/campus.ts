import type { ImageProps } from 'expo-image';

import { photos } from '@/data/photos';
import type { NodeKey } from '@/theme';

type Photo = ImageProps['source'];

export type EventCategory = 'Athletics' | 'Student Life' | 'Academic' | 'Traditions';

export type CampusEvent = {
  id: string;
  title: string;
  category: EventCategory;
  when: string;
  dateBadge?: { month: string; day: string };
  venue: string;
  nodeId?: string;
  attending: string;
  photo: Photo;
  live?: boolean;
  opponent?: 'LSU';
  href: '/gameday' | `/node/${string}`;
};

export const todayEvents: CampusEvent[] = [
  {
    id: 'am-lsu',
    title: 'Texas A&M vs LSU',
    category: 'Athletics',
    when: '6:00 PM',
    venue: 'Kyle Field',
    nodeId: 'kyle-field',
    attending: '125K attending',
    photo: photos.football,
    live: true,
    opponent: 'LSU',
    href: '/gameday',
  },
  {
    id: 'msc-open-house',
    title: 'MSC Open House',
    category: 'Student Life',
    when: '11:00 AM – 3:00 PM',
    venue: 'Memorial Student Center',
    nodeId: 'msc',
    attending: '3.4K going',
    photo: photos.orgMeeting,
    href: '/node/msc',
  },
  {
    id: 'corps-march-in',
    title: 'Corps March-In',
    category: 'Traditions',
    when: '4:15 PM',
    venue: 'Quad → Kyle Field',
    nodeId: 'kyle-field',
    attending: 'Open to public',
    photo: photos.stadiumCrowd,
    href: '/node/kyle-field',
  },
];

export const weekEvents: CampusEvent[] = [
  {
    id: 'career-fair',
    title: 'Engineering Career Fair',
    category: 'Academic',
    when: 'Thu · 10:00 AM',
    dateBadge: { month: 'OCT', day: '22' },
    venue: 'Zachry Engineering Center',
    nodeId: 'zachry',
    attending: '2.1K going',
    photo: photos.careerFair,
    href: '/node/zachry',
  },
  {
    id: 'midnight-yell',
    title: 'Midnight Yell Practice',
    category: 'Traditions',
    when: 'Fri · 11:59 PM',
    dateBadge: { month: 'OCT', day: '23' },
    venue: 'Kyle Field',
    nodeId: 'kyle-field',
    attending: '18K going',
    photo: photos.yell,
    href: '/node/kyle-field',
  },
  {
    id: 'volleyball',
    title: 'Aggie Volleyball vs Florida',
    category: 'Athletics',
    when: 'Sat · 1:00 PM',
    dateBadge: { month: 'OCT', day: '24' },
    venue: 'Reed Arena',
    nodeId: 'reed-arena',
    attending: '4.8K going',
    photo: photos.reedArena,
    href: '/node/reed-arena',
  },
  {
    id: 'ring-day',
    title: 'Aggie Ring Day',
    category: 'Traditions',
    when: 'Sat · 9:00 AM',
    dateBadge: { month: 'OCT', day: '24' },
    venue: 'Clayton W. Williams Jr. Alumni Center',
    attending: '6.2K going',
    photo: photos.grad,
    href: '/node/msc',
  },
];

export type CampusNode = {
  id: string;
  name: string;
  kind: string;
  facts: string[];
  photo: Photo;
  parent: { name: string; node: NodeKey };
  module: string;
  status: { label: string; open: boolean };
  liveNow: { title: string; detail: string; meta: string; cta: string; photo: Photo };
  pulse: { label: string; value: string }[];
  upcoming: { id: string; title: string; when: string; badge: { month: string; day: string }; going: string; photo: Photo }[];
  inside: { label: string; detail: string; icon: 'food' | 'restroom' | 'aid' | 'help' | 'seat' | 'shop' | 'study' | 'wifi' }[];
  nearby: { name: string; node: NodeKey; detail: string }[];
};

export const nodes: Record<string, CampusNode> = {
  'kyle-field': {
    id: 'kyle-field',
    name: 'Kyle Field',
    kind: 'Stadium',
    facts: ['102,733 seats', 'Home of the 12th Man'],
    photo: photos.kyleFieldNight,
    parent: { name: 'Texas A&M University', node: 'tamu' },
    module: 'Athletics',
    status: { label: 'Gates open 4:00 PM', open: true },
    liveNow: {
      title: 'Tailgate Zone is filling up',
      detail: 'Lot 61 · Live music on the Wiley stage',
      meta: '4.2K here now',
      cta: 'Navigate',
      photo: photos.tailgate,
    },
    pulse: [
      { label: 'Here now', value: '11.8K' },
      { label: 'Gate 6 wait', value: '8 min' },
      { label: 'Kickoff', value: '6:00 PM' },
    ],
    upcoming: [
      {
        id: 'am-lsu',
        title: 'Texas A&M vs LSU',
        when: 'Today · 6:00 PM',
        badge: { month: 'OCT', day: '20' },
        going: '125K',
        photo: photos.football,
      },
      {
        id: 'yell',
        title: 'Midnight Yell Practice',
        when: 'Fri · 11:59 PM',
        badge: { month: 'OCT', day: '23' },
        going: '18K',
        photo: photos.yell,
      },
      {
        id: 'auburn',
        title: 'Texas A&M vs Auburn',
        when: 'Sat · 2:30 PM',
        badge: { month: 'NOV', day: '01' },
        going: '98K',
        photo: photos.stadiumCrowd,
      },
    ],
    inside: [
      { label: 'Concessions', detail: '14 open', icon: 'food' },
      { label: 'Restrooms', detail: 'Short lines', icon: 'restroom' },
      { label: 'First Aid', detail: 'Sec 112, 334', icon: 'aid' },
      { label: 'Guest Services', detail: 'Gate 1', icon: 'help' },
    ],
    nearby: [
      { name: 'Reed Arena', node: 'tamu', detail: '6 min walk' },
      { name: 'Northgate District', node: 'cstat', detail: '14 min walk' },
      { name: 'Downtown Bryan', node: 'bryan', detail: '11 min drive' },
    ],
  },
  msc: {
    id: 'msc',
    name: 'Memorial Student Center',
    kind: 'Student union',
    facts: ['Open until 11 PM', '2 min from you'],
    photo: photos.msc,
    parent: { name: 'Texas A&M University', node: 'tamu' },
    module: 'Student Life',
    status: { label: 'Open now', open: true },
    liveNow: {
      title: 'MSC Open House is on',
      detail: '400+ student orgs · Flag Room & Bethancourt',
      meta: '1.9K here now',
      cta: 'Get directions',
      photo: photos.orgMeeting,
    },
    pulse: [
      { label: 'Here now', value: '1.9K' },
      { label: 'Study seats', value: '64 free' },
      { label: 'Closes', value: '11 PM' },
    ],
    upcoming: [
      {
        id: 'open-house',
        title: 'MSC Open House',
        when: 'Today · until 3:00 PM',
        badge: { month: 'OCT', day: '20' },
        going: '3.4K',
        photo: photos.orgMeeting,
      },
      { id: 'ring', title: 'Aggie Ring Day', when: 'Sat · 9:00 AM', badge: { month: 'OCT', day: '24' }, going: '6.2K', photo: photos.grad },
      {
        id: 'concert',
        title: 'MSC Town Hall Concert',
        when: 'Oct 30 · 8:00 PM',
        badge: { month: 'OCT', day: '30' },
        going: '1.1K',
        photo: photos.concert,
      },
    ],
    inside: [
      { label: 'Dining', detail: '9 open', icon: 'food' },
      { label: 'Study rooms', detail: '12 free', icon: 'study' },
      { label: 'Bookstore', detail: 'Open', icon: 'shop' },
      { label: 'Info Desk', detail: 'Flag Room', icon: 'help' },
    ],
    nearby: [
      { name: 'Rudder Tower', node: 'tamu', detail: '1 min walk' },
      { name: 'Sbisa Dining Hall', node: 'tamu', detail: '7 min walk' },
      { name: 'Northgate District', node: 'cstat', detail: '9 min walk' },
    ],
  },
  zachry: {
    id: 'zachry',
    name: 'Zachry Engineering Center',
    kind: 'Academic building',
    facts: ['Open 6 AM – 2 AM', '5 min from you'],
    photo: photos.zachry,
    parent: { name: 'Texas A&M University', node: 'tamu' },
    module: 'Academics',
    status: { label: 'Open now', open: true },
    liveNow: {
      title: 'ENGR 102 starts in 12 min',
      detail: 'Room 244 · Dr. Rivera',
      meta: 'Your class',
      cta: 'Navigate',
      photo: photos.students,
    },
    pulse: [
      { label: 'Here now', value: '2.6K' },
      { label: 'Study seats', value: '38 free' },
      { label: 'Next class', value: '10:00 AM' },
    ],
    upcoming: [
      {
        id: 'career',
        title: 'Engineering Career Fair',
        when: 'Thu · 10:00 AM',
        badge: { month: 'OCT', day: '22' },
        going: '2.1K',
        photo: photos.careerFair,
      },
      {
        id: 'hack',
        title: 'TAMUhack Kickoff',
        when: 'Oct 31 · 6:00 PM',
        badge: { month: 'OCT', day: '31' },
        going: '740',
        photo: photos.conference,
      },
    ],
    inside: [
      { label: 'Study zones', detail: '38 seats', icon: 'study' },
      { label: 'Café', detail: 'Open', icon: 'food' },
      { label: 'Makerspace', detail: 'Till 10 PM', icon: 'seat' },
      { label: 'Wi-Fi', detail: 'TAMULink', icon: 'wifi' },
    ],
    nearby: [
      { name: 'Evans Library', node: 'tamu', detail: '4 min walk' },
      { name: 'MSC', node: 'tamu', detail: '6 min walk' },
      { name: 'Century Square', node: 'cstat', detail: '12 min walk' },
    ],
  },
  'reed-arena': {
    id: 'reed-arena',
    name: 'Reed Arena',
    kind: 'Arena',
    facts: ['12,989 seats', '6 min from Kyle Field'],
    photo: photos.reedArena,
    parent: { name: 'Texas A&M University', node: 'tamu' },
    module: 'Athletics',
    status: { label: 'Doors 12:00 PM Sat', open: false },
    liveNow: {
      title: 'Volleyball shootaround',
      detail: 'Open practice · Floor seats',
      meta: '310 here now',
      cta: 'Navigate',
      photo: photos.reedArena,
    },
    pulse: [
      { label: 'Here now', value: '310' },
      { label: 'Parking', value: 'Lot 97' },
      { label: 'Next event', value: 'Sat' },
    ],
    upcoming: [
      {
        id: 'vb',
        title: 'Aggie Volleyball vs Florida',
        when: 'Sat · 1:00 PM',
        badge: { month: 'OCT', day: '24' },
        going: '4.8K',
        photo: photos.reedArena,
      },
      {
        id: 'mbb',
        title: "Men's Basketball Tip-Off",
        when: 'Nov 6 · 7:00 PM',
        badge: { month: 'NOV', day: '06' },
        going: '9.3K',
        photo: photos.crowd,
      },
    ],
    inside: [
      { label: 'Concessions', detail: '6 stands', icon: 'food' },
      { label: 'Restrooms', detail: 'Each level', icon: 'restroom' },
      { label: 'First Aid', detail: 'Main concourse', icon: 'aid' },
      { label: 'Ticket Office', detail: 'East entry', icon: 'help' },
    ],
    nearby: [
      { name: 'Kyle Field', node: 'tamu', detail: '6 min walk' },
      { name: 'Wolf Pen Creek', node: 'cstat', detail: '8 min drive' },
      { name: 'Downtown Bryan', node: 'bryan', detail: '12 min drive' },
    ],
  },
};
