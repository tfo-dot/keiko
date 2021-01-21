import {
  Client,
  CommandisMessage,
  EmbedBuilder,
  EntityType,
  User,
} from "../deps.ts";

export default {
  name: "avatar",
  description: "Pokazuje profilowe użytkownika",
  category: "4Fun",
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie:",
    "`keiko!avatar [użytkownik]`",
  ).field(
    "Ogólny opis",
    "Pokazuje avatar twój lub kogoś innego",
  ).field(
    "Dodatkowe informacje:",
    "Zamiast oznaczać użytkownika możesz po prostu wpisać jego id na przykład moje to `622783718783844356`",
  ),
  run: (client: Client, msg: CommandisMessage) => {
    let sendAvatar = async (id: string) => {
      let user = await client.get(EntityType.USER, id) as User;
      msg.reply(
        new EmbedBuilder().title("No siemka").field(
          `${user.username}#${user.discriminator}`,
          `[Zobacz tutaj](${user.avatar()})`,
        ).image(user.avatar()),
      );
    };

    if (!msg.mentions[0]) {
      let id = msg.stringReader.readWord();
      return sendAvatar(id ? id : msg.author.id);
    } else return sendAvatar(msg.mentions[0].id);
  },
};
