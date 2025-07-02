import { Roles } from '@prisma/client';

export interface userPayload {
  id: number;
  email: string;
  role: Roles;
}
