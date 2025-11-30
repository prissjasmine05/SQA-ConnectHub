import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectDB();
  
  const User = mongoose.models.User || (await import('@/models/User')).default;
  const Post = mongoose.models.Post || (await import('@/models/Post')).default;
  const Community = mongoose.models.Community || (await import('@/models/Community')).default;

  try {
    // Sample users data
    const sampleUsers = [
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        username: 'john_doe',
        password: 'password123',
        bio: 'Tech enthusiast and nature lover',
        avatar: 'https://i.pravatar.cc/150?img=1',
        interests: ['Technology', 'Nature', 'Photography'],
        isActive: true
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        username: 'jane_smith',
        password: 'password123',
        bio: 'Digital artist and coffee addict',
        avatar: 'https://i.pravatar.cc/150?img=2',
        interests: ['Art', 'Design', 'Coffee'],
        isActive: true
      },
      {
        fullName: 'Mike Johnson',
        email: 'mike@example.com',
        username: 'mike_j',
        password: 'password123',
        bio: 'Fitness trainer and nutrition expert',
        avatar: 'https://i.pravatar.cc/150?img=3',
        interests: ['Fitness', 'Nutrition', 'Health'],
        isActive: true
      },
      {
        fullName: 'Sarah Wilson',
        email: 'sarah@example.com',
        username: 'sarah_w',
        password: 'password123',
        bio: 'Travel blogger and adventure seeker',
        avatar: 'https://i.pravatar.cc/150?img=4',
        interests: ['Travel', 'Adventure', 'Photography'],
        isActive: true
      },
      {
        fullName: 'Alex Chen',
        email: 'alex@example.com',
        username: 'alex_chen',
        password: 'password123',
        bio: 'Software developer and gaming enthusiast',
        avatar: 'https://i.pravatar.cc/150?img=5',
        interests: ['Programming', 'Gaming', 'Technology'],
        isActive: true
      }
    ];

    // Clear existing data
    await User.deleteMany({ email: { $in: sampleUsers.map(u => u.email) } });
    await Post.deleteMany({});
    await Community.deleteMany({ name: { $in: ['Tech Enthusiasts', 'Fitness Community'] } });

    // Hash passwords before inserting
    const salt = await bcrypt.genSalt(10);
    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, salt)
      }))
    );

    // Insert users
    const insertedUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`Created ${insertedUsers.length} users`);

    // Sample communities
    const sampleCommunities = [
      {
        name: 'Tech Enthusiasts',
        description: 'A community for technology lovers',
        owner: insertedUsers[0]._id,
        members: [insertedUsers[0]._id, insertedUsers[4]._id],
        memberCount: 2,
        tags: ['technology', 'programming', 'innovation'],
        isActive: true
      },
      {
        name: 'Fitness Community',
        description: 'Share your fitness journey with others',
        owner: insertedUsers[2]._id,
        members: [insertedUsers[2]._id, insertedUsers[3]._id],
        memberCount: 2,
        tags: ['fitness', 'health', 'workout'],
        isActive: true
      }
    ];

    const insertedCommunities = await Community.insertMany(sampleCommunities);
    console.log(`Created ${insertedCommunities.length} communities`);

    // Sample posts
    const samplePosts = [
      {
        author: insertedUsers[0]._id,
        content: 'Just discovered this amazing new JavaScript framework! The developer experience is incredible and the performance gains are outstanding. Who else is excited about the future of web development?',
        community: insertedCommunities[0]._id,
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800',
            caption: 'JavaScript code on screen'
          }
        ],
        likes: [insertedUsers[1]._id, insertedUsers[4]._id],
        comments: [
          {
            author: insertedUsers[1]._id,
            content: 'Looks amazing! Can you share the documentation link?',
            createdAt: new Date()
          }
        ],
        isActive: true
      },
      {
        author: insertedUsers[1]._id,
        content: 'Working on a new digital art piece inspired by nature. The colors and textures are coming together beautifully! Art has the power to connect us with the natural world.',
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
            caption: 'Digital art workspace'
          }
        ],
        likes: [insertedUsers[0]._id, insertedUsers[3]._id],
        comments: [],
        isActive: true
      },
      {
        author: insertedUsers[2]._id,
        content: 'Completed my morning workout routine! Started with 30 minutes of cardio followed by strength training. Remember, consistency is key to achieving your fitness goals. What did you do to stay active today?',
        community: insertedCommunities[1]._id,
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
            caption: 'Gym workout session'
          }
        ],
        likes: [insertedUsers[3]._id],
        comments: [
          {
            author: insertedUsers[3]._id,
            content: 'Great motivation! I did a 5km run this morning.',
            createdAt: new Date()
          }
        ],
        isActive: true
      },
      {
        author: insertedUsers[3]._id,
        content: 'Just returned from an incredible hiking trip in the mountains! The views were absolutely breathtaking and the fresh air was exactly what I needed. Nature has a way of refreshing the soul.',
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
            caption: 'Mountain hiking trail'
          }
        ],
        likes: [insertedUsers[0]._id, insertedUsers[1]._id, insertedUsers[2]._id],
        comments: [
          {
            author: insertedUsers[1]._id,
            content: 'Stunning photo! Which mountain range is this?',
            createdAt: new Date()
          }
        ],
        isActive: true
      },
      {
        author: insertedUsers[4]._id,
        content: 'Late night coding session working on a new open source project. There\'s something magical about writing clean, efficient code that solves real problems. The developer community continues to inspire me every day.',
        community: insertedCommunities[0]._id,
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
            caption: 'Code editor at night'
          }
        ],
        likes: [insertedUsers[0]._id],
        comments: [],
        isActive: true
      },
      {
        author: insertedUsers[1]._id,
        content: 'Coffee art experiment of the day! Trying to perfect my latte art skills. Each cup is a canvas and every pour tells a story. What\'s your favorite coffee brewing method?',
        media: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
            caption: 'Beautiful latte art'
          }
        ],
        likes: [insertedUsers[2]._id, insertedUsers[4]._id],
        comments: [
          {
            author: insertedUsers[2]._id,
            content: 'That looks delicious! I prefer pour-over coffee myself.',
            createdAt: new Date()
          }
        ],
        isActive: true
      }
    ];

    const insertedPosts = await Post.insertMany(samplePosts);
    console.log(`Created ${insertedPosts.length} posts`);

    // Add some following relationships
    await User.findByIdAndUpdate(insertedUsers[0]._id, {
      $set: { 
        following: [insertedUsers[1]._id, insertedUsers[2]._id],
        followers: [insertedUsers[1]._id, insertedUsers[4]._id]
      }
    });

    await User.findByIdAndUpdate(insertedUsers[1]._id, {
      $set: { 
        following: [insertedUsers[0]._id, insertedUsers[3]._id],
        followers: [insertedUsers[0]._id, insertedUsers[2]._id]
      }
    });

    await User.findByIdAndUpdate(insertedUsers[2]._id, {
      $set: { 
        following: [insertedUsers[1]._id, insertedUsers[3]._id],
        followers: [insertedUsers[0]._id, insertedUsers[3]._id]
      }
    });

    await User.findByIdAndUpdate(insertedUsers[3]._id, {
      $set: { 
        following: [insertedUsers[1]._id, insertedUsers[2]._id],
        followers: [insertedUsers[1]._id, insertedUsers[2]._id]
      }
    });

    await User.findByIdAndUpdate(insertedUsers[4]._id, {
      $set: { 
        following: [insertedUsers[0]._id],
        followers: [insertedUsers[0]._id]
      }
    });

    console.log('Following relationships created');

    return res.status(200).json({ 
      message: 'Sample data created successfully!',
      users: insertedUsers.length,
      posts: insertedPosts.length,
      communities: insertedCommunities.length
    });

  } catch (error) {
    console.error('Error creating sample data:', error);
    return res.status(500).json({ message: 'Error creating sample data', error: error.message });
  }
}
