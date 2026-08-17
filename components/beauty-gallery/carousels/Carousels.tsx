import { images, products, reviews } from "../data";
import { AddButton, Carousel, Media } from "../Primitives";
import s from "../Gallery.module.css";

export function Carousel01() {
  return <section className={`${s.carouselSection} ${s.carousel01}`}><div className={s.carouselIntro}><span>FORMULA FOCUS</span><h2>One active.<br/>Every angle.</h2></div><Carousel label="Ingredient studies" variant="peek">{[
    ["01", "ECTOIN", "The desert molecule that helps skin hold composure.", images[5]],
    ["02", "CERAMIDES", "Skin-identical lipids that reinforce what already protects you.", images[8]],
    ["03", "CALENDULA", "A slow infusion chosen for tenderness, not trend.", images[10]],
  ].map(item=><article className={s.ingredientSlide} key={item[1]}><Media src={item[3]} alt=""/><small>{item[0]}</small><h3>{item[1]}</h3><p>{item[2]}</p><a href="#stories">Read the study →</a></article>)}</Carousel></section>;
}

export function Carousel02() {
  return <section className={`${s.carouselSection} ${s.carousel02}`}><header><span>THE OBJECTS</span><h2>Center of attention.</h2></header><Carousel label="Featured products" variant="center">{products.slice(0,5).map(product=><article className={s.centerSlide} key={product.name}><Media src={product.image} alt={product.name}/><span>{product.badge??"Velaire ritual"}</span><h3>{product.name}</h3><p>{product.price}</p><AddButton compact/></article>)}</Carousel></section>;
}

export function Carousel03() {
  return <section className={`${s.carouselSection} ${s.carousel03}`}><Carousel label="Campaign chapters" variant="cinema">{[
    ["CHAPTER I", "The hours between light and skin.", images[4]],
    ["CHAPTER II", "Color, after the garden closes.", images[9]],
    ["CHAPTER III", "A study in liquid gold.", images[10]],
  ].map(item=><article className={s.cinemaSlide} key={item[0]}><Media src={item[2]} alt="Velaire campaign"/><div><span>{item[0]} · FILM 26</span><h3>{item[1]}</h3><a href="#collages">Watch the story ▶</a></div></article>)}</Carousel></section>;
}

export function Carousel04() {
  return <section className={`${s.carouselSection} ${s.carousel04}`}><header><div><span>RECENTLY HELD</span><h2>Still thinking about it?</h2></div><p>Your considered shelf, kept for seven days.</p></header><Carousel label="Recently viewed products" variant="commerce">{products.map(product=><article className={s.commerceSlide} key={product.name}><Media src={product.image} alt={product.name}/><div><small>{product.category}</small><h3>{product.name}</h3><span>{product.price}</span></div><AddButton compact/></article>)}</Carousel></section>;
}

export function Carousel05() {
  return <section className={`${s.carouselSection} ${s.carousel05}`}><header><span>RITUALS, IN THEIR WORDS</span><h2>The long view.</h2></header><Carousel label="Customer stories" variant="stories">{reviews.map((review,index)=><article className={s.storySlide} key={review.name}><span>0{index+1} / 04</span><blockquote>“{review.quote}”</blockquote><div><Media src={review.image} alt=""/><p><strong>{review.name}</strong><small>{review.city}<br/>{review.product}</small></p></div></article>)}</Carousel></section>;
}
