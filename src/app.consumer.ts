import { Controller, Logger, ValidationPipe } from "@nestjs/common";
import { env } from "./configs/env";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { ReceiveWaStatusDto } from "./dtos/receive-wa-chat.dto";
import { AppService } from "./app.service";

@Controller()
export class AppConsumer {
  constructor(private readonly appService: AppService) {}

  private readonly validationPipe = new ValidationPipe({
    errorHttpStatusCode: 422,
    whitelist: true,
    transform: true,
    transformOptions: { groups: ["transform"] },
  });

  @MessagePattern(env.RABBITMQ_QUEUE)
  async receive(
    @Ctx() context: RmqContext,
    @Payload() payload: ReceiveWaStatusDto,
  ) {
    console.log("Received message: ", payload);
    try {
      await this.validationPipe.transform(payload, {
        type: "body",
        metatype: ReceiveWaStatusDto,
      });
      await this.appService.execute(payload);
      context.getChannelRef().ack(context.getMessage());
    } catch (err) {
      Logger.error(err, "AppConsumer.receive");
      context.getChannelRef().nack(context.getMessage(), false, false);
    }
  }
}
