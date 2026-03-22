'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Check,
  Star,
  Menu,
  X,
  Moon,
  Sun,
  Package,
  Users,
  Code,
  HeadphonesIcon,
  ArrowRight,
  Github,
  Twitter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  features: string;
  tier: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

const PATREON_URL = 'https://www.patreon.com/yusukedao';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance that keeps your workflow smooth and efficient.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee.',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description: 'Clean APIs, extensive documentation, and SDK support.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Dedicated support team ready to help you anytime.',
  },
  {
    icon: Clock,
    title: 'Regular Updates',
    description: 'Continuous improvements with new features every month.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join thousands of developers building amazing products.',
  },
];

const faqs = [
  {
    question: 'How does Patreon payment work?',
    answer: 'Simply click the "Get Access" button and you\'ll be redirected to our Patreon page. Choose your tier and unlock instant access to all products in that tier. Your subscription helps us continue developing amazing software.',
  },
  {
    question: 'Can I upgrade my tier later?',
    answer: 'Absolutely! You can upgrade your Patreon tier at any time. You\'ll immediately get access to all products in your new tier plus everything from lower tiers.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 7-day money-back guarantee for all new subscribers. If you\'re not satisfied with our products, contact us within 7 days for a full refund.',
  },
  {
    question: 'How do I access the software after subscribing?',
    answer: 'After subscribing on Patreon, you\'ll receive access to our exclusive Discord channel and download portal. All software, updates, and documentation will be available there.',
  },
  {
    question: 'Can I use the software commercially?',
    answer: 'Yes! All our Pro and Enterprise tiers include commercial licenses. Check each product\'s documentation for specific licensing terms.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Patreon accepts all major credit cards, PayPal, and in some regions, Apple Pay and Google Pay. Payments are processed securely through Patreon.',
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check theme preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches || document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    // Seed and fetch data
    async function loadData() {
      try {
        // Seed database
        await fetch('/api/seed', { method: 'POST' });

        // Fetch products and testimonials
        const [productsRes, testimonialsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/testimonials'),
        ]);

        const productsData = await productsRes.json();
        const testimonialsData = await testimonialsRes.json();

        setProducts(productsData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case 'basic':
        return 'secondary';
      case 'pro':
        return 'default';
      case 'enterprise':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic':
        return 'from-emerald-500 to-teal-500';
      case 'pro':
        return 'from-violet-500 to-purple-500';
      case 'enterprise':
        return 'from-amber-500 to-orange-500';
      default:
        return 'from-slate-500 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">YusukeDAO</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button asChild className="hidden md:flex">
              <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                Subscribe <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#products"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <a
                href="#faq"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button asChild className="flex-1">
                  <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                    Subscribe
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" /> Premium Software Products
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Build Amazing Products{' '}
              <span className="gradient-text">Faster</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Premium software tools crafted for developers who demand quality. 
              Join our Patreon community and get instant access to all products.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg" className="px-8 glow">
                <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                  Get Access Now <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#products">View Products</a>
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Lifetime Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Priority Support</span>
              </div>
            </motion.div>
          </div>

          {/* Floating decoration */}
          <div className="hidden lg:block absolute top-1/2 left-10 -translate-y-1/2 float-animation">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Code className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="hidden lg:block absolute top-1/3 right-16 float-animation" style={{ animationDelay: '2s' }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Products</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the tier that fits your needs. All plans include lifetime updates and access to our community.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-card border p-6">
                  <div className="shimmer h-8 w-24 rounded mb-4" />
                  <div className="shimmer h-12 w-32 rounded mb-4" />
                  <div className="shimmer h-4 w-full rounded mb-2" />
                  <div className="shimmer h-4 w-3/4 rounded mb-6" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="shimmer h-4 w-full rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`relative overflow-hidden h-full card-hover ${product.tier === 'pro' ? 'border-primary shadow-lg scale-105' : ''}`}>
                    {product.tier === 'pro' && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                    )}
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTierColor(product.tier)} flex items-center justify-center`}>
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant={getTierBadgeVariant(product.tier)} className="capitalize">
                          {product.tier}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold">${product.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <ul className="space-y-3">
                        {JSON.parse(product.features).map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className={`w-full ${product.tier === 'pro' ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' : ''}`}
                        variant={product.tier === 'pro' ? 'default' : 'outline'}
                      >
                        <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                          Get Access <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We build software with developers in mind. Here&apos;s what sets our products apart.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full card-hover">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Developers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied developers who trust our products.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-card border p-6">
                  <div className="shimmer h-4 w-20 rounded mb-4" />
                  <div className="shimmer h-16 w-full rounded mb-4" />
                  <div className="shimmer h-4 w-24 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover">
                    <CardHeader>
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <CardDescription className="text-base text-foreground">
                        &quot;{testimonial.content}&quot;
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Common Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our products and subscription.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <AccordionItem value={`item-${index}`} className="bg-card rounded-xl px-6 border">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <span className="text-left font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community on Patreon and unlock access to all premium software products. 
              Start building amazing things today.
            </p>
            <Button asChild size="lg" className="px-8 glow">
              <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.82 2.372c-4.392 0-8.112 3.526-8.112 8.082 0 4.044 2.842 7.238 6.714 7.238 4.392 0 8.112-3.526 8.112-8.082 0-4.044-2.842-7.238-6.714-7.238zm0 12.472c-2.476 0-4.274-1.94-4.274-4.392s1.798-4.392 4.274-4.392 4.274 1.94 4.274 4.392-1.798 4.392-4.274 4.392zM0 .5v23h4.176V.5H0z" />
                </svg>
                Become a Patron
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">YusukeDAO</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Premium software products for developers who demand quality.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#products" className="hover:text-foreground transition-colors">Starter Kit</a></li>
                <li><a href="#products" className="hover:text-foreground transition-colors">Professional Suite</a></li>
                <li><a href="#products" className="hover:text-foreground transition-colors">Enterprise Edition</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href={PATREON_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Patreon</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Discord</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" asChild>
                  <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.82 2.372c-4.392 0-8.112 3.526-8.112 8.082 0 4.044 2.842 7.238 6.714 7.238 4.392 0 8.112-3.526 8.112-8.082 0-4.044-2.842-7.238-6.714-7.238zm0 12.472c-2.476 0-4.274-1.94-4.274-4.392s1.798-4.392 4.274-4.392 4.274 1.94 4.274 4.392-1.798 4.392-4.274 4.392zM0 .5v23h4.176V.5H0z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} YusukeDAO. All rights reserved.</p>
            <p>Payment via <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Patreon</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
