import { products, reviews } from "../data";
import { Media } from "../Primitives";
import s from "../Gallery.module.css";

export function Reviews01() {
  return <section className={`${s.reviewSection} ${s.reviews01}`}><header><span>FIELD NOTES / 2,804 VERIFIED RITUALS</span><h2>Skin tells the story.</h2></header><div className={s.quoteWall}>{reviews.map((review,index)=><blockquote key={review.name} className={s[`quote${index+1}`]}><span>“</span><p>{review.quote}</p><footer><strong>{review.name}</strong><small>{review.city} · {review.product}</small></footer></blockquote>)}</div></section>;
}

export function Reviews02() {
  return <section className={`${s.reviewSection} ${s.reviews02}`}><div className={s.review02Score}><strong>4.88</strong><span>★★★★★</span><p>from 2,804 verified orders</p><div><span>Texture</span><i/><b>96%</b><span>Finish</span><i/><b>94%</b><span>Comfort</span><i/><b>97%</b></div></div><div className={s.review02List}>{reviews.slice(0,3).map(review=><article key={review.name}><span>★★★★★</span><h3>{review.product}</h3><p>“{review.quote}”</p><footer><strong>{review.name}</strong><small>Verified purchase · {review.city}</small></footer></article>)}</div></section>;
}

export function Reviews03() {
  return <section className={`${s.reviewSection} ${s.reviews03}`}><header><span>WORN BY YOU</span><h2>Different light.<br/>Same skin-first finish.</h2></header><div className={s.photoReviews}>{reviews.map(review=><figure key={review.name}><Media src={review.image} alt={`${review.name} wearing Velaire`}/><figcaption><span>★★★★★</span><p>{review.quote}</p><strong>{review.name} · {review.city}</strong></figcaption></figure>)}</div></section>;
}

export function Reviews04() {
  const review = reviews[0];
  return <section className={`${s.reviewSection} ${s.reviews04}`}><Media src={products[0].image} alt="Lucent Barrier Serum"/><div className={s.review04Quote}><span>REVIEW 1184 / LUCENT SERUM</span><blockquote>“{review.quote}”</blockquote><p>{review.name} · {review.city} · Verified buyer</p><div><button type="button" aria-label="Previous review">←</button><span>01 / 04</span><button type="button" aria-label="Next review">→</button></div></div><aside><strong>96%</strong><p>say skin felt calmer in 14 days</p><small>Independent consumer perception study, n=82.</small></aside></section>;
}

export function Reviews05() {
  return <section className={`${s.reviewSection} ${s.reviews05}`}><div className={s.pressQuote}><span>THE BEAUTY INDEX</span><blockquote>“A masterclass in making clinical skincare feel genuinely covetable.”</blockquote></div><div className={s.customerStack}>{reviews.slice(1,4).map((review,index)=><article key={review.name} style={{"--review":index} as React.CSSProperties}><span>{review.rating} ★</span><p>{review.quote}</p><footer><strong>{review.name}</strong><small>{review.product}</small></footer></article>)}</div><div className={s.pressNames}><span>MONOCLE</span><span>VOGUE</span><span>THE CUT</span><span>WALLPAPER*</span></div></section>;
}
