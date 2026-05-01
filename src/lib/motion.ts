// Motion design system tokens
// Import from here — never hardcode durations or easing strings in components

export const ease = {
  out:       "power4.out",
  inOut:     "power3.inOut",
  bounce:    "back.out(1.4)",
  spring:    "elastic.out(1, 0.4)",
  cinematic: "expo.out",
  scrub:     "none",
} as const;

export const dur = {
  instant: 0.15,
  fast:    0.35,
  base:    0.6,
  slow:    0.9,
  epic:    1.4,
} as const;

export const stagger = {
  tight:  0.05,
  normal: 0.07,
  wide:   0.12,
  cards:  0.15,
} as const;

export const delay = {
  section: 0.2,
  after:   (d: number) => d + 0.1,
} as const;

// Shared ScrollTrigger defaults — spread and override as needed
export const scrollDefaults = {
  start:         "top 85%",
  toggleActions: "play none none reverse" as const,
};
