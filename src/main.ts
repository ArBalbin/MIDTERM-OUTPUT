import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        'https://my-web-app-ten-lyart.vercel.app',
        'https://p7-seven.vercel.app',
      ];
      // allow any localhost port + no-origin requests (mobile/desktop/Postman)
      if (!origin || origin.startsWith('http://localhost') || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Server is up and running on http://localhost:3000');
}
bootstrap();