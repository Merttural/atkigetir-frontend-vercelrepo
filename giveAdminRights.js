// atkigetir@gmail.com kullanıcısına admin yetkisi ver
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'user' }, // user, admin
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function giveAdminRights() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    const userEmail = 'atkigetir@gmail.com';
    
    // Kullanıcıyı bul
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      console.log(`❌ ${userEmail} kullanıcısı bulunamadı`);
      
      // Kullanıcı yoksa oluştur
      const newUser = await User.create({
        email: userEmail,
        password: 'atkigetir1970', // Bu şifre hash'lenmemiş, production'da hash'lenmeli
        name: 'Atkigetir Admin',
        role: 'admin',
        isActive: true
      });
      
      console.log(`✅ ${userEmail} kullanıcısı oluşturuldu ve admin yetkisi verildi`);
      console.log('Kullanıcı bilgileri:', {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        isActive: newUser.isActive
      });
    } else {
      // Kullanıcı varsa admin yetkisi ver
      await User.findByIdAndUpdate(user._id, { 
        role: 'admin',
        isActive: true 
      });
      
      console.log(`✅ ${userEmail} kullanıcısına admin yetkisi verildi`);
      console.log('Güncellenmiş kullanıcı bilgileri:', {
        email: user.email,
        name: user.name,
        role: 'admin',
        isActive: true
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

giveAdminRights();




