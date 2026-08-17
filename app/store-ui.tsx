import type { Product } from "./store-data";

export type IconName =
  | "account"
  | "arrow"
  | "bag"
  | "check"
  | "close"
  | "heart"
  | "minus"
  | "plus"
  | "search";

const glyphs: Record<IconName, string> = {
  account: "○",
  arrow: "↗",
  bag: "□",
  check: "✓",
  close: "×",
  heart: "♡",
  minus: "−",
  plus: "+",
  search: "⌕",
};

export function Icon({ name }: { name: IconName }) {
  return <span className={`icon icon-${name}`} aria-hidden="true">{glyphs[name]}</span>;
}

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`} href="#top" aria-label="SEAM/03 — back to top">
      <span className="brand-thread" aria-hidden="true"><i /><i /></span>
      <strong>SEAM</strong>
      <em>/03</em>
    </a>
  );
}

export function Price({ product }: { product: Product }) {
  return (
    <span className="product-price">
      ${product.price}
      {product.compareAt && <del>${product.compareAt}</del>}
    </span>
  );
}

export function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div
      className={`product-art product-art-${product.imageIndex} product-art-${product.accent} ${className}`}
      role="img"
      aria-label={`${product.name}. ${product.description}`}
    >
      <span className="sr-only">{product.name}</span>
    </div>
  );
}
