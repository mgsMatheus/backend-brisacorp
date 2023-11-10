import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return <MongooseModuleOptions>{
          uri: configService.get("appConfig.mongoUrl"),
          connectionFactory: (connection) => {
            connection.on("connected", () => {
              console.log("Conectado o banco!");
            });
            connection.on("disconnected", () => {
              console.log("Conexão com o banco foi perdida!");
            });
            connection.on("reconnected", () => {
              console.log("Conexão com o banco foi reestabelecida!");
            });
            connection._events.connected();
            return connection;
          },
          connectionErrorFactory: (error) => {
            console.log(
              `Falha ao conectar o banco:(${error.name})`,
              error.message,
            );

            return error;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
