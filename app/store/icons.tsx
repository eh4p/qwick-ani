type IconProps = { size?: number; className?: string };

function Icon({ children, size = 20, className }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return <Icon {...props}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></Icon>;
}

export function BagIcon(props: IconProps) {
  return <Icon {...props}><path d="M5 8.5h14l-1 12H6l-1-12Z" /><path d="M9 9V6.5a3 3 0 0 1 6 0V9" /></Icon>;
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <Icon {...props}>
      <path
        d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"
        fill={filled ? "currentColor" : "none"}
      />
    </Icon>
  );
}

export function UserIcon(props: IconProps) {
  return <Icon {...props}><circle cx="12" cy="8" r="3.5" /><path d="M4.5 21c.7-4.1 3.2-6.2 7.5-6.2s6.8 2.1 7.5 6.2" /></Icon>;
}

export function CloseIcon(props: IconProps) {
  return <Icon {...props}><path d="m5 5 14 14M19 5 5 19" /></Icon>;
}

export function ArrowIcon({ diagonal = false, ...props }: IconProps & { diagonal?: boolean }) {
  return <Icon {...props} className={diagonal ? "icon-diagonal" : props.className}><path d="M4 12h16m-6-6 6 6-6 6" /></Icon>;
}

export function PlusIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 4v16M4 12h16" /></Icon>;
}

export function MinusIcon(props: IconProps) {
  return <Icon {...props}><path d="M4 12h16" /></Icon>;
}

export function MenuIcon(props: IconProps) {
  return <Icon {...props}><path d="M4 8h16M4 16h16" /></Icon>;
}

export function StarIcon(props: IconProps) {
  return <Icon {...props}><path fill="currentColor" d="m12 2 2.75 6 6.25.72-4.62 4.3 1.24 6.15L12 16.08l-5.62 3.1 1.24-6.16L3 8.72 9.25 8 12 2Z" stroke="none" /></Icon>;
}
