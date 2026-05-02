import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import BubbleMenu from "./navbar/BubbleMenu";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const navItems = [
  {
    label: "creators",
    href: "/creators",
    ariaLabel: "For Creators",
    rotation: -8,
    hoverStyles: { bgColor: "#F5C518", textColor: "#000" },
  },
  {
    label: "brands",
    href: "/brands",
    ariaLabel: "For Brands",
    rotation: -4,
    hoverStyles: { bgColor: "#6366f1", textColor: "#fff" },
  },
  {
    label: "about",
    href: "/about",
    ariaLabel: "About Icons",
    rotation: 4,
    hoverStyles: { bgColor: "#10b981", textColor: "#fff" },
  },
  {
    label: "blog",
    href: "/blog",
    ariaLabel: "Icons Blog",
    rotation: 8,
    hoverStyles: { bgColor: "#f97316", textColor: "#fff" },
  },
  {
    label: "contact",
    href: "/contact",
    ariaLabel: "Contact Icons",
    rotation: -4,
    hoverStyles: { bgColor: "#ef4444", textColor: "#fff" },
  },
];

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen relative bg-(--color-bg) text-(--color-fg)",
        className,
      )}
    >
      <BubbleMenu
        logo={<img src="/logo_icons.svg" alt="Icons" className="h-7 w-auto" />}
        items={navItems}
        menuAriaLabel="Toggle navigation"
        menuBg="#0f0f0f"
        menuContentColor="#ffffff"
        pillBg="#f0f0f0"
        pillColor="#0a0a0a"
        useFixedPosition={true}
        animationEase="expo.out"
        animationDuration={0.45}
        staggerDelay={0.08}
      />
      <main className={cn("relative z-10")}>{children}</main>
      <Footer />
    </div>
  );
}
