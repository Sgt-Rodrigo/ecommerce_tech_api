import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuthDto {
     /**
   * Email of the user, must be a valid email address and not empty
   * @example 'marlene@example.com'
   */
    @IsEmail()
    @IsNotEmpty()
    email: string;

    /**
   * Password of the user, must not be empty
   * @example 'Password777!'
   */
    @IsNotEmpty()
    password: string
}