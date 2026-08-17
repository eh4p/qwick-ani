import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CartItem, Product } from "./data";
import { products } from "./data";
import { ArrowIcon, CloseIcon, HeartIcon, MinusIcon, PlusIcon, SearchIcon, StarIcon } from "./icons";

function DialogShell({
  children,
  className,
  label,
  onClose,
}: {
  children: React.ReactNode;
  className: string;
  label: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      const preferredTarget = dialogRef.current?.querySelector<HTMLElement>("[data-dialog-autofocus]");
      const firstTarget = dialogRef.current?.querySelector<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href], select:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
      (preferredTarget ?? firstTarget)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const controls = dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="dialog-backdrop"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        animate={{ opacity: 1, x: 0, y: 0 }}
        aria-label={label}
        aria-modal="true"
        className={className}
        exit={{ opacity: 0, x: className.includes("drawer") ? "100%" : 0, y: className.includes("overlay") ? 30 : 0 }}
        initial={{ opacity: 0, x: className.includes("drawer") ? "100%" : 0, y: className.includes("overlay") ? 30 : 0 }}
        ref={dialogRef}
        role="dialog"
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function DialogHeader({ eyebrow, title, onClose }: { eyebrow: string; title: string; onClose: () => void }) {
  return (
    <header className="dialog-header">
      <div><small>{eyebrow}</small><h2>{title}</h2></div>
      <button aria-label={`Close ${title}`} onClick={onClose} type="button"><CloseIcon /></button>
    </header>
  );
}

export function CartDrawer({
  cart,
  onClose,
  removeItem,
  updateQuantity,
  notify,
}: {
  cart: CartItem[];
  onClose: () => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  notify: (message: string) => void;
}) {
  const detailedItems = cart.flatMap((item) => {
    const product = products.find(({ id }) => id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = detailedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <DialogShell className="commerce-drawer cart-drawer" label="Shopping cart" onClose={onClose}>
      <DialogHeader eyebrow="Your selected phases" onClose={onClose} title="Cart" />
      {detailedItems.length ? (
        <>
          <div className="cart-items">
            {detailedItems.map(({ product, quantity, size }) => (
              <article className="cart-line" key={`${product.id}-${size}`}>
                <div className="cart-thumb"><Image alt="" fill sizes="96px" src={product.image} /></div>
                <div className="cart-line-copy">
                  <small>{product.ritual}</small><h3>{product.name}</h3><span>{size}</span>
                  <div className="quantity-control" aria-label={`Quantity for ${product.name}`} role="group">
                    <button aria-label="Decrease quantity" onClick={() => updateQuantity(product.id, size, quantity - 1)} type="button"><MinusIcon /></button>
                    <span>{quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQuantity(product.id, size, quantity + 1)} type="button"><PlusIcon /></button>
                  </div>
                </div>
                <div className="cart-line-end"><strong>${product.price * quantity}</strong><button onClick={() => removeItem(product.id, size)} type="button">Remove</button></div>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <div><span>Subtotal</span><strong>${subtotal}</strong></div>
            <div><span>Estimated delivery</span><strong>{subtotal >= 75 ? "Complimentary" : "$8"}</strong></div>
            <p>Taxes calculated at checkout. All orders include a sample phase.</p>
            <button className="velora-button velora-button-dark" onClick={() => notify("Checkout is ready for commerce integration.")} type="button">Secure checkout · ${subtotal}<ArrowIcon /></button>
            <button className="text-button drawer-continue" onClick={onClose} type="button">Continue shopping</button>
          </div>
        </>
      ) : (
        <div className="empty-commerce">
          <div className="empty-orbit" aria-hidden="true"><span /></div>
          <h3>Your ritual is still unwritten.</h3>
          <p>Begin with one intelligent formula, or discover the complete phase system.</p>
          <button className="velora-button velora-button-dark" onClick={onClose} type="button">Explore formulas <ArrowIcon /></button>
        </div>
      )}
    </DialogShell>
  );
}

export function SearchOverlay({ onClose, openQuickView }: { onClose: () => void; openQuickView: (product: Product) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products.slice(0, 4);
    return products.filter((product) => [product.name, product.ritual, product.category, product.description].join(" ").toLowerCase().includes(normalized));
  }, [query]);

  return (
    <DialogShell className="search-overlay" label="Search VELORA" onClose={onClose}>
      <DialogHeader eyebrow="Find your phase" onClose={onClose} title="Search" />
      <div className="search-field">
        <SearchIcon size={28} />
        <label className="sr-only" htmlFor="store-search">Search products</label>
        <input data-dialog-autofocus id="store-search" onChange={(event) => setQuery(event.target.value)} placeholder="What does your skin need?" type="search" value={query} />
        {query && <button aria-label="Clear search" onClick={() => setQuery("")} type="button"><CloseIcon size={17} /></button>}
      </div>
      <div className="search-categories"><span>Explore</span>{["Cleanse", "Treat", "Hydrate", "Moisturize"].map((category) => <button key={category} onClick={() => setQuery(category)} type="button">{category}</button>)}</div>
      <div className="search-results">
        <div className="search-results-label"><span>{query ? `${filtered.length} result${filtered.length === 1 ? "" : "s"}` : "Suggested phases"}</span><small>FORMULA / PRICE</small></div>
        {filtered.length ? filtered.map((product) => (
          <button className="search-result" key={product.id} onClick={() => openQuickView(product)} type="button">
            <span className="search-thumb"><Image alt="" fill sizes="100px" src={product.image} /></span>
            <span><small>{product.ritual}</small><strong>{product.name}</strong></span>
            <span>${product.price}</span><ArrowIcon diagonal />
          </button>
        )) : <p className="no-results">No exact phase found. Try “hydrate” or “cleanse”.</p>}
      </div>
    </DialogShell>
  );
}

export function WishlistDrawer({
  wishlist,
  onClose,
  addToCart,
  toggleWishlist,
  openQuickView,
}: {
  wishlist: string[];
  onClose: () => void;
  addToCart: (product: Product) => void;
  toggleWishlist: (productId: string) => void;
  openQuickView: (product: Product) => void;
}) {
  const wishedProducts = products.filter((product) => wishlist.includes(product.id));
  return (
    <DialogShell className="commerce-drawer wishlist-drawer" label="Wishlist" onClose={onClose}>
      <DialogHeader eyebrow="Held in your orbit" onClose={onClose} title="Wishlist" />
      {wishedProducts.length ? (
        <div className="wishlist-items">
          {wishedProducts.map((product) => (
            <article key={product.id}>
              <button className="wishlist-product-image" onClick={() => openQuickView(product)} type="button"><Image alt={product.name} fill sizes="180px" src={product.image} /></button>
              <div><small>{product.ritual}</small><h3>{product.name}</h3><strong>${product.price}</strong></div>
              <button aria-label={`Remove ${product.name} from wishlist`} className="wishlist-remove" onClick={() => toggleWishlist(product.id)} type="button"><HeartIcon filled /></button>
              <button className="wishlist-add" onClick={() => addToCart(product)} type="button">Add to cart <PlusIcon /></button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-commerce"><div className="empty-orbit" aria-hidden="true"><HeartIcon /></div><h3>Nothing held—yet.</h3><p>Save a formula while you explore and it will wait here.</p><button className="velora-button velora-button-dark" onClick={onClose} type="button">Explore formulas <ArrowIcon /></button></div>
      )}
    </DialogShell>
  );
}

export function QuickView({
  product,
  onClose,
  addToCart,
  toggleWishlist,
  wishlist,
  openProduct,
}: {
  product: Product;
  onClose: () => void;
  addToCart: (product: Product, size: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  wishlist: string[];
  openProduct: (product: Product) => void;
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [gallery, setGallery] = useState(0);
  const wished = wishlist.includes(product.id);
  const related = products.filter(({ id, category }) => id !== product.id && category === product.category).slice(0, 2);

  return (
    <DialogShell className="quick-view-overlay" label={`Quick view ${product.name}`} onClose={onClose}>
      <button aria-label="Close quick view" className="quick-view-close" onClick={onClose} type="button"><CloseIcon /></button>
      <div className={`quick-view-gallery gallery-view-${gallery}`}>
        <div className="quick-view-image"><Image alt={`${product.name}, view ${gallery + 1}`} className={product.imageClass} fill sizes="(max-width: 767px) 100vw, 52vw" src={product.image} /></div>
        <div className="gallery-selector" aria-label="Product image gallery" role="group">
          {[0, 1, 2].map((index) => <button aria-label={`View product image ${index + 1}`} aria-pressed={gallery === index} key={index} onClick={() => setGallery(index)} type="button"><Image alt="" fill sizes="64px" src={product.image} /></button>)}
        </div>
      </div>
      <div className="quick-view-copy">
        <div className="quick-view-topline"><span>{product.ritual}</span>{product.badge && <small>{product.badge}</small>}</div>
        <h2>{product.name}</h2>
        <div className="quick-view-price"><strong>${product.price}</strong>{product.originalPrice && <s>${product.originalPrice}</s>}<span><StarIcon size={12} /> {product.rating} · {product.reviews} reviews</span></div>
        <p className="quick-view-description">{product.description}</p>
        <ul>{product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
        <fieldset className="variant-picker"><legend>Choose size</legend><div>{product.sizes.map((productSize) => <button aria-pressed={size === productSize} key={productSize} onClick={() => setSize(productSize)} type="button">{productSize}</button>)}</div></fieldset>
        <div className="quick-view-actions">
          <div className="quantity-control" aria-label={`Quantity for ${product.name}`} role="group"><button aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button"><MinusIcon /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} type="button"><PlusIcon /></button></div>
          <button className="velora-button velora-button-dark" onClick={() => addToCart(product, size, quantity)} type="button">Add to ritual · ${product.price * quantity}</button>
          <button aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished} className={`quick-wish${wished ? " is-wished" : ""}`} onClick={() => toggleWishlist(product.id)} type="button"><HeartIcon filled={wished} /></button>
        </div>
        <div className="quick-view-notes"><p><span>FORMULA</span>Dermatologist tested · Fragrance-free · Vegan</p><p><span>DELIVERY</span>Free shipping over $75 · 30-day returns</p></div>
        {related.length > 0 && <div className="related-products"><span>Complete the phase</span>{related.map((item) => <button key={item.id} onClick={() => openProduct(item)} type="button"><i><Image alt="" fill sizes="72px" src={item.image} /></i><span><small>{item.ritual}</small><strong>{item.name}</strong></span><em>${item.price}</em></button>)}</div>}
      </div>
    </DialogShell>
  );
}

export function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div animate={{ opacity: 1 }} className="velora-loader" exit={{ opacity: 0, y: "-100%" }} initial={{ opacity: 1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
          <span className="loader-mark"><i /></span><strong>VELORA</strong><small>SKIN IN ANOTHER STATE</small><b />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && <motion.div animate={{ opacity: 1, y: 0 }} className="velora-toast" exit={{ opacity: 0, y: 18 }} initial={{ opacity: 0, y: 18 }} role="status"><span />{message}</motion.div>}
    </AnimatePresence>
  );
}
