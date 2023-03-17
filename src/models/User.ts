export default class User {
  readonly id: number | null;
  readonly name: string | null;
  readonly email: string | null;
  readonly password: string | null;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;

  constructor(attributes: Partial<User>) {
    this.id = attributes.id || null;
    this.name = attributes.name || "";
    this.email = attributes.email || "";
    this.password = attributes.password || "";
    this.createdAt = attributes.createdAt || null;
    this.updatedAt = attributes.updatedAt || null;
  }
}
