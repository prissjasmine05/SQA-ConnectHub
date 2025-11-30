import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import User from '@/models/User';
import Community from '@/models/Community';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectDB();

  try {
    // Get the first user as organizer
    const organizer = await User.findOne();
    if (!organizer) {
      return res.status(400).json({ message: 'No users found. Please create a user first.' });
    }

    // Get the first community (optional)
    const community = await Community.findOne();

    // Sample events data
    const sampleEvents = [
      {
        title: 'Pilates for Strength and Balance',
        description: 'Join our pilates session designed to improve flexibility, build core strength, and bring calm to your daily routine. Perfect for all skill levels.',
        organizer: organizer._id,
        community: community?._id || null,
        location: {
          type: 'physical',
          address: 'Wellness Center, Jakarta',
          city: 'Jakarta'
        },
        dateTime: {
          start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
          end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000) // 2 hours later
        },
        capacity: 25,
        tags: ['fitness', 'wellness', 'pilates'],
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
        price: 150000,
        status: 'published'
      },
      {
        title: 'Cooking Workshop: Flavors of the World',
        description: 'Discover new techniques and recipes from around the globe. Learn to cook delicious meals and share the experience with fellow food lovers.',
        organizer: organizer._id,
        community: community?._id || null,
        location: {
          type: 'physical',
          address: 'Culinary Studio, Bandung',
          city: 'Bandung'
        },
        dateTime: {
          start: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
          end: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000) // 3 hours later
        },
        capacity: 15,
        tags: ['cooking', 'food', 'workshop'],
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600',
        price: 250000,
        status: 'published'
      },
      {
        title: 'Art & Expression Workshop',
        description: 'Unleash your creativity through painting, sketching, and mixed media. Explore different art forms, express your ideas, and connect with other creators.',
        organizer: organizer._id,
        community: community?._id || null,
        location: {
          type: 'physical',
          address: 'Art Studio, Yogyakarta',
          city: 'Yogyakarta'
        },
        dateTime: {
          start: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000) // 4 hours later
        },
        capacity: 20,
        tags: ['art', 'creativity', 'workshop'],
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
        price: 0, // Free event
        status: 'published'
      },
      {
        title: 'Virtual Photography Masterclass',
        description: 'Join our online photography masterclass and learn professional techniques from industry experts. Includes Q&A session.',
        organizer: organizer._id,
        community: community?._id || null,
        location: {
          type: 'online',
          meetingLink: 'https://zoom.us/j/123456789'
        },
        dateTime: {
          start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000) // 2 hours later
        },
        capacity: 100,
        tags: ['photography', 'online', 'masterclass'],
        image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600',
        price: 99000,
        status: 'published'
      },
      {
        title: 'Movie Night: Classic Cinema',
        description: 'Enjoy a screening of timeless classics with fellow enthusiasts. Share thoughts, favorite scenes, and dive into the magic of cinema.',
        organizer: organizer._id,
        community: community?._id || null,
        location: {
          type: 'physical',
          address: 'Cinema Hall, Surabaya',
          city: 'Surabaya'
        },
        dateTime: {
          start: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
          end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000) // 3 hours later
        },
        capacity: 50,
        tags: ['movies', 'cinema', 'entertainment'],
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
        price: 75000,
        status: 'published'
      },
      {
        title: 'Tech Talk: AI and Future of Work',
        description: 'Join industry leaders as they discuss the impact of artificial intelligence on the future of work and career development.',
        organizer: organizer._id,
        community: community?._id || null,
        location: {
          type: 'online',
          meetingLink: 'https://meet.google.com/xyz-tech-talk'
        },
        dateTime: {
          start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000) // 1.5 hours later
        },
        capacity: null, // Unlimited
        tags: ['technology', 'AI', 'career', 'online'],
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600',
        price: 0, // Free event
        status: 'published'
      }
    ];

    // Clear existing events first (optional)
    await Event.deleteMany({});

    // Insert sample events
    const createdEvents = await Event.insertMany(sampleEvents);

    return res.status(200).json({
      message: `Successfully created ${createdEvents.length} sample events`,
      events: createdEvents
    });

  } catch (error) {
    console.error('Seed events error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
