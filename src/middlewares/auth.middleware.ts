import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import { AuthService } from 'src/api/auth/auth.service';
import { UserService } from 'src/api/user/user.service';
import { handleError } from 'src/utils/error';
import { logger } from 'src/utils/logger';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  requestToken: string;
  decodedToken: Promise<any> = null;

  constructor(
    private authService: AuthService,
    private userService : UserService
  ) { }

   use(req: Request, res: Response, next: NextFunction) {
    logger.info('AUTH.MIDDLEWARE ENTRY =======>');
    if (req.headers["x-access-token"] ) {
      logger.info('INIT HEADERS');
      const token = String(req.headers["x-access-token"]) ;
      try {
        this.decodedToken = this.authService.validateToken(token);
        this.decodedToken.then(async (result : any) => {
          const user = await this.authService.findUserByPhone(result.phoneNumber);
          if (!user) {
            return res.status(HttpStatus.CONFLICT).send({
              error: 'User not found',
            });
          }
          req['user'] = user;
          next();
        })
          .catch((error) => {
            logger.error("--AUTH.decode error ")
            return res.status(HttpStatus.UNAUTHORIZED).json({
              message: error.message,
            });
          });
      } catch (error) {
        logger.error("--Error syntax")
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message,
        });
      }
    } else {
      logger.error("-- Auth.middleware An error occured")
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: ' Auth.middleware An error occured',
      });
    }
  }

  async findUserByPhone(phoneNumber: any) {
    try {
        const user = await this.userService.findOne(phoneNumber);
      if (!user) {
        throw new HttpException(
          'Utilisateur introuvable',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      handleError(error);
      throw new HttpException(
        'Erreur interne du serveur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


}
