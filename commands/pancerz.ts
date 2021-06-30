import { Client, CommandContext, CommandParameterType, EmbedBuilder } from "../deps.ts";

export default {
  name: "pancerz",
  description: "Atak dla SAO:Reborn",
  category: "Roleplay",
  hidden: true,
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie:",
    "`keiko!pancerz <ilość>`",
  ).field("Ogólny opis", "Licze redukcje obrażeń przez pancerz"),
  parameters: [
    { name: "pancerz", type: CommandParameterType.INT }
  ],
  run: (client: Client, ctx: CommandContext) => {
    if (ctx.guild && ctx.guild.data.id != "749007879150895105") {
      return ctx.reply(
        `<@${ctx.data.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze SAO:Reborn\``,
      );
    }

    ctx.reply(new EmbedBuilder().title("No heja").field("Redukcja obrażeń:", `${Math.floor((100 / (100 +ctx.args[0].value)) * 100)}%`))
  }
}