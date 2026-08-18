import { Cards01, Cards02, Cards03, Cards04, Cards05 } from "./cards/Cards";
import { Carousel01, Carousel02, Carousel03, Carousel04, Carousel05 } from "./carousels/Carousels";
import { Collage01, Collage02, Collage03, Collage04, Collage05 } from "./collages/Collages";
import { FAQ01, FAQ02, FAQ03, FAQ04, FAQ05 } from "./faqs/Faqs";
import { Footer01, Footer02, Footer03, Footer04, Footer05 } from "./footers/Footers";
import { Hero01, Hero02, Hero03, Hero04, Hero05 } from "./heroes/Heroes";
import { Navbar01, Navbar02, Navbar03, Navbar04, Navbar05 } from "./navbars/Navbars";
import { Newsletter01, Newsletter02, Newsletter03, Newsletter04, Newsletter05 } from "./newsletters/Newsletters";
import { Reviews01, Reviews02, Reviews03, Reviews04, Reviews05 } from "./reviews/Reviews";
import { Story01, Story02, Story03, Story04, Story05 } from "./stories/Stories";
import { Tabs01, Tabs02, Tabs03, Tabs04, Tabs05 } from "./tabs/Tabs";
import { fitnessSections } from "./data";
import s from "./Fitness.module.css";

const showroom=[
  {id:"navbars",title:"NAVBARS",note:"ENTRY / CONTROL / ORIENTATION",items:[["Command Strip",Navbar01],["Track HUD",Navbar02],["Goal Sectors",Navbar03],["Search Protocol",Navbar04],["Session Relay",Navbar05]]},
  {id:"heroes",title:"BANNERS / HEROES",note:"INTENT / IMPACT / ACTION",items:[["No Wasted Motion",Hero01],["Load Specification",Hero02],["Intent Selector",Hero03],["Road Doesn’t Care",Hero04],["Stay in the Work",Hero05]]},
  {id:"faqs",title:"FAQ",note:"SUPPORT / FIT / SERVICE",items:[["Field Manual",FAQ01],["Coach Desk",FAQ02],["Support Console",FAQ03],["The Long Set",FAQ04],["Diagnostic Paths",FAQ05]]},
  {id:"cards",title:"PRODUCT / COLLECTION CARDS",note:"GEAR / DATA / COMMERCE",items:[["Equipment Index",Cards01],["Shoe Configurator",Cards02],["6AM Supply Drop",Cards03],["Load Comparison",Cards04],["Session Stack",Cards05]]},
  {id:"footers",title:"FOOTERS",note:"CLOSE / CONNECT / CONTINUE",items:[["Massive Relay",Footer01],["Training Log",Footer02],["Field Store",Footer03],["Community Output",Footer04],["Show Up With a Plan",Footer05]]},
  {id:"collages",title:"MEDIA COLLAGE",note:"MOVEMENT / FIELD / SYSTEM",items:[["Motion Sequence",Collage01],["Equipment Blueprint",Collage02],["Ridge Report",Collage03],["05:45 Club",Collage04],["Choose the Field",Collage05]]},
  {id:"tabs",title:"TABS",note:"FILTER / COMPARE / DISCOVER",items:[["Output Bar",Tabs01],["System Timeline",Tabs02],["Surface Selector",Tabs03],["Active Spec",Tabs04],["Training Week",Tabs05]]},
  {id:"newsletters",title:"NEWSLETTER",note:"SIGNAL / DROP / MEMBERSHIP",items:[["14-Day Signal",Newsletter01],["Field Dispatch",Newsletter02],["Drop Clock",Newsletter03],["Field Club",Newsletter04],["Noise Cut",Newsletter05]]},
  {id:"reviews",title:"REVIEWS / TESTIMONIALS",note:"OUTPUT / CONTEXT / PROOF",items:[["Numbers After Novelty",Reviews01],["Training Logs",Reviews02],["Used Not Styled",Reviews03],["Eight-Week Case",Reviews04],["Proof Matrix",Reviews05]]},
  {id:"carousels",title:"SWIPER / CAROUSEL",note:"BROWSE / DRAG / MOVE",items:[["Equipment Rail",Carousel01],["Choose the Field",Carousel02],["Field Films",Carousel03],["Back to the Kit",Carousel04],["Athlete Logs",Carousel05]]},
  {id:"stories",title:"SIDE INFO / IMAGE + TEXT",note:"MATERIAL / METHOD / ORIGIN",items:[["Heat Map",Story01],["Useful Tool",Story02],["Shoe in Section",Story03],["Between Sessions",Story04],["Product Loop",Story05]]},
] as const;

export default function FitnessGallery(){return <main className={s.fitnessGallery} id="fitness-top"><header className={s.fitnessGalleryHead}><div className={s.headCode}><span>CG / 02</span><b>HEALTH + FITNESS</b><span>11 × 05</span></div><div className={s.headTitle}><h1>NTH<span>/</span>FORM</h1><p>FIFTY-FIVE COMPONENT SYSTEMS<br/>FOR THE WORK THAT CHANGES YOU.</p></div><div className={s.headStats}><div><strong>55</strong><span>COMPONENTS</span></div><div><strong>11</strong><span>CATEGORIES</span></div><a href="#navbars">ENTER INDEX ↓</a><a href="/beauty">VIEW BEAUTY LIBRARY ↗</a></div><div className={s.headSignal}>THE GALLERY IS THE PRODUCT / EACH SAMPLE STANDS ALONE / EDITION 02</div></header><nav className={s.fitnessIndex} aria-label="Component categories">{fitnessSections.map(([id,label],index)=><a href={`#${id}`} key={id}><span>{String(index+1).padStart(2,"0")}</span><b>{label}</b><i>↘</i></a>)}</nav>{showroom.map((section,sectionIndex)=><section className={s.fitGallerySection} id={section.id} key={section.id}><header className={s.fitCategoryHead}><span>{String(sectionIndex+1).padStart(2,"0")} / 11</span><h2>{section.title}</h2><p>{section.note}</p></header>{section.items.map(([name,Component],index)=><article className={s.fitSpecimen} key={name}><header className={s.fitSpecimenLabel}><span>{section.title} / {String(index+1).padStart(2,"0")}</span><strong>{name}</strong><a href="#fitness-top">INDEX ↑</a></header><div className={s.fitPreview}><Component/></div></article>)}</section>)}<footer className={s.galleryFinish}><span>CG / 02 · HEALTH + FITNESS</span><h2>55 SYSTEMS.<br/>ZERO REPEATS.</h2><div><a href="#fitness-top">BACK TO INDEX ↑</a><a href="/beauty">BEAUTY LIBRARY ↗</a></div></footer></main>}
