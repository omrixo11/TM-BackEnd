import { PartialType } from '@nestjs/mapped-types';
import { LoginAdminDto} from './login-admin.dto';

export class UpdateAdminDto extends PartialType(LoginAdminDto) {}
