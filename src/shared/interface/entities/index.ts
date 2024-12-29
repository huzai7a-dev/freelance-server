// this file is to create Interfaces of db models

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  roleId: number;
}

interface IRole {
  role_id: number;
  role_name: 'CLIENT' | 'FREELANCE';
}

export type { IUser, IRole };
