import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { UsersService } from 'src/users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'yourSecretKey', // Use a strong secret key
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set to true if using HTTPS
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const usersService = app.get(UsersService); // Get an instance of UsersService

  passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
    done(null, user.id); // Serialize user ID into the session
  });

  passport.deserializeUser(
    async (id: any, done: (err: any, user?: any) => void) => {
      try {
        const user = await usersService.findOne(id); // Use the instance of UsersService
        done(null, user); // Deserialize user data from the session
      } catch (err) {
        done(err, null);
      }
    },
  );

  await app.listen(3000);
}
bootstrap();
