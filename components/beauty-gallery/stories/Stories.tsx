import { images } from "../data";
import { Arrow, Media } from "../Primitives";
import s from "../Gallery.module.css";

export function Story01() {
  return <section className={`${s.story} ${s.story01}`}><div className={s.story01Media}><Media src={images[6]} alt="A hand holding a botanical ampoule"/><span>FORMULA 01 / LUCENT</span></div><div className={s.story01Copy}><span>CRAFT / 01</span><h2>Measured by hand.<br/>Tested by time.</h2><p>Each Lucent batch rests for seventy-two hours before it enters glass—a patient interval that lets texture, stability, and skin feel settle into agreement.</p><dl><div><dt>72H</dt><dd>formula rest</dd></div><div><dt>14</dt><dd>quality checks</dd></div><div><dt>01</dt><dd>final hand pour</dd></div></dl><a href="#collages">See inside the pour <Arrow/></a></div></section>;
}

export function Story02() {
  return <section className={`${s.story} ${s.story02}`}><div className={s.story02Text}><span>THE VELAIRE METHOD</span><h2>We formulate for the skin you have at 4pm.</h2><p>Not freshly cleansed. Not professionally lit. Skin mid-life: moving, warming, meeting weather. Every texture is evaluated there.</p><a href="#faqs">Our formulation standard →</a></div><div className={s.story02Frames}><Media src={images[3]} alt="Real luminous skin in afternoon light"/><Media src={images[8]} alt="Close-up of Velaire cream texture"/><span>REAL TEXTURE / TRUE LIGHT</span></div><div className={s.story02Aside}>PERFORMANCE, WITHOUT PERFORMANCE ART</div></section>;
}

export function Story03() {
  return <section className={`${s.story} ${s.story03}`}><div className={s.story03Word}>REFILL</div><Media src={images[1]} alt="Refillable Velaire cream jar"/><div className={s.story03Panel}><span>CIRCULAR BY DESIGN / 03</span><h2>Keep the object.<br/>Replace only what empties.</h2><p>Our ceramic-coated vessels are designed for the bathroom shelf, not the bin. A sealed inner pod clicks in cleanly and uses 72% less packaging by weight.</p><ol><li><span>01</span>Twist out</li><li><span>02</span>Rinse the cap</li><li><span>03</span>Click in</li></ol><a href="#cards">Shop refillable care <Arrow/></a></div></section>;
}

export function Story04() {
  return <section className={`${s.story} ${s.story04}`}><header><span>THE FOUNDER’S SHELF</span><h2>“Beauty should leave room for a face.”</h2></header><div className={s.founderSequence}><Media src={images[9]} alt="Portrait of fictional Velaire founder Ana Vale"/><div><p>Ana Vale spent twelve years between pigment rooms and dermatology labs, watching performance and pleasure treated as separate briefs.</p><p>Velaire began with a quieter question: what if the most advanced formula was also the one you reached for?</p><strong>Ana Vale<br/><small>Founder + Formulator</small></strong></div><Media src={images[5]} alt="Velaire botanical formulation desk"/></div></section>;
}

export function Story05() {
  return <section className={`${s.story} ${s.story05}`}><div className={s.story05Intro}><span>RITUAL MAP / NIGHT</span><h2>Three textures.<br/>Eleven quiet minutes.</h2><p>A paced evening sequence for skin that has carried enough.</p></div><div className={s.ritualSteps}>{[
    ["01", "Flood", "Press two palms of Lucent into damp skin.", images[0], "00:00"],
    ["02", "Restore", "Warm three drops of Nocturne between fingertips.", images[10], "01:30"],
    ["03", "Seal", "Sweep Cloudveil from the center of the face outward.", images[1], "03:00"],
  ].map(step=><article key={step[0]}><Media src={step[3]} alt=""/><span>{step[0]}</span><div><small>{step[4]}</small><h3>{step[1]}</h3><p>{step[2]}</p></div></article>)}</div><a href="#cards">Build the full night ritual →</a></section>;
}
