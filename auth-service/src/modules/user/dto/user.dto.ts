export class CreateUserDto {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class UpdateUserDto extends CreateUserDto {
  id: string;
}
