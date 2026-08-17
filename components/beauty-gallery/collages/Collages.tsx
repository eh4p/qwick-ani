import { images } from "../data";
import { Media } from "../Primitives";
import s from "../Gallery.module.css";

export function Collage01() {
  return <section className={`${s.collage} ${s.collage01}`}><div className={s.collageTitle}><span>FIELD NOTE / 07</span><h2>What grows<br />becomes what glows.</h2><p>Follow calendula from regenerative plot to lipid-rich concentrate.</p></div><Media className={s.c01a} src={images[5]} alt="Botanicals being studied in glass vessels"/><Media className={s.c01b} src={images[6]} alt="Botanical ampoule held in hand"/><Media className={s.c01c} src={images[10]} alt="Golden face oil in water"/><span className={s.floatingNote}>72 hours from harvest to extraction</span><a href="#stories">Read the field note →</a></section>;
}

export function Collage02() {
  return <section className={`${s.collage} ${s.collage02}`}><div className={s.c02Grid}><figure><Media src={images[3]} alt="Skin tint finish"/><figcaption>01 / SKIN, NOT COVER</figcaption></figure><figure><Media src={images[11]} alt="Silver highlighter compact"/><figcaption>02 / DIFFUSED LIGHT</figcaption></figure><div><span>THE SOFT FOCUS EDIT</span><h2>A complexion collection that lets the face stay visible.</h2><a href="#cards">Shop the campaign →</a></div><figure><Media src={images[8]} alt="Cloud cream texture"/><figcaption>03 / CREAMED PIGMENT</figcaption></figure></div></section>;
}

export function Collage03() {
  return <section className={`${s.collage} ${s.collage03}`}><header><span>VELAIRE PROCESS, UNCONCEALED</span><h2>Inside the pour.</h2><button type="button">Play 02:14 ▶</button></header><div className={s.filmStrip}><Media src={images[5]} alt="Botanical formula study"/><Media src={images[7]} alt="Velaire product still life"/><Media src={images[8]} alt="Cream formula detail"/></div><div className={s.filmTimeline}><span>FORMULATE</span><i/><span>REST</span><i/><span>POUR</span><i/><span>SEAL</span></div></section>;
}

export function Collage04() {
  return <section className={`${s.collage} ${s.collage04}`}><div className={s.c04Masonry}><Media src={images[4]} alt="Portrait through translucent blush fabric"/><Media src={images[2]} alt="Rouge Moss lipstick"/><Media src={images[9]} alt="Night Garden campaign portrait"/><Media src={images[11]} alt="Moonmetal highlighter"/></div><div className={s.c04Overlay}><span>CAMPAIGN 04 · COLOR THEORY</span><h2>Four ways<br />to catch light.</h2><p>Unretouched skin. Saturated color. One change in the weather.</p><a href="#cards">Explore the color edit ↗</a></div></section>;
}

export function Collage05() {
  return <section className={`${s.collage} ${s.collage05}`}><header><div><span>@VELAIRE / COMMUNITY CONTACT SHEET</span><h2>On your shelves,<br/>in your own light.</h2></div><p>Tag @velaire for a chance to enter next month’s field note.</p></header><div className={s.contactSheet}>{[3,10,0,4,1,9].map((image,index)=><figure key={image}><Media src={images[image]} alt="Velaire community submission"/><figcaption>{["@mayaonfilm","@noura.skin","@atelier_jo","@imani.c","@daylight.elena","@linhnotes"][index]}</figcaption></figure>)}</div></section>;
}
