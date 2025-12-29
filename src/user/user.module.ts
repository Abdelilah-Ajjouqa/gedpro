import { Module } from "@nestjs/common";
import UserSerivce from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "src/intities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserSerivce],
    exports: [UserSerivce]
})
export default class UserModule{}