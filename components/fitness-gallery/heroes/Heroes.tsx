import { fitnessImages } from "../data";
import { FitMedia } from "../Primitives";
import s from "../Fitness.module.css";

export function Hero01() {
  return <section className={`${s.fitHero} ${s.fitHero01}`}><FitMedia src={fitnessImages[0]} alt="Sprinter launching from starting blocks"/><div className={s.sprintGrid}/><p className={s.sprintMeta}>NTH/FORM RUNNING SYSTEM<br/>BLOCK 08 · SPEED</p><h2><span>NO</span><br/>WASTED<br/><i>MOTION.</i></h2><div className={s.sprintCta}><p>Equipment and programming designed around the work—not the pose.</p><a href="#cards">SHOP SPEED SYSTEM →</a><a href="#stories">SEE BLOCK 08</a></div><div className={s.sprintTime}>00:10.84</div></section>;
}

export function Hero02() {
  return <section className={`${s.fitHero} ${s.fitHero02}`}><div className={s.heroTechHead}><span>LOAD SYSTEM / ENGINEERED 04.26</span><p>32 KG RANGE · 1 KG INCREMENTS · 2.1 SEC CHANGE</p></div><div className={s.heroDumbbell}><FitMedia src={fitnessImages[4]} alt="Stack 32 adjustable dumbbells"/><span className={s.techPointA}>01 / STEEL SELECTOR</span><span className={s.techPointB}>02 / SILENT PLATE LOCK</span></div><div className={s.heroTechCopy}><h2>ONE PAIR.<br/><span>32 KILOS.</span></h2><p>Full strength-room range. Half a square metre of floor.</p><div><strong>$389 / PAIR</strong><a href="#cards">CONFIGURE STACK 32 +</a></div></div></section>;
}

export function Hero03() {
  const goals=[["01","BUILD POWER",fitnessImages[1]],["02","RUN FASTER",fitnessImages[0]],["03","GO LONG",fitnessImages[2]],["04","RESET WELL",fitnessImages[7]]];
  return <section className={`${s.fitHero} ${s.fitHero03}`}><header><span>SELECT TRAINING INTENT</span><h2>WHAT ARE YOU<br/>HERE TO CHANGE?</h2></header><div className={s.goalPanels}>{goals.map(([code,title,image])=><a href="#cards" key={code}><FitMedia src={image} alt=""/><span>{code}</span><h3>{title}</h3><i>↗</i></a>)}</div></section>;
}

export function Hero04() {
  return <section className={`${s.fitHero} ${s.fitHero04}`}><div className={s.hero04Type}><span>NTH/FORM FOOTWEAR 001</span><h2>THE ROAD<br/>DOESN’T<br/><i>CARE.</i></h2><p>Vector/01 returns energy without disconnecting you from the surface.</p><a href="#cards">SHOP VECTOR $168 ↗</a></div><div className={s.shoeDisc}><FitMedia src={fitnessImages[5]} alt="Electric lime Vector Carbon Trainer"/><span>8 MM DROP</span><span>238 G</span><span>RACE / TEMPO</span></div><div className={s.hero04Ticker}>CARBON PROPULSION · GRIP AT SPEED · 238G · CARBON PROPULSION · GRIP AT SPEED · 238G</div></section>;
}

export function Hero05() {
  return <section className={`${s.fitHero} ${s.fitHero05}`}><div className={s.swimImage}><FitMedia src={fitnessImages[3]} alt="Open-water swimmer moving through dark water"/><span>OPEN WATER / 05:42 AM</span></div><div className={s.swimData}><span>ENDURANCE FIELD SYSTEM</span><h2>STAY IN<br/>THE WORK.</h2><div className={s.dataWave}><i/><i/><i/><i/><i/><i/></div><dl><div><dt>180</dt><dd>MIN TARGET</dd></div><div><dt>900</dt><dd>MG SODIUM/H</dd></div><div><dt>04</dt><dd>FIELD TESTS</dd></div></dl><p>Fuel, layers, and recovery selected for long sessions without easy exits.</p><a href="#cards">BUILD ENDURANCE KIT →</a></div></section>;
}
