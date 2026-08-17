"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import s from "./Gallery.module.css";

export function VelaireMark({ light = false }: { light?: boolean }) {
  return (
    <a className={`${s.mark} ${light ? s.markLight : ""}`} href="#gallery-top">
      <span aria-hidden="true">V</span>
      <b>VELAIRE</b>
    </a>
  );
}

export function Media({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img className={`${s.media} ${className}`} src={src} alt={alt} loading="lazy" />;
}

export function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "←" : "→"}</span>;
}

export function AddButton({ compact = false }: { compact?: boolean }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      className={`${s.addButton} ${compact ? s.addCompact : ""}`}
      type="button"
      onClick={() => setAdded(true)}
      aria-live="polite"
    >
      {added ? "Added ✓" : "Quick add"}
    </button>
  );
}

export function WishlistButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      className={s.wishlist}
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={() => setSaved((value) => !value)}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}

export type TabItem = {
  label: string;
  eyebrow?: string;
  title: string;
  copy: string;
  image: string;
  meta?: string;
};

export function TabSwitcher({
  items,
  variant,
}: {
  items: TabItem[];
  variant: "line" | "display" | "image" | "vertical" | "rail";
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const item = items[active];

  function move(next: number) {
    const index = (next + items.length) % items.length;
    setActive(index);
    document.getElementById(`${id}-tab-${index}`)?.focus();
  }

  return (
    <div className={`${s.tabSwitcher} ${s[`tab_${variant}`]}`}>
      <div className={s.tabList} role="tablist" aria-label="Explore Velaire collections">
        {items.map((tab, index) => (
          <button
            id={`${id}-tab-${index}`}
            key={tab.label}
            role="tab"
            type="button"
            aria-selected={index === active}
            aria-controls={`${id}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") move(active + 1);
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") move(active - 1);
            }}
          >
            {variant === "image" && <Media src={tab.image} alt="" />}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={s.tabPanel} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
        <div className={s.tabMediaWrap}>
          <Media src={item.image} alt={`${item.label} collection`} />
          {item.meta && <small>{item.meta}</small>}
        </div>
        <div className={s.tabCopy}>
          <span>{item.eyebrow ?? `0${active + 1} / 0${items.length}`}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <a href="#cards">Explore {item.label} <Arrow /></a>
        </div>
      </div>
    </div>
  );
}

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" | "accent" }) {
  const [sent, setSent] = useState(false);
  const id = useId();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className={`${s.newsForm} ${s[`newsForm_${tone}`]}`} onSubmit={submit}>
      <label htmlFor={id}>Email address</label>
      <div>
        <input id={id} type="email" autoComplete="email" placeholder="you@example.com" required />
        <button type="submit">{sent ? "You’re on the list ✓" : "Join the list"}</button>
      </div>
      <p role="status">{sent ? "Welcome to the inner circle." : "Beauty notes, not inbox noise. Unsubscribe anytime."}</p>
    </form>
  );
}

export function Carousel({
  children,
  label,
  variant,
}: {
  children: ReactNode;
  label: string;
  variant: "peek" | "center" | "cinema" | "commerce" | "stories";
}) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  function scroll(direction: number) {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.72, behavior: "smooth" });
  }

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const update = () => {
      const max = node.scrollWidth - node.clientWidth;
      setProgress(max ? node.scrollLeft / max : 0);
    };
    update();
    node.addEventListener("scroll", update, { passive: true });
    return () => node.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={`${s.carousel} ${s[`carousel_${variant}`]}`}>
      <div className={s.carouselHead}>
        <p>{label}</p>
        <div>
          <button type="button" onClick={() => scroll(-1)} aria-label={`Previous ${label} slide`}><Arrow direction="left" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Next ${label} slide`}><Arrow /></button>
        </div>
      </div>
      <div
        className={s.carouselTrack}
        ref={track}
        tabIndex={0}
        aria-label={`${label} carousel. Use left and right arrow keys to browse.`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") scroll(-1);
          if (event.key === "ArrowRight") scroll(1);
        }}
      >
        {children}
      </div>
      <div className={s.carouselProgress} aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} /></div>
    </div>
  );
}
