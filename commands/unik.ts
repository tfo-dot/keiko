import { Client, CommandContext, CommandParameterType, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default {
  name: "unik",
  description: "Unik dla SAO:Reborn",
  category: "Roleplay",
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie komendy",
    "`keiko!unik <unik> <dmg> <pancerz>`",
  ).field("Ogólny opis:", "Licze ile dostałeś w tyłek od ataku podstawowego!"),
  parameters: [
    { name: "dodge", type: CommandParameterType.INT, default: 0 },
    { name: "dmg", type: CommandParameterType.INT, default: 0 },
    { name: "armor", type: CommandParameterType.INT, default: 0 }],
  run: (client: Client, ctx: CommandContext) => {
    if (ctx.guild && ctx.guild.data.id != "749007879150895105") {
      return ctx.reply(
        `<@${ctx.data.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze SAO:Reborn\``,
      );
    }

    let snek = ctx.args[0].value
    let dmg = ctx.args[1].value
    let armor = ctx.args[2].value

    //80 - 100% żeby lekko zmniejszyć dmg
    dmg = Math.floor(dmg * (0.8 + (genRandom(0, 20) / 100)))

    let okay = genRandom(1, 100);

    if (okay > snek) {
      if (armor > 0) {
        dmg = dmg * (100 / (100 + armor));
      }
      ctx.reply(
        new EmbedBuilder().title("No siemka").field(
          "Informacje:",
          `[${Math.floor(okay / 2.5)
          }] Niestety, unik się nie udał...\n Otrzymałeś od życia ${Math.floor(dmg)
          } w tyłek`,
        ).color("#ff0000"),
      );
    } else {
      ctx.reply(
        new EmbedBuilder().title("No siemka").field(
          "Informacje:",
          `[${Math.floor(okay / 2.5)}] Twój unik się udał!`,
        ).color("#00ff00"),
      );
    }
  },
};
