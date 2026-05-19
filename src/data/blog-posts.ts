export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "creator-commerce",
    category: "Industry News",
    title: "The Future of Creator Commerce is Here — and It's Not What You Expected",
    excerpt: "As brand budgets shift from traditional ads to creator-first strategies, the platforms that survive will be the ones that put authenticity over algorithms.",
    date: "Apr 28, 2026",
    readTime: "6 min read",
    author: "Sara Malik",
    authorRole: "Co-Founder & CEO",
  },
  {
    slug: "brand-brief",
    category: "Creator Tips",
    title: "How to Write a Brand Brief That Actually Gets You Booked",
    excerpt: "Most creators pitch wrong. Here's the one-page framework that gets responses.",
    date: "Apr 22, 2026",
    readTime: "4 min read",
    author: "Lena Vogel",
    authorRole: "Creator Partnerships Lead",
  },
  {
    slug: "influencer-campaign",
    category: "Brand Strategy",
    title: "Why Your Last Influencer Campaign Failed (and How to Fix It)",
    excerpt: "Vanity metrics don't drive sales. We break down the numbers that actually matter.",
    date: "Apr 18, 2026",
    readTime: "5 min read",
    author: "Tomás Rivera",
    authorRole: "Head of Brand Strategy",
  },
  {
    slug: "glowbeauty",
    category: "Case Studies",
    title: "GlowBeauty's 3M-Impression Campaign: A Full Breakdown",
    excerpt: "We go inside the strategy, creator selection, and creative brief that drove results.",
    date: "Apr 14, 2026",
    readTime: "7 min read",
    author: "Sara Malik",
    authorRole: "Co-Founder & CEO",
  },
  {
    slug: "negotiate",
    category: "Creator Tips",
    title: "Negotiate Like a Pro: Getting Paid What You're Worth",
    excerpt: "A former brand manager reveals exactly how much creators should be charging.",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    author: "Lena Vogel",
    authorRole: "Creator Partnerships Lead",
  },
  {
    slug: "algorithm",
    category: "Industry News",
    title: "Platform Algorithm Changes: What Creators Need to Know Now",
    excerpt: "The latest shifts across TikTok, Instagram, and YouTube — and how to adapt fast.",
    date: "Apr 05, 2026",
    readTime: "4 min read",
    author: "James Okafor",
    authorRole: "Platform Intelligence Analyst",
  },
  {
    slug: "roster",
    category: "Brand Strategy",
    title: "Building a Year-Long Creator Roster (Without a Big Budget)",
    excerpt: "Micro-creators consistently outperform mega-influencers in conversion. Here's why.",
    date: "Apr 01, 2026",
    readTime: "6 min read",
    author: "Tomás Rivera",
    authorRole: "Head of Brand Strategy",
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

export const categoryTone: Record<string, string> = {
  "Creator Tips":   "gradient-accent",
  "Brand Strategy": "gradient-cool",
  "Industry News":  "gradient-warm",
  "Case Studies":   "gradient-mono",
};
