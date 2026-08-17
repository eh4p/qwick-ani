import { images } from "../data";
import { Arrow, Media } from "../Primitives";
import s from "../Gallery.module.css";

export function Hero01() {
  return (
    <section className={`${s.hero} ${s.hero01}`}>
      <div className={s.hero01Title}><span>NEW · VELAIRE LABS</span><h2>The architecture<br />of <em>luminous</em> skin.</h2></div>
      <Media src={images[3]} alt="Close-up portrait with luminous skin" />
      <div className={s.hero01Aside}><p>Barrier-first formulas, calibrated pigments, and pleasure in every texture.</p><a href="#cards">Shop the new ritual <Arrow /></a></div>
      <div className={s.heroIndex}>01 <i /> 05</div>
    </section>
  );
}

export function Hero02() {
  return (
    <section className={`${s.hero} ${s.hero02}`}>
      <Media src={images[9]} alt="Model holding a dark botanical flower" />
      <div className={s.heroVeil} />
      <p className={s.hero02Top}>NIGHT GARDEN · CHAPTER II</p>
      <div className={s.hero02Copy}><h2>Color after dark.</h2><p>Botanical waxes. Saturated pigments. A satin finish that stays close.</p><div><a href="#cards">Meet Rouge Moss</a><a href="#cards">View the film ▶</a></div></div>
      <span className={s.verticalType}>VELAIRE / AW 26</span>
    </section>
  );
}

export function Hero03() {
  return (
    <section className={`${s.hero} ${s.hero03}`}>
      <div className={s.hero03Meta}><span>ONE FORMULA / THREE SIGNALS</span><p>Restore · Strengthen · Illuminate</p></div>
      <div className={s.hero03Product}>
        <Media src={images[0]} alt="Lucent Barrier Serum on travertine" />
        <span className={s.measureTop}>30 ml</span><span className={s.measureSide}>pH 5.4</span>
      </div>
      <div className={s.hero03Copy}><h2>Lucent<br />Barrier<br />Serum</h2><p>A precise daily concentrate for stronger, quieter skin.</p><div><strong>$78</strong><a href="#cards">Add to ritual +</a></div></div>
    </section>
  );
}

export function Hero04() {
  return (
    <section className={`${s.hero} ${s.hero04}`}>
      <div className={s.hero04Word}>SKIN<br /><i>IN</i><br />BLOOM</div>
      <Media className={s.collageA} src={images[5]} alt="Botanical ingredients in glass vessels" />
      <Media className={s.collageB} src={images[4]} alt="Portrait through blush fabric" />
      <Media className={s.collageC} src={images[8]} alt="Rich cream texture" />
      <div className={s.hero04Cta}><span>SUMMER STUDY 06.26</span><p>Three sensorial textures, made to meet heat with composure.</p><a href="#cards">Enter the study <Arrow /></a></div>
    </section>
  );
}

export function Hero05() {
  const moods = [
    ["Reset", "Tired + reactive", images[0]],
    ["Glow", "Dull + uneven", images[11]],
    ["Soothe", "Dry + tight", images[1]],
  ];
  return (
    <section className={`${s.hero} ${s.hero05}`}>
      <div className={s.hero05Intro}><span>SHOP BY SKIN STATE</span><h2>How does your skin want to feel?</h2><p>Choose a state. We’ll compose the ritual.</p></div>
      <div className={s.moodGrid}>{moods.map(([title, copy, image], index) => <a href="#cards" key={title}><Media src={image} alt="" /><small>0{index + 1}</small><h3>{title}</h3><p>{copy}</p><span>→</span></a>)}</div>
    </section>
  );
}
