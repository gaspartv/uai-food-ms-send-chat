import { Injectable, Inject } from "@nestjs/common";
import { IDatabase } from "pg-promise";
import { ReceiveWaStatusDto } from "./dtos/receive-wa-chat.dto";
import { createId } from "@paralleldrive/cuid2";

@Injectable()
export class AppService {
  constructor(
    @Inject("DATABASE_CONNECTION") private readonly db: IDatabase<any>, // Use IDatabase aqui
  ) {}

  async execute(dto: ReceiveWaStatusDto) {
    const chatFound = await this.db.oneOrNone(
      "SELECT * FROM chats WHERE contact_id = $1",
      [dto.contact.id],
    );

    const created_at = new Date(Number(dto.message.timestamp) * 1000);
    created_at.setHours(created_at.getHours() - 3);

    const chatId = chatFound ? chatFound.id : createId();

    if (!chatFound) {
      await this.db.oneOrNone(
        "INSERT INTO chats (id, created_at, contact_name, contact_id, type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [chatId, created_at, dto.contact.name, dto.contact.id, "whatsapp"],
      );
    }

    console.log("AQUI 1");

    const messageCreate = await this.db.oneOrNone(
      "INSERT INTO messages (id, created_at, type, integrationId, message, body, sent_by_contact, sent_by_name, chat_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        createId(),
        created_at,
        dto.message.type,
        dto.message.id,
        dto.message.text,
        dto.message.text,
        true,
        dto.contact.name,
        chatId,
      ],
    );

    console.log("AQUI 2");

    const messageStatusCreate = await this.db.oneOrNone(
      "INSERT INTO message_status (id, created_at, status, message_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [createId(), created_at, "sent", messageCreate.id],
    );

    console.log("AQUI 3");

    console.log("chatCreate", {
      chatId,
      messageCreate,
      messageStatusCreate,
    });

    return {
      chatId,
      messageCreate,
      messageStatusCreate,
    };
  }
}
