import { Module } from "@nestjs/common";
import { UsersModules } from "./features/users";
import { ConfigModule } from "@nestjs/config";
import appConfig from "@brisacorp/common/config";
import { DatabaseModule } from "./database/database.module";
import { AuthModules } from "./features/auth";
import { HospitalsModules } from "./features/hospitals";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    DatabaseModule,
    UsersModules,
    AuthModules,
    HospitalsModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
