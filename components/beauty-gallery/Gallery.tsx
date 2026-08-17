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
import { gallerySections } from "./data";
import s from "./Gallery.module.css";

const gallery = [
  { id: "navbars", title: "Navbars", note: "Five ways into the house", items: [["Editorial Threshold", Navbar01], ["House Index", Navbar02], ["Split Signature", Navbar03], ["Ritual Ledger", Navbar04], ["Cinematic Overlay", Navbar05]] },
  { id: "heroes", title: "Banners / Heroes", note: "Campaign entry points", items: [["Luminous Architecture", Hero01], ["Night Garden", Hero02], ["Clinical Object", Hero03], ["Skin in Bloom", Hero04], ["State of Skin", Hero05]] },
  { id: "faqs", title: "FAQ", note: "Service, with a point of view", items: [["Knowledge Room", FAQ01], ["Numbered Service Notes", FAQ02], ["Formula Desk", FAQ03], ["Answer Cabinet", FAQ04], ["The Long Answer", FAQ05]] },
  { id: "cards", title: "Product / Collection Cards", note: "Merchandising systems", items: [["Quiet Shelf", Cards01], ["Color Study", Cards02], ["Second Light", Cards03], ["Layered Ritual", Cards04], ["Five-Minute Shelf", Cards05]] },
  { id: "footers", title: "Footers", note: "Last impressions", items: [["House Signature", Footer01], ["Letters First", Footer02], ["Open Laboratory", Footer03], ["Utility Ledger", Footer04], ["Community Shelf", Footer05]] },
  { id: "collages", title: "Media Collage", note: "Stories built from images", items: [["Field Extraction", Collage01], ["Soft Focus Edit", Collage02], ["Inside the Pour", Collage03], ["Color Contact", Collage04], ["Community Sheet", Collage05]] },
  { id: "tabs", title: "Tabs", note: "Discovery interfaces", items: [["Collection Line", Tabs01], ["Mood Type", Tabs02], ["Texture Portraits", Tabs03], ["Formula Index", Tabs04], ["State Rail", Tabs05]] },
  { id: "newsletters", title: "Newsletter", note: "Reasons to stay in touch", items: [["Field Letters", Newsletter01], ["The Night List", Newsletter02], ["Velaire Post", Newsletter03], ["First at the Mirror", Newsletter04], ["The Velaire Circle", Newsletter05]] },
  { id: "reviews", title: "Reviews / Testimonials", note: "Proof with personality", items: [["Quote Constellation", Reviews01], ["Measure of Feeling", Reviews02], ["Worn by You", Reviews03], ["Single Formula Story", Reviews04], ["Press Meets People", Reviews05]] },
  { id: "carousels", title: "Swiper / Carousel", note: "Horizontal discovery", items: [["Ingredient Studies", Carousel01], ["Center of Attention", Carousel02], ["Campaign Chapters", Carousel03], ["Considered Shelf", Carousel04], ["The Long View", Carousel05]] },
  { id: "stories", title: "Side Info / Image + Text", note: "Editorial narratives", items: [["Measured by Hand", Story01], ["The 4pm Standard", Story02], ["Refill Monument", Story03], ["Founder’s Shelf", Story04], ["Night Ritual Map", Story05]] },
] as const;

export default function BeautyGallery() {
  return (
    <main className={s.gallery} id="gallery-top">
      <header className={s.galleryHeader}>
        <div><span>VELAIRE / COMPONENT LIBRARY</span><h1>Beauty,<br/><em>component by component.</em></h1></div>
        <div className={s.galleryHeaderMeta}><p>A premium showroom for a prestige botanical skincare and color house. Fifty-five independent, responsive ideas—made to be selected, remixed, and built upon.</p><span>11 categories · 55 specimens · Edition 01</span></div>
      </header>
      <nav className={s.galleryIndex} aria-label="Component categories">{gallerySections.map(([id,label],index)=><a href={`#${id}`} key={id}><span>{String(index+1).padStart(2,"0")}</span>{label}</a>)}</nav>
      {gallery.map((section, sectionIndex)=><section className={s.gallerySection} id={section.id} key={section.id}><header className={s.categoryHeader}><span>{String(sectionIndex+1).padStart(2,"0")} / 11</span><h2>{section.title}</h2><p>{section.note}</p></header>{section.items.map(([name,Component],index)=><article className={s.specimen} key={name}><header className={s.specimenLabel}><span>{section.title.toUpperCase()} / {String(index+1).padStart(2,"0")}</span><strong>{name}</strong><a href="#gallery-top">Back to index ↑</a></header><div className={s.preview}><Component/></div></article>)}</section>)}
      <footer className={s.galleryEnd}><span>VELAIRE / EDITION 01</span><h2>55 components.<br/>One beauty point of view.</h2><a href="#gallery-top">Return to the index ↑</a></footer>
    </main>
  );
}
