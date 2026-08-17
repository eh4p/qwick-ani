import { faqItems, images } from "../data";
import { Media } from "../Primitives";
import s from "../Gallery.module.css";

function Questions({ start = 0, count = 4, numbered = false }: { start?: number; count?: number; numbered?: boolean }) {
  return <div className={s.questions}>{faqItems.slice(start, start + count).map((item, index) => <details key={item.question} open={index === 0}><summary>{numbered && <span>{String(start + index + 1).padStart(2, "0")}</span>}<b>{item.question}</b><i aria-hidden="true">＋</i></summary><p>{item.answer}</p></details>)}</div>;
}

export function FAQ01() {
  return <section className={`${s.faq} ${s.faq01}`}><div><span>THE KNOWLEDGE ROOM</span><h2>Asked,<br /><em>considered,</em><br />answered.</h2><p>Everything we know about formulas, rituals, and getting your order home.</p></div><Questions count={5} /></section>;
}

export function FAQ02() {
  return <section className={`${s.faq} ${s.faq02}`}><header><small>VELAIRE SERVICE NOTES</small><h2>Six answers<br />before you ask.</h2></header><Questions count={6} numbered /><aside><strong>Still wondering?</strong><p>Our skin team replies within one business day.</p><a href="mailto:care@velaire.example">care@velaire.example →</a></aside></section>;
}

export function FAQ03() {
  return <section className={`${s.faq} ${s.faq03}`}><div className={s.faqSticky}><Media src={images[6]} alt="Hand holding a skincare ampoule" /><div><span>FORMULA DESK / 01</span><h2>Good questions make better rituals.</h2></div></div><Questions count={5} /></section>;
}

export function FAQ04() {
  return <section className={`${s.faq} ${s.faq04}`}><header><div><span>FILTER THE ANSWERS</span><h2>What are you looking for?</h2></div><nav aria-label="FAQ topics"><button type="button" aria-pressed="true">Formulas</button><button type="button">Orders</button><button type="button">Refills</button></nav></header><div className={s.faqCardGrid}>{faqItems.slice(0,4).map((item,index)=><details key={item.question} open={index===0}><summary><span>0{index+1}</span><b>{item.question}</b><i>↗</i></summary><p>{item.answer}</p></details>)}</div></section>;
}

export function FAQ05() {
  return <section className={`${s.faq} ${s.faq05}`}><span className={s.faq05Label}>THE LONG ANSWER</span><h2>Is your beauty made for real skin?</h2><p className={s.faqLead}>Entirely. Texture, pores, shifting weather, late nights—the formulas begin where real skin lives.</p><Questions start={1} count={4} numbered /><a className={s.faqSupport} href="mailto:care@velaire.example"><span>Prefer a human?</span><strong>Write to a Velaire skin guide →</strong></a></section>;
}
