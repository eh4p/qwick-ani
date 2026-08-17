import { images } from "../data";
import { TabSwitcher, type TabItem } from "../Primitives";
import s from "../Gallery.module.css";

const collectionTabs: TabItem[] = [
  { label: "New", eyebrow: "JUST POURED", title: "The Lucent Pair", copy: "A two-step barrier ritual for luminous, even-tempered skin.", image: images[7], meta: "2 formulas · $128" },
  { label: "Skin", eyebrow: "BARRIER FIRST", title: "Daily Reparative Care", copy: "Ceramides, ectoin, and calming lipids in sensorial, layerable textures.", image: images[1], meta: "9 formulas" },
  { label: "Color", eyebrow: "PIGMENT + PLAY", title: "Color That Stays Close", copy: "Satin pigments and sheer minerals that move with the face.", image: images[2], meta: "12 shades" },
  { label: "Night", eyebrow: "AFTER DARK", title: "The Nocturne Ritual", copy: "Regenerative oils and soft occlusives for the sleeping hours.", image: images[10], meta: "4 formulas" },
];

const moodTabs: TabItem[] = [
  { label: "Quiet", title: "For reactive days", copy: "A three-piece ritual that reduces sensory load and supports a stressed barrier.", image: images[0], meta: "Soothe · Support · Seal" },
  { label: "Luminous", title: "For low-light skin", copy: "Gentle resurfacing and light-catching mineral care without the burn.", image: images[11], meta: "Polish · Treat · Reflect" },
  { label: "Rested", title: "For the morning after", copy: "Cooling hydration and adaptive tint to make eight hours out of five.", image: images[3], meta: "Cool · Flood · Veil" },
];

export function Tabs01() { return <section className={`${s.tabs} ${s.tabs01}`}><header><span>SHOP THE HOUSE</span><h2>An edit for every surface.</h2></header><TabSwitcher items={collectionTabs} variant="line"/></section>; }
export function Tabs02() { return <section className={`${s.tabs} ${s.tabs02}`}><span className={s.tabsSide}>DISCOVER / 04</span><TabSwitcher items={moodTabs} variant="display"/></section>; }
export function Tabs03() { return <section className={`${s.tabs} ${s.tabs03}`}><header><span>CHOOSE A TEXTURE</span><h2>Start with what you want to feel.</h2></header><TabSwitcher items={collectionTabs.slice(0,3)} variant="image"/></section>; }
export function Tabs04() { return <section className={`${s.tabs} ${s.tabs04}`}><div className={s.tabs04Intro}><span>FORMULA INDEX</span><h2>Everything<br/>in its place.</h2><p>Browse the archive by ritual, finish, or hour.</p></div><TabSwitcher items={collectionTabs} variant="vertical"/></section>; }
export function Tabs05() { return <section className={`${s.tabs} ${s.tabs05}`}><div className={s.tabs05Marquee}>SHOP BY STATE · SHOP BY STATE · SHOP BY STATE</div><TabSwitcher items={moodTabs} variant="rail"/></section>; }
