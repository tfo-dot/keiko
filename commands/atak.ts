import { Client, CommandContext, CommandParameterType, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default {
  name: "atak",
  description: "Atak dla SAO:Reborn",
  category: "Roleplay",
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie:",
    "`keiko!atak <poziom> [modyfikator] [dodatkowe obrażenia] [krytyczne] [wartość krytycznego]`",
  ).field("Ogólny opis", "Licze obrażenia ataku podstawowego"),
  parameters: [
    { name: "lvl", type: CommandParameterType.INT, default: 1 },
    { name: "modif", type: CommandParameterType.INT, default: 0 },
    { name: "additional dmg", type: CommandParameterType.INT, default: 0 },
    { name: "crit", type: CommandParameterType.INT, default: 0 },
    { name: "crit value", type: CommandParameterType.INT, default: 0 },
  ],
  run: (client: Client, ctx: CommandContext) => {
    if (ctx.guild && ctx.guild.data.id != "749007879150895105") {
      return ctx.reply(
        `<@${ctx.data.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze SAO:Reborn\``,
      );
    }

    const lvl = Math.abs(ctx.args[0].value)
    const okay = genRandom(0, 40) + ctx.args[1].value
    const aDmg = Math.abs(ctx.args[2].value)
    let dmg = genRandom(0, (lvl - 1) * 5) + (lvl - 1) * 10 + aDmg + 30;

    const crit = Math.abs(ctx.args[2].value)
    const critVal = Math.abs(ctx.args[3].value)
    const goCrit = genRandom(0, 100) > crit && crit > 0 || crit == 100;

    if (goCrit) dmg *= critVal <= 0 ? 2 : critVal / 100;

    let embed = new EmbedBuilder().title("No siemka");
    if (okay >= 15) {
      embed = embed.field(
        "Informacje:",
        `[${okay}] Trafiłeś${goCrit ? " krytycznie" : ""}, zadałeś ${dmg} obrażeń.`,
      ).color("#00ff00")
    } else {
      embed = embed.field(
        "Informacje:",
        `[${okay}] Niestety, atak się nie udał...`,
      )
        .color("#ff0000")
    }

    ctx.reply(embed)
  }
};