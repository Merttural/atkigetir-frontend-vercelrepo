// Login API'sini test et
require('dotenv').config();
const fetch = require('node-fetch');

async function testLogin() {
  try {
    console.log('🔍 Login API test ediliyor...');
    
    const response = await fetch('https://atkigetir-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'atkigetir@gmail.com',
        password: 'atkigetir1970'
      })
    });
    
    console.log('📡 Response Status:', response.status);
    console.log('📡 Response Headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.text();
    console.log('📡 Response Body:', data);
    
    if (response.ok) {
      console.log('✅ Login başarılı!');
    } else {
      console.log('❌ Login başarısız!');
    }
    
  } catch (error) {
    console.error('❌ Test hatası:', error.message);
  }
}

testLogin();





