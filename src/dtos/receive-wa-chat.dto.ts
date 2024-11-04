import { IsString, IsObject } from "class-validator";
interface EmailReceiveDto {
  email?: string;
  type?: string; // Standard values are HOME and WORK.
}

interface AddressReceiveDto {
  street?: string; // Street number and name.
  city?: string; // City name.
  state?: string; // State abbreviation.
  zip?: string; // ZIP code.
  country?: string; // Full country name.
  country_code?: string; // Two-letter country abbreviation.
  type?: string; // Standard values are HOME and WORK.
}

interface NameReceiveDto {
  formatted_name: string; // Required. Full name, as it normally appears.
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  prefix?: string;
}

interface OrgReceiveDto {
  company?: string; // Name of the contact's company.
  department?: string; // Name of the contact's department.
  title?: string; // Contact's business title.
}

interface PhoneReceiveDto {
  phone?: string; // Automatically populated with the `wa_id` value as a formatted phone number.
  type?: string; // Standard Values are CELL, MAIN, IPHONE, HOME, and WORK.
  wa_id?: string; // WhatsApp ID.
}

interface UrlReceiveDto {
  url?: string; // URL.
  type?: string; // Standard values are HOME and WORK.
}

export class BusinessDto {
  @IsString()
  id: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  phoneNumberId: string;
}

class MessageDto {
  audio?: {
    // Quando o tipo de mensagens é definido como áudio, incluindo mensagens de voz, este objeto é incluído no objeto de mensagens:
    id?: string; // ID para o arquivo de áudio.
    mime_type?: string; // Mime tipo do arquivo de áudio.
  };
  button?: {
    // Quando o campo de tipo de mensagens é definido como botão, este objeto é incluído no objeto de mensagens:
    payload?: string; // O pagamento de um botão configurado pela empresa que um cliente clicou como parte de uma mensagem interativa.
    text?: string; // O texto do botão.
  };
  context?: {
    // Apenas incluído quando um usuário responde ou interage com uma de suas mensagens. Os objetos de contexto podem ter as seguintes propriedades:
    forwarded?: boolean; // Definir para ser verdade se a mensagem recebida pela empresa tiver sido encaminhada.
    frequently_forwarded?: boolean; // Definir como true se a mensagem recebida pela empresa tiver sido encaminhada mais de 5 vezes.
    from?: string; // O ID do WhatsApp para o cliente que respondeu a uma mensagem de entrada.
    id?: string; // O ID da mensagem para a mensagem enviada para uma resposta de entrada.
    referred_product?: {
      // Objeto de produto referenciado descrevendo o produto sobre o usuário que o usuário está solicitando informações. Você deve analisar esse valor se você apoiar mensagens de consulta do produto. Veja receber resposta dos clientes. Objetos de produtos referenciados têm as seguintes propriedades:
      catalog_id?: string; // Identificador exclusivo do catálogo Meta vinculado à Conta WhatsApp Business.
      product_retailer_id?: string; // Identificador exclusivo do produto em um catálogo.
    };
  };
  document?: {
    // Quando o tipo de mensagens é definido como documento, este objeto é incluído no objeto de mensagens. Objetos de documentos podem ter as seguintes propriedades:
    caption?: string; // Legenda do documento, se fornecido.
    filename?: string; // Nome do arquivo no dispositivo do remetente.
    sha256?: string; // SHA 256 hash.
    mime_type?: string; // Mime tipo do arquivo do documento.
    id?: string; // ID para o documento.
  };
  errors?: {
    // Uma matriz de objetos de erro descrevendo o erro. Os objetos de erro têm as seguintes propriedades, que mapeiam suas propriedades equivalentes em cargas úteis de resposta de erro da API.
    code?: number; // O código de erro. Exemplo: 130429.
    title?: string; // Título do código de erro. Exemplo: Limite de taxa hit.
    message?: string; // Mensagem de código de erro. Esse valor é o mesmo que o valor do título. Por exemplo: Limite de taxa hit. Observe que a propriedade da mensagem na resposta de erro da API porta-carga pré-palta esse valor com o símbolo ? e o código de erro entre parênteses. Por exemplo: (no 130429) Limite de taxa hit.
    error_data?: {
      details?: string; // Descreve o erro. Exemplo: A mensagem não foi enviada porque havia muitas mensagens enviadas a partir deste número de telefone em um curto período.
    };
  };
  from: string; // O ID do WhatsApp do cliente. Uma empresa pode responder a um cliente usando esse ID. Esse ID pode não corresponder ao número de telefone do cliente, retornado pela API como entrada ao enviar uma mensagem ao cliente.
  id: string; // O ID da mensagem que foi recebida pelo negócio. Você pode usar o endpoint de mensagens para marcar essa mensagem específica como lida.
  identity?: {
    // Um objeto de identidade. O Webhook é acionado quando o número de telefone ou as informações de perfil de um cliente foram atualizadas. Veja a identidade do sistema de mensagens. Objetos de identidade podem ter as seguintes propriedades:
    acknowledged: "customer_identity_changed"; // Estado de reconhecimento para o sistema de mensagens customer_identity_changed.
    created_timestamp?: string; // O momento em que a API de gerenciamento de negócios do WhatsApp detectou o cliente pode ter alterado suas informações de perfil.
    hash?: string; // O ID do sistema de mensagens customer_identity_changed
  };
  image?: {
    // Quando o tipo de mensagens é definido para imagem, este objeto é incluído no objeto de mensagens.
    caption?: string; // Legenda da imagem, se fornecido.
    sha256?: string; // SHA 256 hash.
    id?: string; // ID para a imagem.
    mime_type?: string; // Mime tipo do arquivo da imagem.
  };
  interactive?: {
    // Quando um cliente interagiu com sua mensagem, esse objeto é incluído no objeto de mensagens. Objetos interativos têm as seguintes propriedades:
    type?: {
      // Objeto com as seguintes propriedades:
      button_reply?: {
        // Enviado quando um cliente clica em um botão. Objeto com as seguintes propriedades:
        id?: string; // ID original de um botão.
        title?: string; // O título de um botão.
      };
      list_reply?: {
        // Enviado quando um cliente seleciona um item de uma lista. Objeto com as seguintes propriedades:
        id?: string; // ID exclusivo do item de lista selecionado.
        title?: string; // Título do item de lista selecionado.
        description?: string; // Descrição da linha selecionada.
      };
    };
  };
  order?: {
    // Incluído no objeto de mensagens quando um cliente fez um pedido. Os objetos de pedido têm as seguintes propriedades:
    catalog_id?: string; // ID para o catálogo a que o item encomendado pertence.
    text?: string; // Mensagem de texto do usuário enviada com o pedido.
    product_items?: {
      // Array de objetos de item de produto contendo os seguintes campos:
      product_retailer_id?: string; // Identificador exclusivo do produto em um catálogo.
      quantity?: string; // O número de itens.
      item_price?: string; // Preço de cada item.
      currency?: string; // Moeda de preço.
    };
  };
  referral?: {
    // Quando um cliente clica em um anúncio que redireciona para o WhatsApp, esse objeto é incluído no objeto de mensagens. Os objetos de referência têm as seguintes propriedades:
    source_url?: string; // O URL Meta que leva ao anúncio ou post clicado pelo cliente. Abrir esta url leva você ao anúncio visto pelo seu cliente.
    source_type?: string; // O tipo de fonte do anúncio; anúncio ou post.
    source_id?: string; // Identificação de meta para um anúncio ou postagem.
    headline?: string; // Manchete usada no anúncio ou no post.
    body?: string; // Corpo para o anúncio ou post.
    media_type?: string; // Mídia presente no anúncio ou postagem; imagem ou vídeo.
    image_url?: string; // URL da imagem, quando media_type é uma imagem.
    video_url?: string; // URL do vídeo, quando media_type é um vídeo.
    thumbnail_url?: string; // URL para a miniatura, quando media_type é um vídeo.
    ctwa_clid?: string; // Clique em ID gerado pelo Meta para anúncios que clicam no WhatsApp.

    // O objeto de referência pode ser incluído nos seguintes tipos de mensagem: texto, localização, contato, imagem, vídeo, documento, voz e adesivo.
    // Os anúncios Click-to-WhatsApp são suportados apenas nos aplicativos Android e iOS. Se o cliente estiver usando o navegador da Web ou seu computador para clicar em um anúncio, o webhook resultante conterá um objeto de referência sem algumas das propriedades acima.
  };
  sticker?: {
    // Quando o tipo de mensagens é definido como adesivo, este objeto é incluído no objeto de mensagens. Os objetos adesivos têm as seguintes propriedades:
    mime_type?: string; // image/webp
    sha256?: string; // Hash para o sticker.
    id?: string; // Identificação para o sticker.
    animated?: boolean; // Definir como true se o sticker for animado; false contrário.
  };
  system?: {
    // Quando o tipo de mensagens é definido como sistema, um cliente atualizou seu número de telefone ou informações de perfil, esse objeto é incluído no objeto de mensagens. Os objetos do sistema têm as seguintes propriedades:
    body?: string; // Descreve a alteração na identidade ou no número de telefone do cliente.
    identity?: string; // Hash para a identidade buscada pelo servidor.
    wa_id?: string; // Novo ID do WhatsApp para o cliente quando seu número de telefone é atualizado. Disponível nas versões do webhook v12.0 e posterior.
    type?: // Tipo de atualização do sistema.
    | "customer_changed_number" // Um cliente mudou seu número de telefone.
      | "customer_identity_changed"; // Um cliente alterou as informações do perfil.
    customer?: string; // O ID do WhatsApp para o cliente antes da atualização.
  };
  text?: {
    // Quando o tipo de mensagens é definido como texto, este objeto é incluído. Os objetos de texto têm as seguintes propriedades:
    body?: string; // O texto da mensagem.
  };
  timestamp: string; // carimbo de data/hora Unix indicando quando o servidor WhatsApp recebeu a mensagem do cliente.
  type?:
    | "audio"
    | "button"
    | "document"
    | "text"
    | "image"
    | "interactive"
    | "order"
    | "sticker"
    | "system" // para o número do cliente alterar mensagens
    | "unknown"
    | "video"
    | "reaction"
    | "location";
  video?: {
    caption?: string; // A legenda para o vídeo, se fornecido.
    sha256?: string; // O hash para o vídeo.
    id?: string; // A identificação do vídeo.
    mime_type?: string; // O tipo de mímica para o arquivo de vídeo.
  };
  reaction?: {
    message_id: string;
    emoji: string;
  };
  location?: {
    latitude?: string;
    longitude?: string;
    name?: string;
    address?: string;
  };
  contacts?: {
    addresses?: AddressReceiveDto;
    birthday?: string; // YYYY-MM-DD formatted string.
    emails?: EmailReceiveDto[];
    name: NameReceiveDto; // At least one of the optional parameters needs to be included along with the formatted_name parameter.
    org?: OrgReceiveDto;
    phones?: PhoneReceiveDto[];
    urls?: UrlReceiveDto[];
  };
}

class ContactDto {
  id: string;
  user_id: string;
  name: string;
}

export class ReceiveWaStatusDto {
  @IsString()
  provider: "whatsapp";

  @IsObject()
  business: BusinessDto;

  @IsObject()
  contact: ContactDto;

  @IsObject()
  message: MessageDto;
}
