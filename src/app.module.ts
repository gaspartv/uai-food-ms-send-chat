import { Module } from "@nestjs/common";
import { AppConsumer } from "./app.consumer";
import { AppService } from "./app.service";
import { DatabaseModule } from "./configs/database";

@Module({
  imports: [DatabaseModule.register()],
  controllers: [AppConsumer],
  providers: [AppService],
})
export class AppModule {}
