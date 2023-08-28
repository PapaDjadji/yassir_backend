import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './utils/logger/index';
import * as compression from 'compression';
import  helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';
const jwt = require("jsonwebtoken");
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',  
    allowedHeaders: [
      '*',
      /* 'Content-Type, Access-Control-Allow-Origin, x-access-token, Accept', */
    ],
    methods: 'POST,GET,PUT,PATCH,DELETE',
  });
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      //stopAtFirstError: true,
    }),
  );

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
  app.setGlobalPrefix('api');
  
  app.use(async (req, res, next) => {
    let verifytoken = {
      // if has error in token or expire
      userId: null,
      exp: null,
    };
    if (req.headers["authorization"]) {
      const accessToken = req.headers["authorization"];
      const verifyOptions = {
        algorithms: [process.env.ALG],
      };
     // var publicKey = fs.readFileSync(process.env.PUBLIC_KEY, "utf-8");
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.PUBLIC_KEY,
        verifyOptions,
        (err, decode) => {
          if (err) {
            return verifytoken;
          } else {
            // success token
            return {
              userId: decode.userId,
              exp: decode.exp,
            };
          }
        }
      );
      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000 || exp == null) {
        return res
          .status(401)
          .json({
            error: "JWT token has expired, please login to obtain a new one",
          });
      }
      next();
    } else {
      next();
    }
  });

  const port = app.get(ConfigService).get('port');

  await app.listen(port);
  logger.info(
    `KALPE IS RUNNING ON PORT ${port}: ${await app.getUrl()}`,
  );
  console.log("--DB URI---",app.get(ConfigService).get('db'));
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
