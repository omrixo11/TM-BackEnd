import { RegisterDTO } from '../users/dto/register.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    hiddenInformation(): Promise<string>;
    publicInformation(): Promise<string>;
    register(RegisterDTO: RegisterDTO): Promise<{
        user: import("../schemas/user.schemas").User;
        token: string;
    }>;
    login(UserDTO: LoginDTO): Promise<{
        user: any;
        token: string;
    }>;
}
