import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginUserInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignupInput, SignupResponse } from './dto/signup-input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  public login(@Args('loginUserInput') _: LoginUserInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => SignupResponse)
  public signup(@Args('newUser') newUser: SignupInput) {
    return this.authService.signup(newUser);
  }
}
