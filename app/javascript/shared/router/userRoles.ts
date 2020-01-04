export enum UserRoles {
  admin = 'admin',
  cleaner = 'cleaner',
  user = 'user'
}

export const userRoles = {
  admins: [String(UserRoles.admin)],
  all: [String(UserRoles.cleaner), String(UserRoles.admin), String(UserRoles.user)]
}