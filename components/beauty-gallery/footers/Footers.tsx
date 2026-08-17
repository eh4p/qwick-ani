import { images } from "../data";
import { Media, NewsletterForm, VelaireMark } from "../Primitives";
import s from "../Gallery.module.css";

const LinkGroups = () => <div className={s.footerLinks}><div><b>SHOP</b><a href="#cards">Skin</a><a href="#cards">Color</a><a href="#cards">Sets</a><a href="#cards">Refills</a></div><div><b>HOUSE</b><a href="#stories">Our method</a><a href="#collages">Journal</a><a href="#reviews">Field notes</a><a href="#stories">Stockists</a></div><div><b>CARE</b><a href="#faqs">Delivery</a><a href="#faqs">Returns</a><a href="#faqs">Contact</a><a href="#faqs">Accessibility</a></div></div>;

export function Footer01() {
  return <footer className={`${s.footer} ${s.footer01}`}><div className={s.footer01Top}><p>Beauty, with more<br />feeling and less noise.</p><a href="#cards">Enter the ritual <span>↗</span></a></div><div className={s.giantWord}>VELAIRE</div><div className={s.footerBase}><span>New York · Paris · Cairo</span><div><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">TikTok</a></div><span>© 2026 · Privacy · Terms</span></div></footer>;
}

export function Footer02() {
  return <footer className={`${s.footer} ${s.footer02}`}><aside><span>LETTERS FROM THE LAB</span><h2>For people who read the ingredient list.</h2><NewsletterForm tone="light"/></aside><div><VelaireMark/><LinkGroups/><div className={s.footerUtility}><span>United States / USD</span><span>Visa · Mastercard · Amex · Shop Pay</span><span>© Velaire Labs</span></div></div></footer>;
}

export function Footer03() {
  return <footer className={`${s.footer} ${s.footer03}`}><Media src={images[5]} alt="Botanical ingredients in glass vessels"/><div className={s.footer03Copy}><VelaireMark light/><h2>We make beauty<br />with the door open.</h2><p>Follow a formula from field note to finished vessel.</p><a href="#stories">Inside the laboratory →</a></div><LinkGroups/><div className={s.footer03Bottom}><span>© 2026</span><span>1% for regenerative growing</span><span>Privacy · Terms</span></div></footer>;
}

export function Footer04() {
  return <footer className={`${s.footer} ${s.footer04}`}><div className={s.footer04Logo}><VelaireMark/><p>High-performance beauty.<br/>Low-volume communication.</p></div><nav aria-label="Footer navigation"><a href="#cards">Shop all <span>24</span></a><a href="#stories">The method <span>06</span></a><a href="#faqs">Skin service <span>Ask us</span></a><a href="#newsletters">Field letters <span>Monthly</span></a></nav><div className={s.footer04Base}><span>EN / USD⌄</span><span>Instagram ↗</span><span>Terms / Privacy / Cookies</span><span>© 2026 Velaire</span></div></footer>;
}

export function Footer05() {
  return <footer className={`${s.footer} ${s.footer05}`}><div className={s.footerSocial}><span>COMMUNITY SHELF / 18.08</span><h2>Made in the lab.<br />Lived in everywhere.</h2><div><Media src={images[3]} alt="Velaire community portrait"/><Media src={images[10]} alt="Velaire face oil"/><Media src={images[4]} alt="Velaire campaign portrait"/></div></div><div className={s.footer05Info}><LinkGroups/><div><b>VISIT</b><p>28 Howard Street<br/>New York, NY 10013</p><p>Mon—Sat / 10—7<br/>Sunday / 11—6</p></div></div><div className={s.footer05Word}><span>VELAIRE</span><small>©26 · Accessibility · Privacy · USD</small></div></footer>;
}
