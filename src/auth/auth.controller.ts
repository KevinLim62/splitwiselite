import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/utils/validationPipe';
import { UserSignInDto, userSignInSchema } from './schema/auth.schema';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  @UsePipes(new ZodValidationPipe(userSignInSchema))
  signIn(@Body() UsersignInDto: UserSignInDto) {
    return this.authService.signIn(UsersignInDto.email, UsersignInDto.password);
  }
}
