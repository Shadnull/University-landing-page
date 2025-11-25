import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://kinglyshade_db_user:LzWyfJZOksGHKMPj@ulp.bnzc439.mongodb.net/?appName=ulp';

async function testConnection() {
    try {
        console.log('Testing connection...');
        await mongoose.connect(MONGODB_URI, { dbName: 'ulps' });
        console.log('Connection successful!');
        process.exit(0);
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1);
    }
}

testConnection();
