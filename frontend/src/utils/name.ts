import { User } from '../types';

export const formatName = (user: User) => {
  return user.name + ' ' + user.surname;
};
