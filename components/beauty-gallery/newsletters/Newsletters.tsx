import { images } from "../data";
import { Media, NewsletterForm } from "../Primitives";
import s from "../Gallery.module.css";

export function Newsletter01() {
  return <section className={`${s.newsletter} ${s.news01}`}><span>FIELD LETTERS · 01</span><h2>A monthly note on skin,<br/><em>weather, and what works.</em></h2><NewsletterForm tone="light"/></section>;
}

export function Newsletter02() {
  return <section className={`${s.newsletter} ${s.news02}`}><Media src={images[4]} alt="Velaire Field Letters campaign portrait"/><div className={s.news02Shade}/><div><span>THE NIGHT LIST</span><h2>After-hours access starts here.</h2><p>Private drops, studio appointments, and the formulas we only pour once.</p><NewsletterForm tone="dark"/></div></section>;
}

export function Newsletter03() {
  return <section className={`${s.newsletter} ${s.news03}`}><div className={s.news03Backdrop}><span>VELAIRE</span><span>POST</span></div><div className={s.newsCard}><small>LETTER NO. 008</small><h2>Your bathroom shelf,<br/>better edited.</h2><p>Five minutes with our formulation team, delivered on the first Sunday of each month.</p><NewsletterForm tone="light"/><span className={s.stamp}>1×<br/>MONTH</span></div></section>;
}

export function Newsletter04() {
  return <section className={`${s.newsletter} ${s.news04}`}><div><span>DROP 07 / 09:00 EST</span><h2>Be first<br/>at the mirror.</h2></div><div className={s.news04Form}><p>Rouge Moss returns in 300 hand-numbered pieces. We’ll send one message when the drawer opens.</p><NewsletterForm tone="accent"/><small>No sequence. No sale countdown. One useful alert.</small></div><Media src={images[2]} alt="Rouge Moss lipstick"/></section>;
}

export function Newsletter05() {
  return <section className={`${s.newsletter} ${s.news05}`}><div className={s.news05Orbit}><span>V</span><i/><i/></div><div><span>THE VELAIRE CIRCLE</span><h2>More than early access.</h2><p>Quarterly studio gatherings, personal shade consultations, refill rewards, and an honest seat at the formula table.</p><ul><li>Private studio hours</li><li>Complimentary refill shipping</li><li>First pour access</li></ul><NewsletterForm tone="dark"/></div></section>;
}
