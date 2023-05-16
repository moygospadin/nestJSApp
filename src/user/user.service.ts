import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { compareSync } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const userByUserName = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userByEmail || userByUserName) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        email: user.email,
        token: this.generateJwt(user),
        username: user.username,
        bio: user.bio,
        image: user.image,
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });
    if (!userByEmail) {
      throw new HttpException('Invalid Email', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const response = compareSync(loginUserDto.password, userByEmail.password);
    delete userByEmail.password;
    if (response) {
      return this.buildUserResponse(userByEmail);
    } else {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }
  }
  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }
}
