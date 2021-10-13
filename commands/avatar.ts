import { CommandContext, Embed, Command } from "../deps.ts";

export default class AvatarCommand extends Command {
  name = "avatar";
  description = "Pokazuje profilowe użytkownika";
  category = "4Fun";

  execute(ctx: CommandContext) {
    const sendAvatar = async (id: string) => {
      const user = await ctx.client.users.fetch(id);
      ctx.message.reply({
        embed: new Embed().setTitle("No siemka").addField(
          `${user.username}#${user.discriminator}`,
          `[Zobacz tutaj](${user.avatarURL()})`,
        ).setImage(user.avatarURL()),
      });
    };

    if (!ctx.message.mentions.users.first()) {
      return sendAvatar(ctx.author.id);
    } else return sendAvatar(ctx.message.mentions.users.first()!.id);
  }
}
