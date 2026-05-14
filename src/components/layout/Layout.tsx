import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import Header from "./navbar/Header";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen relative bg-(--color-bg) text-(--color-fg)",
        className,
      )}
    >
      <Header />
      <main className={cn("relative z-10 pt-24")}>{children}</main>
      <Footer />
    </div>
  );
}
