import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import Navbar from "./navbar/Navbar";

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
      <Navbar
        logo={<img src="/logo_icons.svg" alt="Icons" className="h-7 w-auto" />}
        items={navItems}
      />
      <main className={cn("relative z-10 pt-24")}>{children}</main>
      <Footer />
    </div>
  );
}
