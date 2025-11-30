import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  // Get user from token
  const token = req.cookies.ch_token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.uid;
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (req.method === 'GET') {
    try {
      const user = await User.findById(userId).select('privacySettings');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Default privacy settings if none exist
      const defaultSettings = {
        profileVisibility: 'public',
        messagePermissions: 'friends',
        friendRequests: 'everyone',
        activityStatus: true,
        readReceipts: true,
        lastSeen: true,
        dataCollection: false,
        personalization: true,
        analyticsSharing: false,
        locationSharing: false,
        phoneNumberVisibility: 'friends',
        emailVisibility: 'private',
        searchable: true,
        blockedUsers: [],
        mutedUsers: []
      };

      const settings = user.privacySettings || defaultSettings;

      return res.status(200).json({ 
        success: true, 
        settings: { ...defaultSettings, ...settings }
      });
    } catch (error) {
      console.error('GET privacy settings error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { settings } = req.body;

      if (!settings) {
        return res.status(400).json({ message: 'Settings data is required' });
      }

      // Validate settings
      const allowedSettings = [
        'profileVisibility',
        'messagePermissions', 
        'friendRequests',
        'activityStatus',
        'readReceipts',
        'lastSeen',
        'dataCollection',
        'personalization',
        'analyticsSharing',
        'locationSharing',
        'phoneNumberVisibility',
        'emailVisibility',
        'searchable'
      ];

      const validatedSettings = {};
      Object.keys(settings).forEach(key => {
        if (allowedSettings.includes(key)) {
          validatedSettings[key] = settings[key];
        }
      });

      const user = await User.findByIdAndUpdate(
        userId,
        { 
          $set: { 
            privacySettings: validatedSettings,
            updatedAt: new Date()
          }
        },
        { new: true, upsert: false }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Privacy settings updated successfully',
        settings: user.privacySettings
      });
    } catch (error) {
      console.error('POST privacy settings error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
