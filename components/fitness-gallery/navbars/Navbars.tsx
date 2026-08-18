import { fitnessImages } from "../data";
import { FitMedia, NthMark } from "../Primitives";
import s from "../Fitness.module.css";

export function Navbar01() {
  return <header className={`${s.fitNav} ${s.fitNav01}`}><NthMark/><nav aria-label="Primary navigation"><a href="#cards">EQUIPMENT</a><a href="#cards">RUN</a><a href="#cards">TRAIN</a><a href="#stories">FIELD NOTES</a></nav><div><button type="button" aria-label="Search gear">SEARCH⌕</button><a href="#cards">KIT[02]</a></div><p>FREE DELIVERY OVER $120 <span>LIVE / TRAINING CONDITIONS: 18°C · 62% RH</span></p></header>;
}

export function Navbar02() {
  return <header className={`${s.fitNav} ${s.fitNav02}`}><FitMedia src={fitnessImages[0]} alt="Sprinter accelerating on a black track"/><div className={s.fitNavHud}><button type="button" className={s.hudMenu}>MENU<br/><small>04 SECTORS</small></button><NthMark inverse/><div><button type="button" aria-label="Search">⌕</button><a href="#cards">KIT 02</a></div></div><nav aria-label="Training categories"><a href="#cards"><span>01</span>RUN</a><a href="#cards"><span>02</span>LOAD</a><a href="#cards"><span>03</span>FUEL</a></nav></header>;
}

export function Navbar03() {
  return <header className={`${s.fitNav} ${s.fitNav03}`}><aside><NthMark inverse/><span>TRAINING SYSTEMS / 2026</span></aside><nav aria-label="Shop by training goal"><a href="#cards"><b>01</b><strong>FASTER</strong><small>Shoes · Sensors · Fuel</small></a><a href="#cards"><b>02</b><strong>STRONGER</strong><small>Load · Grip · Storage</small></a><a href="#cards"><b>03</b><strong>LONGER</strong><small>Hydration · Packs · Recovery</small></a></nav><div className={s.fitNav03Foot}><button type="button">OPEN SEARCH [ / ]</button><a href="#cards">ACCOUNT</a><a href="#cards">KIT 02 ↗</a></div></header>;
}

export function Navbar04() {
  return <header className={`${s.fitNav} ${s.fitNav04}`}><div className={s.searchFirst}><NthMark/><label><span>FIND YOUR NEXT SESSION</span><input type="search" placeholder="Search shoe, surface, load..."/><button type="button">↵</button></label><a href="#cards">KIT <b>02</b></a></div><div className={s.quickFilters}><span>QUICK START</span><a href="#cards">ROAD / TEMPO</a><a href="#cards">HOME / STRENGTH</a><a href="#cards">TRAIL / ULTRA</a><a href="#cards">RECOVERY / DAILY</a></div></header>;
}

export function Navbar05() {
  return <header className={`${s.fitNav} ${s.fitNav05}`}><div className={s.scoreRail}><span>WEEK 34</span><b>MOVE WELL / MOVE OFTEN</b><span>DROP 08:14:22</span></div><div className={s.moduleNav}><button type="button" aria-label="Open menu">[+]</button><NthMark inverse/><nav aria-label="Primary"><a href="#cards">SHOP_ALL</a><a href="#stories">SYSTEMS</a><a href="#reviews">PROOF</a></nav><div><button type="button">SEARCH</button><a href="#cards">KIT(2)</a></div></div><div className={s.sessionRail}><i/><span>SESSION 04 / LOWER POWER</span><a href="#cards">BUILD THIS KIT →</a></div></header>;
}
