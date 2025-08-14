import { MOCK_USERS } from "../models/users";
import { User } from "../types/user";

export const findUserByEmail = (email: string): User | undefined => {
  return MOCK_USERS.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};
