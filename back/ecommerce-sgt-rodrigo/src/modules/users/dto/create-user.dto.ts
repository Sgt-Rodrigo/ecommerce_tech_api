import { IsString, IsEmail, Matches, Length, IsNumberString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 80)
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,150}$/, {
              message: 'Password must meet the specified criteria',
          })
  password: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,150}$/, {
            message: 'Password must meet the specified criteria',
          })
  passwordConfirmation: string;

  @IsString()
  @Length(3, 80)
  address: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsNumberString()
  phone: string;

  @IsString()
  @Length(5, 20)
  country: string;

  @IsString()
  @Length(5, 20)
  city: string;

}

export type UserDtoNoPassConfirm = Omit<CreateUserDto, 'passwordConfirmation'>;