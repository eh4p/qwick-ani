import { images, products, type Product } from "../data";
import { AddButton, Media, WishlistButton } from "../Primitives";
import s from "../Gallery.module.css";

function Price({ product }: { product: Product }) {
  return <span className={s.price}>{product.price} {product.compareAt && <del>{product.compareAt}</del>}</span>;
}

export function Cards01() {
  return <section className={`${s.cards} ${s.cards01}`}><header><span>THE DAILY EDIT</span><h2>Formulas worth finishing.</h2></header><div className={s.productGrid}>{products.slice(0,4).map(product=><article key={product.name}><div className={s.productImage}><Media src={product.image} alt={product.name} />{product.badge&&<small>{product.badge}</small>}<WishlistButton /></div><div className={s.productInfo}><div><h3>{product.name}</h3><p>{product.category}</p></div><Price product={product} /></div><AddButton /></article>)}</div></section>;
}

export function Cards02() {
  return <section className={`${s.cards} ${s.cards02}`}><article className={s.featureProduct}><Media src={products[2].image} alt={products[2].name}/><div><span>COLOR STUDY / 03</span><h2>Rouge Moss</h2><p>A weathered rose with a green undertone—quiet at first glance, unforgettable at the second.</p><div className={s.swatches} aria-label="Available shades"><button aria-label="Moss rose" style={{background:"#6b2930"}}/><button aria-label="Burnt fig" style={{background:"#8d493d"}}/><button aria-label="Clay pink" style={{background:"#b97670"}}/><button aria-label="Black cherry" style={{background:"#401b25"}}/></div><strong>$42</strong><AddButton /></div></article><div className={s.miniProducts}>{products.slice(0,3).map((product,index)=><a href="#cards" key={product.name}><span>0{index+1}</span><strong>{product.name}</strong><small>{product.price}</small></a>)}</div></section>;
}

export function Cards03() {
  return <section className={`${s.cards} ${s.cards03}`}><header><h2>Seen in a new light.</h2><p>Move through the edit—each image reveals a different side of the formula.</p></header><div className={s.hoverGrid}>{products.slice(0,3).map((product,index)=><article key={product.name}><div><Media src={product.image} alt={product.name}/><Media className={s.secondaryImage} src={images[(index+8)%12]} alt=""/></div><span>{product.badge??"Velaire essential"}</span><h3>{product.name}</h3><p>{product.category}</p><Price product={product}/><AddButton compact/></article>)}</div></section>;
}

export function Cards04() {
  return <section className={`${s.cards} ${s.cards04}`}><div className={s.cards04Intro}><span>BUILD A RITUAL</span><h2>Three acts.<br />One quieter<br />complexion.</h2><p>Designed to layer without pilling, heaviness, or guesswork.</p></div><div className={s.layeredCards}>{products.slice(0,3).map((product,index)=><article key={product.name} style={{"--card-index":index} as React.CSSProperties}><Media src={product.image} alt={product.name}/><div><small>STEP 0{index+1}</small><h3>{product.name}</h3><p>{product.category}</p><Price product={product}/><AddButton compact/></div></article>)}</div></section>;
}

export function Cards05() {
  return <section className={`${s.cards} ${s.cards05}`}><header><div><span>LIVE INVENTORY · NYC</span><h2>The five-minute shelf.</h2></div><p>Compact commerce for fast decisions. Your routine, edited down.</p></header><div className={s.compactList}>{products.slice(0,5).map((product,index)=><article key={product.name}><span className={s.rowIndex}>{String(index+1).padStart(2,"0")}</span><Media src={product.image} alt={product.name}/><div><small>{product.category}</small><h3>{product.name}</h3></div><span className={s.rowRating}>★ {product.rating}</span><Price product={product}/><div className={s.rowSwatch} style={{background:product.shade}}/><AddButton compact/></article>)}</div></section>;
}
