export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  target: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  videoPath: string
  eyebrow: string
  titleLine: string
  titleEmphasis: string
  subtitleLine1: string
  subtitleLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface ManifestoConfig {
  sectionLabel: string
  text: string
}

export interface AnatomyPillar {
  label: string
  title: string
  body: string
  link: string
}

export interface AnatomyConfig {
  sectionLabel: string
  title: string
  pillars: AnatomyPillar[]
}

export interface TierConfig {
  name: string
  price: string
  frequency: string
  journeys: string
  image: string
  description: string
  amenities: string[]
  ctaText: string
  ctaHref: string
}

export interface TiersConfig {
  sectionLabel: string
  title: string
  tiers: TierConfig[]
}

export interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number | null
  badge: string
  badgeColor: string
  rating: number
  description: string
  image: string
}

export interface Testimonial {
  id: number
  quote: string
  author: string
  stars: number
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: FooterLink[]
}

export interface FooterConfig {
  ageGateText: string
  brandName: string
  brandTaglineLines: string[]
  columns: FooterColumn[]
  copyright: string
}

// Site config
export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "HappyTailsIndia - Premium Pet Supplies",
  siteDescription: "Handpicked toys, beds, and essentials for dogs, cats, birds, and small pets. Free shipping on orders over $50.",
}

// Navigation
export const navigationConfig: NavigationConfig = {
  brandName: "HAPPY TAILS INDIA",
  links: [
    { label: "SHOP", target: "#products" },
    { label: "CATEGORIES", target: "#anatomy" },
    { label: "ABOUT", target: "#manifesto" },
  ],
}

// Hero
export const heroConfig: HeroConfig = {
  videoPath: "videos/hero.mp4",
  eyebrow: "PREMIUM PET ESSENTIALS",
  titleLine: "Everything Your",
  titleEmphasis: "Pet Deserves",
  subtitleLine1: "Handpicked toys, beds, and essentials for dogs, cats, birds, and small pets.",
  subtitleLine2: "Free shipping on orders over $50.",
  ctaText: "SHOP NOW",
  ctaTargetId: "#products",
}

// Manifesto
export const manifestoConfig: ManifestoConfig = {
  sectionLabel: "OUR PROMISE",
  text: "We believe every pet deserves the same quality of life we give ourselves. That's why we source only the finest materials, partner with ethical manufacturers, and personally test every product with our own furry, feathered, and finned family members. When you shop with PetPal, you're not just buying a product \u2014 you're giving your companion the comfort, safety, and joy they deserve.",
}

// Pet Categories (Anatomy section)
export const anatomyConfig: AnatomyConfig = {
  sectionLabel: "BROWSE BY PET",
  title: "Find the Perfect Products for Your Companion",
  pillars: [
    {
      label: "CANINE COLLECTION",
      title: "Premium Care for Your Best Friend",
      body: "From orthopedic memory-foam beds to indestructible chew toys and grain-free dental treats \u2014 everything your dog needs for a healthy, happy life. Our dog collection is curated by veterinarians and tested by real pups.",
      link: "SHOP DOG PRODUCTS \u2192",
    },
    {
      label: "FELINE ESSENTIALS",
      title: "Pamper Your Purr-fect Companion",
      body: "Ultra-soft loungers, interactive feather wands, premium scratching posts, and calming pheromone diffusers. Our cat collection combines function with feline-approved design \u2014 because your cat deserves to rule their domain in comfort.",
      link: "SHOP CAT PRODUCTS \u2192",
    },
    {
      label: "AVIAN SUPPLIES",
      title: "Colorful Comfort for Feathered Friends",
      body: "Vibrant swing perches, natural wood chew toys, nutritional seed blends, and spacious flight cages. Every product in our bird collection is made with bird-safe materials and designed to enrich your avian companion's daily life.",
      link: "SHOP BIRD PRODUCTS \u2192",
    },
    {
      label: "AQUATIC ESSENTIALS",
      title: "Create an Underwater Paradise",
      body: "LED lighting systems, precision filtration, decorative aquascaping elements, and premium fish nutrition. Our aquatic collection helps you build a thriving ecosystem that brings the serenity of the ocean into your home.",
      link: "SHOP FISH PRODUCTS \u2192",
    },
    {
      label: "SMALL PET COLLECTION",
      title: "Cozy Comfort for Tiny Companions",
      body: "Natural hideout houses, exercise wheels, timothy hay feeders, and gentle grooming tools for hamsters, rabbits, guinea pigs, and more. Every item is sized right and made with pet-safe materials for your smallest family members.",
      link: "SHOP SMALL PET PRODUCTS \u2192",
    },
  ],
}

// Products (Tiers section repurposed as featured product showcases)
export const tiersConfig: TiersConfig = {
  sectionLabel: "FEATURED COLLECTIONS",
  title: "Curated for Every Companion",
  tiers: [
    {
      name: "Dog Essentials",
      price: "From $19",
      frequency: "per item",
      journeys: "200+ PRODUCTS",
      image: "images/tier-dogs.jpg",
      description: "Our most popular collection features everything from orthopedic beds and no-pull harnesses to grain-free treats and interactive toys. Every item is vet-approved and pup-tested.",
      amenities: ["Orthopedic memory-foam beds", "Adjustable no-pull harnesses", "Grain-free dental treats", "Indestructible chew toys", "Waterproof outdoor gear"],
      ctaText: "SHOP DOG ESSENTIALS",
      ctaHref: "#products",
    },
    {
      name: "Cat Comfort",
      price: "From $14",
      frequency: "per item",
      journeys: "150+ PRODUCTS",
      image: "images/tier-cats.jpg",
      description: "A carefully curated selection of loungers, interactive toys, and wellness products designed specifically for feline instincts. Because a happy cat means a happy home.",
      amenities: ["Self-warming donut beds", "Interactive feather wands", "Stainless steel water fountains", "Premium catnip blends", "Vertical scratching posts"],
      ctaText: "SHOP CAT COMFORT",
      ctaHref: "#products",
    },
    {
      name: "Bird \u0026 Small Pet",
      price: "From $12",
      frequency: "per item",
      journeys: "100+ PRODUCTS",
      image: "images/tier-birds.jpg",
      description: "Vibrant, safe, and enriching products for birds, hamsters, rabbits, and all small companions. Made with natural, non-toxic materials that prioritize their wellbeing.",
      amenities: ["Natural wood perches", "Colorful rope swings", "LED habitat lighting", "Timothy hay feeders", "Wooden hideout houses"],
      ctaText: "SHOP BIRD \u0026 SMALL PET",
      ctaHref: "#products",
    },
  ],
}

// Products data
export const products: Product[] = [
  {
    id: 1,
    name: "UltraSoft Pet Bed Deluxe",
    category: "Dogs \u0026 Cats",
    price: 49.99,
    originalPrice: 79.99,
    badge: "Best Seller",
    badgeColor: "#938977",
    rating: 4.9,
    description: "Luxury memory foam pet bed with orthopedic support and removable washable cover.",
    image: "images/product-1.jpg",
  },
  {
    id: 2,
    name: "Interactive Feather Wand Toy",
    category: "Cats",
    price: 14.99,
    originalPrice: null,
    badge: "New Arrival",
    badgeColor: "#180c04",
    rating: 4.7,
    description: "Extendable feather wand with bell and replaceable attachments for endless feline fun.",
    image: "images/product-2.jpg",
  },
  {
    id: 3,
    name: "Stainless Steel Auto Water Fountain",
    category: "Dogs \u0026 Cats",
    price: 34.99,
    originalPrice: 54.99,
    badge: "Sale",
    badgeColor: "#c45b4a",
    rating: 4.8,
    description: "Whisper-quiet circulating water fountain with triple filtration and 2.4L capacity.",
    image: "images/product-3.jpg",
  },
  {
    id: 4,
    name: "Adjustable Comfort Harness",
    category: "Dogs",
    price: 24.99,
    originalPrice: null,
    badge: "Top Rated",
    badgeColor: "#4a7c59",
    rating: 4.9,
    description: "Breathable mesh harness with reflective strips and no-pull front clip design.",
    image: "images/product-4.jpg",
  },
  {
    id: 5,
    name: "Grain-Free Dental Chew Sticks",
    category: "Dogs",
    price: 19.99,
    originalPrice: null,
    badge: "Best Seller",
    badgeColor: "#938977",
    rating: 4.6,
    description: "Natural grain-free dental chews that freshen breath and reduce tartar buildup.",
    image: "images/product-5.jpg",
  },
  {
    id: 6,
    name: "Colorful Bird Swing Perch Set",
    category: "Birds",
    price: 12.99,
    originalPrice: null,
    badge: "New Arrival",
    badgeColor: "#180c04",
    rating: 4.5,
    description: "Vibrant 5-piece swing and perch set with natural wood and bird-safe dyes.",
    image: "images/product-6.jpg",
  },
  {
    id: 7,
    name: "Aquarium LED Light Strip",
    category: "Fish",
    price: 29.99,
    originalPrice: 44.99,
    badge: "Sale",
    badgeColor: "#c45b4a",
    rating: 4.7,
    description: "Full-spectrum RGB aquarium LED with remote control and programmable timer.",
    image: "images/product-7.jpg",
  },
  {
    id: 8,
    name: "Small Pet Hideout Wooden House",
    category: "Small Pets",
    price: 22.99,
    originalPrice: null,
    badge: "Top Rated",
    badgeColor: "#4a7c59",
    rating: 4.8,
    description: "Handcrafted wooden hideout with multiple entrances, perfect for hamsters and guinea pigs.",
    image: "images/product-8.jpg",
  },
]

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "My golden retriever has never slept better. The UltraSoft bed is worth every penny \u2014 you can see the quality in every stitch.",
    author: "Sarah M., Dog Mom",
    stars: 5,
  },
  {
    id: 2,
    quote: "Finally a water fountain my cats actually use! It's whisper quiet and the filtration system keeps the water crystal clear.",
    author: "David L., Cat Dad",
    stars: 5,
  },
  {
    id: 3,
    quote: "The bird swing set transformed my parakeet's cage. He spends hours playing and the colors are so vibrant. Highly recommend!",
    author: "Emily R., Bird Owner",
    stars: 5,
  },
]

// Footer
export const footerConfig: FooterConfig = {
  ageGateText: "Because they're family.",
  brandName: "Happy Tails India",
  brandTaglineLines: ["Premium pet essentials for every kind of companion."],
  columns: [
    {
      heading: "SHOP",
      links: [
        { label: "Dog Products", href: "#products" },
        { label: "Cat Products", href: "#products" },
        { label: "Bird Supplies", href: "#products" },
        { label: "Fish Essentials", href: "#products" },
        { label: "Small Pets", href: "#products" },
      ],
    },
    {
      heading: "COMPANY",
      links: [
        { label: "About Us", href: "#manifesto" },
        { label: "Our Story", href: "#manifesto" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      heading: "SUPPORT",
      links: [
        { label: "Contact Us", href: "#" },
        { label: "Shipping Info", href: "#" },
        { label: "Returns Policy", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Track Order", href: "#" },
      ],
    },
    {
      heading: "CONNECT",
      links: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "TikTok", href: "#" },
        { label: "Pinterest", href: "#" },
      ],
    },
  ],
  copyright: "\u00a9 2025 HappyTailsIndia. All rights reserved.",
}
