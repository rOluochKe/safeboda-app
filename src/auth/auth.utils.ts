import { User } from '../user/user.entity';
import { UserWithoutPassword } from '../common/common.dto';

export function stripPasswordFromUser(user: User): UserWithoutPassword {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
