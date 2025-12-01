import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',                 // local dev
      'http://192.168.56.1:3000',             // local network testing
      'https://my-web-app-ten-lyart.vercel.app', // deployed frontend
      'https://p7-seven.vercel.app'           
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });

  await app.listen(3000);
  console.log('🚀 Server is up and running on http://localhost:3000');
}
bootstrap();
