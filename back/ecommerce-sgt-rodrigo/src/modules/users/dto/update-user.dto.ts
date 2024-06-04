

export class UpdateUserDto {
     /**
   * Name of the user, must be a string up to 50 characters
   * @example 'George Constanza'
   */
    'name': string;
     /**
   * Email of the user, must be a unique string up to 50 characters
   * @example george@constanza.com
   */
    'email': string;
     /**
   * Password of the user, must be a string up to 150 characters
   * @example $2b$10$nkb1yAeIVlpx2p6O9UuSHe5nc.QjqqtMwZYOxKYu6yoBOWl7q3tHe
   */
    'password': string;
    /**
   * Address of the user, defaults to 'Unknown Address'
   * @example '123 Main St'
   */
    'address': string;
     /**
   * Phone number of the user, stored as an integer
   * @example 1234567890
   */
    'phone': string;
    /**
   * Country of the user, must be a string up to 50 characters
   * @example 'United States'
   */
    'country': string;
     /**
   * City of the user, must be a string up to 50 characters
   * @example 'New York'
   */
    'city': string;

     /**
   * City of the user, must be a string up to 50 characters
   * @example 'customer'
   */
    
    'role': 'customer' | 'admin'
}
