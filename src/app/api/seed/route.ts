import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Check if products already exist
    const existingProducts = await db.product.findMany();
    if (existingProducts.length > 0) {
      return NextResponse.json({ message: 'Database already seeded' });
    }

    // Seed products
    await db.product.createMany({
      data: [
        {
          name: 'Starter Kit',
          description: 'Perfect for individuals getting started with our software tools.',
          price: 9.99,
          tier: 'basic',
          features: JSON.stringify([
            'Core functionality access',
            'Email support',
            'Basic documentation',
            '1 project limit',
          ]),
        },
        {
          name: 'Professional Suite',
          description: 'Full-featured package for professionals and small teams.',
          price: 29.99,
          tier: 'pro',
          features: JSON.stringify([
            'All Starter features',
            'Priority support',
            'Advanced analytics',
            'Unlimited projects',
            'API access',
            'Custom integrations',
          ]),
        },
        {
          name: 'Enterprise Edition',
          description: 'Complete solution for large teams and organizations.',
          price: 99.99,
          tier: 'enterprise',
          features: JSON.stringify([
            'All Professional features',
            'Dedicated support manager',
            'Custom development',
            'SLA guarantee',
            'On-premise deployment',
            'White-label options',
            'Training sessions',
          ]),
        },
      ],
    });

    // Seed testimonials
    await db.testimonial.createMany({
      data: [
        {
          name: 'Alex Chen',
          role: 'Indie Developer',
          content: 'This software transformed my workflow. The attention to detail is incredible, and the support team is always responsive.',
        },
        {
          name: 'Sarah Johnson',
          role: 'Product Manager at TechCorp',
          content: 'We switched our entire team to this suite and saw a 40% increase in productivity. Highly recommended!',
        },
        {
          name: 'Michael Park',
          role: 'Startup Founder',
          content: 'The enterprise features are worth every penny. Custom integrations saved us months of development time.',
        },
      ],
    });

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
