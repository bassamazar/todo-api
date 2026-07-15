const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToDo API Documentation',
      version: '1.0.0',
      description: 'توثيق واجهة برمجة التطبيقات لمشروع الـ ToDo الخاص بي',
    },
    servers: [
      {
        url: 'http://localhost:3000', // ضع رابط السيرفر هنا
        description: 'Development server',
      },
    ],
    // هذا الجزء ضروري جداً لكي تظهر أيقونة القفل وتستطيع إدخال الـ Token
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    
  },
  // هنا نحدد مكان ملفات الراوت لكي يقرأها Swagger تلقائياً
  apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { specs };