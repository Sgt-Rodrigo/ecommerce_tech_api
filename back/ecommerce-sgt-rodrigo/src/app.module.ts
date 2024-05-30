import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrderModule } from './modules/order/order.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule, CategoriesModule, OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return configService.get<TypeOrmModuleOptions>('typeorm')!;
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: {expiresIn:'1h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
