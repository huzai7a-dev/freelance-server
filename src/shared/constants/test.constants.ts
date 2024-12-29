import { IRole } from '../interface/entities';

export const mockUser = {
  id: 1,
  userType: 1,
  email: 'test@gmail.com',
  password: 'test123',
  firstName: 'test',
  lastName: 'test',
};

export const mockRoles: IRole[] = [
  {
    role_id: 1,
    role_name: 'CLIENT',
  },
  {
    role_id: 2,
    role_name: 'FREELANCE',
  },
];
