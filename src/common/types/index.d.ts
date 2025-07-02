import { userPayload } from 'src/common/interfaces/user-express.interface';

declare global {
  namespace Express {
    interface Request {
      user?: userPayload;
    }
  }
}
