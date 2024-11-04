import { Module, DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import pgPromise, { IDatabase } from "pg-promise";
import { env } from "./env";

const pgp = pgPromise();

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: "DATABASE_CONNECTION",
          useFactory: (): IDatabase<any> => {
            const connection = {
              host: env.DB_HOST,
              port: env.DB_PORT,
              database: env.DB_NAME,
              user: env.DB_USERNAME,
              password: env.DB_PASSWORD,
            };
            return pgp(connection); // A função pgp() retorna uma conexão do tipo IDatabase
          },
          inject: [ConfigService],
        },
      ],
      exports: ["DATABASE_CONNECTION"],
    };
  }
}
