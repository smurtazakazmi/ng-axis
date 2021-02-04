export interface IRole {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
  level: number | undefined;
  permissions: any | undefined;
}

export class Role {
  id: string;
  name: string;
  description: string;
  displayName: string;
  level: number;
  permissions: any;

  constructor(role?: IRole) {
    if (role) {
      this.id = role.id;
      this.name = role.name;
      this.description = role.description;
      this.displayName = role.displayName;
      this.level = role.level;
      this.permissions = role.permissions;
    }
  }

  static getRoleById = (roleId: string, roles: Role[] = []): Role => {
    let role: Role;
    roles.every((r: Role) => {
      if (r.id === roleId) {
        role = r;
        return false;
      }
      return true;
    });
    return role;
  };
}
