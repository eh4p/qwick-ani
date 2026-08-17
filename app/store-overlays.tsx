"use client";

import { motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import { categories, products, type Product } from "./store-data";
import { BrandMark, Icon, Price, ProductArt } from "./store-ui";

export type CartItem = {
  productId: string;
  variant: string;
  quantity: number;
};

function DrawerShell({
  title,
  note,
  onClose,
  children,
}: {
  title: string;
  note: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <motion.button
        className="overlay-backdrop"
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-dialog
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      >
        <header className="drawer-header">
          <div><span>{note}</span><h2>{title}</h2></div>
          <button type="button" aria-label={`Close ${title}`} onClick={onClose} data-autofocus><Icon name="close" /></button>
        </header>
        {children}
      </motion.aside>
    </>
  );
}

export function CartDrawer({
  items,
  onClose,
  onQuantity,
  onRemove,
  onContinue,
}: {
  items: CartItem[];
  onClose: () => void;
  onQuantity: (index: number, amount: number) => void;
  onRemove: (index: number) => void;
  onContinue: () => void;
}) {
  const detailed = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = detailed.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <DrawerShell title="The fitting rail" note={`${count} ${count === 1 ? "piece" : "pieces"}`} onClose={onClose}>
      {detailed.length === 0 ? (
        <div className="empty-state">
          <div className="empty-pattern" aria-hidden="true"><i /><i /><b>0</b></div>
          <h3>The rail is empty.</h3>
          <p>Begin with a cut, a drape, or an object made to carry.</p>
          <button className="button button-ink" type="button" onClick={onContinue}>Open the cutting table <Icon name="arrow" /></button>
        </div>
      ) : (
        <>
          <div className="drawer-items">
            {detailed.map((item, index) => (
              <article className="drawer-item" key={`${item.productId}-${item.variant}`}>
                <ProductArt product={item.product} />
                <div className="drawer-item-copy">
                  <span>{item.product.collection}</span>
                  <h3>{item.product.name}</h3>
                  <p>{item.variant}</p>
                  <div className="quantity" aria-label={`Quantity for ${item.product.name}`}>
                    <button type="button" aria-label="Decrease quantity" onClick={() => onQuantity(index, -1)}><Icon name="minus" /></button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => onQuantity(index, 1)}><Icon name="plus" /></button>
                  </div>
                </div>
                <div className="drawer-item-end">
                  <b>${item.product.price * item.quantity}</b>
                  <button type="button" onClick={() => onRemove(index)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
          <div className="cart-footer">
            <div className="shipping-meter">
              <span><i style={{ width: `${Math.min(100, subtotal / 3.5)}%` }} /></span>
              <p>{subtotal >= 350 ? "Complimentary express delivery is pinned to your order." : `$${350 - subtotal} from complimentary express delivery.`}</p>
            </div>
            <div className="cart-total"><span>Subtotal<small>Taxes and duties shown at checkout</small></span><b>${subtotal}</b></div>
            <button className="button button-cobalt" type="button">Continue to secure checkout <Icon name="arrow" /></button>
            <button className="continue-link" type="button" onClick={onContinue}>Return to the cutting table</button>
          </div>
        </>
      )}
    </DrawerShell>
  );
}

export function WishlistDrawer({
  wishlist,
  onClose,
  onRemove,
  onAdd,
}: {
  wishlist: string[];
  onClose: () => void;
  onRemove: (product: Product) => void;
  onAdd: (product: Product) => void;
}) {
  const selected = products.filter((product) => wishlist.includes(product.id));
  return (
    <DrawerShell title="Pinned pieces" note={`${selected.length} saved`} onClose={onClose}>
      {selected.length === 0 ? (
        <div className="empty-state"><div className="empty-pattern" aria-hidden="true"><i /><i /><b>♡</b></div><h3>No pins on the board.</h3><p>Keep the pieces you want to revisit close to the cutting table.</p></div>
      ) : (
        <div className="wishlist-items">
          {selected.map((product) => (
            <article key={product.id}>
              <ProductArt product={product} />
              <div><span>{product.category}</span><h3>{product.name}</h3><Price product={product} /></div>
              <button className="button button-ink" type="button" onClick={() => onAdd(product)}>Add to rail <Icon name="plus" /></button>
              <button className="remove-wish" type="button" onClick={() => onRemove(product)}>Unpin</button>
            </article>
          ))}
        </div>
      )}
    </DrawerShell>
  );
}

export function SearchOverlay({
  onClose,
  onQuickView,
}: {
  onClose: () => void;
  onQuickView: (product: Product) => void;
}) {
  const [term, setTerm] = useState("");
  const results = useMemo(() => {
    const value = term.trim().toLowerCase();
    if (!value) return products.slice(0, 4);
    return products.filter((product) => [product.name, product.category, product.collection, product.description].join(" ").toLowerCase().includes(value));
  }, [term]);
  const matchedCategories = categories.filter((category) => !term || category.name.toLowerCase().includes(term.toLowerCase()));

  return (
    <motion.div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search the collection"
      data-dialog
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <header><BrandMark /><button type="button" onClick={onClose} aria-label="Close search"><Icon name="close" /></button></header>
      <div className="search-field">
        <label htmlFor="store-search">Find a piece, material, or cut</label>
        <div><input id="store-search" data-autofocus type="search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Try ‘wool’ or ‘objects’" /><Icon name="search" /></div>
      </div>
      <div className="search-categories">
        <span>Pattern index</span>
        {categories.map((category) => <button type="button" key={category.name} onClick={() => setTerm(category.name)}>{category.number} / {category.name}</button>)}
      </div>
      <div className="search-results">
        <div className="search-results-label"><span>{term ? `${results.length} pieces found` : "Suggested pieces"}</span><span>{matchedCategories.length} matching departments</span></div>
        <div>
          {results.map((product) => (
            <button type="button" key={product.id} onClick={() => onQuickView(product)}>
              <ProductArt product={product} />
              <span><small>{product.collection}</small><strong>{product.name}</strong><Price product={product} /></span>
              <Icon name="arrow" />
            </button>
          ))}
          {results.length === 0 && <div className="no-results">No pattern matches that note. Try “silk”, “tailoring”, or “bag”.</div>}
        </div>
      </div>
    </motion.div>
  );
}

export function AccountOverlay({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <DrawerShell title="Atelier account" note="Private fitting room" onClose={onClose}>
      <div className="account-panel">
        <span>YOUR NOTES / YOUR ORDERS</span>
        <h3>Keep every measurement and material in one place.</h3>
        {sent ? (
          <div className="account-sent"><Icon name="check" /> A fitting-room link is on its way.</div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            <label htmlFor="account-email">Email address</label>
            <input id="account-email" data-autofocus type="email" placeholder="you@example.com" required />
            <button className="button button-ink" type="submit">Send private link <Icon name="arrow" /></button>
          </form>
        )}
        <p>No password. We send a one-use link to your inbox.</p>
      </div>
    </DrawerShell>
  );
}

export function QuickView({
  product,
  wished,
  onClose,
  onWish,
  onAdd,
  onRelated,
}: {
  product: Product;
  wished: boolean;
  onClose: () => void;
  onWish: (product: Product) => void;
  onAdd: (product: Product, variant: string, quantity: number) => void;
  onRelated: (product: Product) => void;
}) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(0);
  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.collection === product.collection)).slice(0, 2);

  return (
    <>
      <motion.button className="overlay-backdrop" type="button" aria-label="Close product details" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        className="quick-view"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        data-dialog
        initial={{ opacity: 0, y: 56, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        exit={{ opacity: 0, y: 36 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="quick-close" type="button" onClick={onClose} aria-label="Close product details" data-autofocus><Icon name="close" /></button>
        <div className={`quick-media quick-media-view-${view}`}>
          <ProductArt product={product} />
          <div className="quick-gallery" aria-label="Product gallery"><button className={view === 0 ? "active" : ""} type="button" onClick={() => setView(0)}>Object</button><button className={view === 1 ? "active" : ""} type="button" onClick={() => setView(1)}>Texture</button></div>
          <span className="quick-pattern-number" aria-hidden="true">P–{String(product.imageIndex + 1).padStart(2, "0")}</span>
        </div>
        <div className="quick-copy">
          <div className="quick-kicker"><span>{product.badge}</span><b>★ {product.rating} / {product.reviews} notes</b></div>
          <h2>{product.name}</h2>
          <Price product={product} />
          <p className="quick-description">{product.detail}</p>
          <div className="quick-benefits">{product.benefits.map((benefit) => <span key={benefit}><Icon name="check" />{benefit}</span>)}</div>
          <fieldset className="variants">
            <legend>Cut / colour — <b>{variant}</b></legend>
            <div>{product.variants.map((item) => <button className={variant === item ? "active" : ""} type="button" key={item} onClick={() => setVariant(item)}>{item}</button>)}</div>
          </fieldset>
          <div className="quick-actions">
            <div className="quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Icon name="minus" /></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Icon name="plus" /></button></div>
            <button className="button button-ink" type="button" onClick={() => onAdd(product, variant, quantity)}>Pin to rail — ${product.price * quantity}</button>
            <button className={wished ? "quick-wish is-wished" : "quick-wish"} type="button" aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished} onClick={() => onWish(product)}><Icon name="heart" /></button>
          </div>
          <p className="quick-status"><i />{product.status}</p>
          <div className="quick-related"><span>On the same table</span>{related.map((item) => <button type="button" key={item.id} onClick={() => onRelated(item)}>{item.name}<Icon name="arrow" /></button>)}</div>
        </div>
      </motion.div>
    </>
  );
}
