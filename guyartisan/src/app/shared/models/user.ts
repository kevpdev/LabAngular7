import { Business } from './business';
import { Role } from './enums/role.enum';

export class User {
  id: number;
  login: string;
  password: string;
  role: Role;
  business: Business;

  constructor(obj?: Partial<User>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
