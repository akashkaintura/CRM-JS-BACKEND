import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;

  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('API documentation for the CRM system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port);

  // Get the HTTP server and safely access the router if possible
  const server = app.getHttpServer();
  const router = server._events?.request?._router;

  if (router && router.stack) {
    const availableRoutes = router.stack
      .filter((layer) => layer.route)
      .map((layer) => layer.route.path);
    console.log('Available routes:', availableRoutes);
  } else {
    console.log('No routes found');
  }

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
