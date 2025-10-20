import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectMongo } from './lib/db.js';
import { User } from './models/user.model.js';
import { Specification } from './models/specification.model.js';
import { Feature } from './models/feature.model.js';
import { About } from './models/about.model.js';
import { Achievement } from './models/achievement.model.js';
import { Value } from './models/value.model.js';
import { TeamMember } from './models/teamMember.model.js';
import { Testimonial } from './models/testimonial.model.js';
import { Client } from './models/client.model.js';
import { Blog } from './models/blog.model.js';
import {
  defaultSpecifications,
  defaultFeatures,
  defaultAbout,
  defaultAchievements,
  defaultValues,
  defaultTeam,
  defaultTestimonials,
  defaultClients,
  defaultBlogs,
} from './lib/defaults.js';

async function run() {
  await connectMongo();
  const email = process.env.SEED_ADMIN_EMAIL || 'qutaibahtalat313@gmail.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'mindspire32!@';
  let user = await User.findOne({ email });
  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    user = await User.create({ email, passwordHash, role: 'admin' });
    console.log('Created admin user:', email);
  } else {
    console.log('Admin user already exists:', email);
  }

  // Seed content if empty
  const specCount = await Specification.countDocuments();
  if (specCount === 0) {
    await Specification.insertMany(defaultSpecifications);
    console.log('Seeded Specifications');
  }

  const featCount = await Feature.countDocuments();
  if (featCount === 0) {
    await Feature.insertMany(defaultFeatures);
    console.log('Seeded Features');
  }

  const aboutCount = await About.countDocuments();
  if (aboutCount === 0) {
    await About.create(defaultAbout);
    console.log('Seeded About');
  }

  const achCount = await Achievement.countDocuments();
  if (achCount === 0) {
    await Achievement.insertMany(defaultAchievements);
    console.log('Seeded Achievements');
  }

  const valCount = await Value.countDocuments();
  if (valCount === 0) {
    await Value.insertMany(defaultValues);
    console.log('Seeded Values');
  }

  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    await TeamMember.insertMany(defaultTeam);
    console.log('Seeded Team');
  }

  const testCount = await Testimonial.countDocuments();
  if (testCount === 0) {
    await Testimonial.insertMany(defaultTestimonials);
    console.log('Seeded Testimonials');
  }

  const clientCount = await Client.countDocuments();
  if (clientCount === 0) {
    await Client.insertMany(defaultClients);
    console.log('Seeded Clients');
  }

  const blogCount = await Blog.countDocuments();
  if (blogCount === 0) {
    await Blog.insertMany(defaultBlogs);
    console.log('Seeded Blogs');
  }

  console.log('Seed complete');
  process.exit(0);
}

run().catch((e) => {
  console.error('Seed error', e);
  process.exit(1);
});
