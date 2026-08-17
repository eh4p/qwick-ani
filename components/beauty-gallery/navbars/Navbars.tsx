import { images } from "../data";
import { Media, VelaireMark } from "../Primitives";
import s from "../Gallery.module.css";

const commerce = <><button type="button" aria-label="Search">Search</button><a href="#cards">Bag <sup>2</sup></a></>;

export function Navbar01() {
  return (
    <header className={`${s.navbar} ${s.nav01}`}>
      <div className={s.navNotice}>Complimentary samples with every ritual</div>
      <div className={s.navEditorial}>
        <nav aria-label="Shop navigation"><a href="#cards">New rituals</a><a href="#cards">Skin</a><a href="#cards">Color</a></nav>
        <VelaireMark />
        <div className={s.navActions}>{commerce}</div>
      </div>
    </header>
  );
}

export function Navbar02() {
  return (
    <header className={`${s.navbar} ${s.nav02}`}>
      <VelaireMark light />
      <details className={s.megaMenu}>
        <summary>Explore the house <span>＋</span></summary>
        <div className={s.megaPanel}>
          <a href="#cards"><small>01</small><strong>Barrier care</strong><span>Quiet repair for stressed skin</span></a>
          <a href="#cards"><small>02</small><strong>Living color</strong><span>Pigments with a skin-like finish</span></a>
          <Media src={images[7]} alt="Velaire skincare still life" />
        </div>
      </details>
      <a className={s.navBag} href="#cards">Bag (2)</a>
    </header>
  );
}

export function Navbar03() {
  return (
    <header className={`${s.navbar} ${s.nav03}`}>
      <div className={s.splitMark}><span>VEL</span><i>V</i><span>AIRE</span></div>
      <nav aria-label="Primary navigation"><a href="#heroes">World</a><a href="#cards">Shop all</a><a href="#stories">Journal</a></nav>
      <div className={s.navDock}><button type="button" aria-label="Open search">⌕</button><a href="#cards" aria-label="Account">○</a><a href="#cards" aria-label="Shopping bag">Bag · 02</a></div>
    </header>
  );
}

export function Navbar04() {
  return (
    <header className={`${s.navbar} ${s.nav04}`}>
      <div className={s.verticalBrand}><VelaireMark /></div>
      <nav aria-label="Shop by ritual">
        <a href="#cards"><span>01</span>Cleanse <em>4</em></a>
        <a href="#cards"><span>02</span>Treat <em>8</em></a>
        <a href="#cards"><span>03</span>Moisturize <em>5</em></a>
        <a href="#cards"><span>04</span>Color <em>12</em></a>
      </nav>
      <div className={s.nav04Utility}><p>Build your four-step ritual</p><button type="button">Begin consultation →</button></div>
    </header>
  );
}

export function Navbar05() {
  return (
    <header className={`${s.navbar} ${s.nav05}`}>
      <Media src={images[4]} alt="Velaire campaign portrait" />
      <div className={s.overlayNav}>
        <button className={s.menuDisc} type="button" aria-label="Open menu"><span>Menu</span></button>
        <VelaireMark light />
        <div><button type="button" aria-label="Search">⌕</button><a href="#cards">Bag (2)</a></div>
      </div>
      <p className={s.navCampaign}>THE SOFT FOCUS EDIT <span>Discover color that behaves like skin →</span></p>
    </header>
  );
}
