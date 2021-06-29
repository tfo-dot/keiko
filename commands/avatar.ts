import {
  Client,
  CommandContext,
  CommandParameterType,
  EmbedBuilder,
  StringReader
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
  parameters: [{ name: "test", type: CommandParameterType.STRING, default: "" }],
  run: (client: Client, ctx: CommandContext) => {
    let sendAvatar = async (id: string) => {
      let user = await client.users.get(id, true)
      ctx.reply(
        new EmbedBuilder().title("No siemka").field(
          `${user.data.username}#${user.data.discriminator}`,
          `[Zobacz tutaj](${user.avatar()})`,
        ).image(user.avatar()),
      );
    };

    if (!ctx.data.mentions[0]) {
      return sendAvatar(ctx.args[0].value ? ctx.args[0].value : ctx.data.author.id);
    } else return sendAvatar(ctx.data.mentions[0].id);
  },
};
