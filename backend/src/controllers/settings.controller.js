import { Specification } from '../models/specification.model.js';
import { Feature } from '../models/feature.model.js';
import { About } from '../models/about.model.js';
import { Achievement } from '../models/achievement.model.js';
import { Value } from '../models/value.model.js';
import { TeamMember } from '../models/teamMember.model.js';
import { Testimonial } from '../models/testimonial.model.js';
import { Client } from '../models/client.model.js';
import { Blog } from '../models/blog.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
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
} from '../lib/defaults.js';

export const resetAll = asyncHandler(async (req, res) => {
  await Promise.all([
    Specification.deleteMany({}),
    Feature.deleteMany({}),
    About.deleteMany({}),
    Achievement.deleteMany({}),
    Value.deleteMany({}),
    TeamMember.deleteMany({}),
    Testimonial.deleteMany({}),
    Client.deleteMany({}),
    Blog.deleteMany({}),
  ]);

  await Specification.insertMany(defaultSpecifications);
  await Feature.insertMany(defaultFeatures);
  await Achievement.insertMany(defaultAchievements);
  await Value.insertMany(defaultValues);
  await TeamMember.insertMany(defaultTeam);
  await Testimonial.insertMany(defaultTestimonials);
  await Client.insertMany(defaultClients);
  await Blog.insertMany(defaultBlogs);
  await About.create(defaultAbout);

  res.json({ ok: true });
});
