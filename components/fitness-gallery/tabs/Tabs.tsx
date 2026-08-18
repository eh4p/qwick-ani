import { fitnessImages } from "../data";
import { FitTabs, type FitTab } from "../Primitives";
import s from "../Fitness.module.css";

const goals:FitTab[]=[
  {label:"SPEED",code:"G_01",title:"CUT THE WASTE.",copy:"Responsive footwear, short-ground-contact drills, and fuel calibrated for work above threshold.",image:fitnessImages[0],stat:"10.84 / 100M"},
  {label:"POWER",code:"G_02",title:"MOVE MORE LOAD.",copy:"Compact strength equipment and programs built around progressive intent, not random fatigue.",image:fitnessImages[1],stat:"32 KG / HAND"},
  {label:"ENDURANCE",code:"G_03",title:"STAY USEFUL LONGER.",copy:"Carry, hydration, and recovery systems tested after the easy hour is over.",image:fitnessImages[2],stat:"180 MIN / FIELD"},
  {label:"RESET",code:"G_04",title:"ADAPT BETWEEN SETS.",copy:"Low-friction tools for restoring range and returning ready instead of merely rested.",image:fitnessImages[7],stat:"10 MIN / DAILY"},
];
const surfaces:FitTab[]=[
  {label:"ROAD",code:"S_01",title:"VECTOR / TEMPO",copy:"Carbon-assisted turnover with enough ground feel for daily speed work.",image:fitnessImages[5],stat:"238G · 8MM"},
  {label:"TRAIL",code:"S_02",title:"RIDGE / 04",copy:"Wet-rock grip, protected toes, and a stable platform for long technical descents.",image:fitnessImages[2],stat:"4.5MM LUG"},
  {label:"GYM",code:"S_03",title:"GROUND / 02",copy:"A wide, low base that stays quiet under heavy compound work.",image:fitnessImages[1],stat:"4MM DROP"},
];

export function Tabs01(){return <section className={`${s.fitTabSection} ${s.fitTabs01}`}><header><span>TRAINING INTENT / SELECT 01</span><h2>START WITH<br/>THE OUTPUT.</h2></header><FitTabs items={goals} mode="bar"/></section>}
export function Tabs02(){return <section className={`${s.fitTabSection} ${s.fitTabs02}`}><aside><span>EQUIPMENT SYSTEMS</span><h2>THE WORK<br/>SETS THE KIT.</h2><p>Choose the session. We’ll narrow the shelf.</p></aside><FitTabs items={goals} mode="vertical"/></section>}
export function Tabs03(){return <section className={`${s.fitTabSection} ${s.fitTabs03}`}><header><span>FOOTWEAR / SURFACE SELECTOR</span><h2>WHERE ARE YOU WORKING?</h2></header><FitTabs items={surfaces} mode="tiles"/></section>}
export function Tabs04(){return <section className={`${s.fitTabSection} ${s.fitTabs04}`}><div className={s.specIntro}><span>PRODUCT FILE / ACTIVE</span><h2>READ THE<br/>SPEC.</h2></div><FitTabs items={goals.slice(0,3)} mode="spec"/></section>}
export function Tabs05(){const days=goals.map((item,index)=>({...item,label:["MON","WED","FRI","SUN"][index],code:`D_0${index+1}`,title:["LOWER POWER","TEMPO INTERVALS","UPPER STRENGTH","AEROBIC RESET"][index],stat:["42 MIN","54 MIN","38 MIN","65 MIN"][index]}));return <section className={`${s.fitTabSection} ${s.fitTabs05}`}><header><span>PROGRAM / FOUNDATIONAL 04</span><h2>THIS WEEK, ON PURPOSE.</h2></header><FitTabs items={days} mode="days"/></section>}
