import { Business } from './business';
import { Role } from './enums/role.enum';

export class User {
  id: Long;
  login: string;
  password: string;
  role: Role;
  business: Business;
}
