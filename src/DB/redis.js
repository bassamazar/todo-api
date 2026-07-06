const Redis = require('ioredis');

// إنشاء الاتصال (يعمل على localhost:6379 بشكل افتراضي)
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

// رسائل تتبع للاتصال لتعرف إذا كان يعمل بشكل صحيح
redis.on('connect', () => {
  console.log('✅ Connected to Redis successfully!');
});

redis.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

// أضف هذه الدالة داخل src/db/redis.js
const clearUserCache = async (userId) => {
    await redis.del(`todos:user:${userId}`);
    // إذا كنت تريد مسح كاش الأدمن أيضاً عند أي تغيير (اختياري)
    await redis.del('todos:admin'); 
};

module.exports = { redis, clearUserCache };