"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import s from "./Fitness.module.css";

export function NthMark({ inverse = false }: { inverse?: boolean }) {
  return <a className={`${s.nthMark} ${inverse ? s.inverse : ""}`} href="#fitness-top" aria-label="NTH Form component library"><b>NTH</b><i>/</i><span>FORM</span></a>;
}

export function FitMedia({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img className={`${s.fitMedia} ${className}`} src={src} alt={alt} loading="lazy" />;
}

export function CartAction({ small = false }: { small?: boolean }) {
  const [added, setAdded] = useState(false);
  return <button className={`${s.cartAction} ${small ? s.cartSmall : ""}`} type="button" onClick={() => setAdded(true)} aria-live="polite">{added ? "IN KIT ✓" : "ADD TO KIT +"}</button>;
}

export function SaveAction() {
  const [saved, setSaved] = useState(false);
  return <button className={s.saveAction} type="button" onClick={() => setSaved(!saved)} aria-pressed={saved} aria-label={saved ? "Remove from saved gear" : "Save gear"}>{saved ? "●" : "○"}</button>;
}

export function CaptureForm({ mode = "dark", button = "GET THE SIGNAL" }: { mode?: "dark" | "light" | "lime"; button?: string }) {
  const [sent, setSent] = useState(false);
  const id = useId();
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <form className={`${s.capture} ${s[`capture_${mode}`]}`} onSubmit={submit}><label htmlFor={id}>Email address</label><div><input id={id} type="email" autoComplete="email" placeholder="ATHLETE@EMAIL.COM" required/><button type="submit">{sent ? "LOCKED IN ✓" : button}</button></div><p role="status">{sent ? "Signal received. Your first dispatch is queued." : "Practical training intelligence. Zero motivational wallpaper."}</p></form>;
}

export type FitTab = { label: string; code: string; title: string; copy: string; image: string; stat: string };

export function FitTabs({ items, mode }: { items: FitTab[]; mode: "bar" | "vertical" | "tiles" | "spec" | "days" }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const item = items[active];
  function move(next: number) {
    const index = (next + items.length) % items.length;
    setActive(index);
    document.getElementById(`${uid}-fit-tab-${index}`)?.focus();
  }
  return <div className={`${s.fitTabs} ${s[`fitTabs_${mode}`]}`}>
    <div className={s.fitTabList} role="tablist" aria-label="Training categories">{items.map((tab,index)=><button key={tab.label} id={`${uid}-fit-tab-${index}`} role="tab" type="button" aria-selected={index===active} aria-controls={`${uid}-fit-panel`} tabIndex={index===active?0:-1} onClick={()=>setActive(index)} onKeyDown={(event)=>{if(event.key==="ArrowRight"||event.key==="ArrowDown")move(active+1);if(event.key==="ArrowLeft"||event.key==="ArrowUp")move(active-1);}}>{mode==="tiles"&&<FitMedia src={tab.image} alt=""/>}<small>{tab.code}</small><span>{tab.label}</span></button>)}</div>
    <div className={s.fitTabPanel} id={`${uid}-fit-panel`} role="tabpanel" aria-labelledby={`${uid}-fit-tab-${active}`}><div className={s.fitTabMedia}><FitMedia src={item.image} alt={`${item.label} training`}/><b>{item.stat}</b></div><div className={s.fitTabCopy}><span>{item.code} / ACTIVE</span><h3>{item.title}</h3><p>{item.copy}</p><a href="#cards">VIEW SYSTEM ↗</a></div></div>
  </div>;
}

export function FitCarousel({ children, label, mode }: { children: ReactNode; label: string; mode: "wide" | "center" | "cinema" | "compact" | "logs" }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(.08);
  function move(direction: number) { const node=track.current; if(node) node.scrollBy({left:direction*node.clientWidth*.78,behavior:"smooth"}); }
  useEffect(()=>{const node=track.current;if(!node)return;const update=()=>{const max=node.scrollWidth-node.clientWidth;setProgress(max?Math.max(.08,node.scrollLeft/max):1)};node.addEventListener("scroll",update,{passive:true});return()=>node.removeEventListener("scroll",update)},[]);
  return <div className={`${s.fitCarousel} ${s[`fitCarousel_${mode}`]}`}><header><span>{label}</span><div><button type="button" aria-label={`Previous ${label}`} onClick={()=>move(-1)}>←</button><button type="button" aria-label={`Next ${label}`} onClick={()=>move(1)}>→</button></div></header><div className={s.fitTrack} ref={track} tabIndex={0} aria-label={`${label} carousel. Use left and right arrow keys to browse.`} onKeyDown={(event)=>{if(event.key==="ArrowLeft")move(-1);if(event.key==="ArrowRight")move(1)}}>{children}</div><div className={s.fitProgress} aria-hidden="true"><i style={{transform:`scaleX(${progress})`}}/></div></div>;
}
