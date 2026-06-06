// Quick script to verify a user in MongoDB
// Run this in your terminal: node verify-user.js <email>

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function verifyUser(email) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define User schema inline
    const UserSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      isVerified: Boolean,
      verificationToken: String,
      verificationTokenExpiry: Date,
    });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`❌ User with email "${email}" not found`);
      process.exit(1);
    }

    console.log(`\n📧 Found user: ${user.username} (${user.email})`);
    console.log(`✓ Verified: ${user.isVerified}`);

    if (!user.isVerified) {
      console.log('\n🔧 Updating user to verified...');
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiry = undefined;
      await user.save();
      console.log('✅ User is now verified!');
    } else {
      console.log('✅ User is already verified!');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

const email = process.argv[2];
if (!email) {
  console.log('Usage: node verify-user.js <email>');
  process.exit(1);
}

verifyUser(email);
