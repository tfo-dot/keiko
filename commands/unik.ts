import { Client, CommandisMessage, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default {
  name: "unik",
  description: "Unik dla SAO:Reborn",
  category: "Roleplay",
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie komendy",
    "`keiko!unik <unik> <dmg> <pancerz>`",
  ).field("Ogólny opis:", "Licze ile dostałeś w tyłek od ataku podstawowego!"),
  run: (client: Client, msg: CommandisMessage) => {
    if (msg.guild && msg.guild.id != "749007879150895105") {
      return msg.reply(
        `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze SAO:Reborn\``,
      );
    }

    let snek = msg.stringReader.readInt();
    let dmg = msg.stringReader.readInt();
    let armor = msg.stringReader.readInt();

    //80 - 100% żeby lekko zmniejszyć dmg
    dmg = dmg * (0.8 + (genRandom(0, 20) / 10))

    let okay = genRandom(1, 100);

    if (okay > snek) {
      if (armor > 0) {
        dmg = dmg * (100 / (100 + armor));
      }
      msg.reply(
        new EmbedBuilder().title("No siemka").field(
          "Informacje:",
          `[${Math.floor(okay / 2.5)
          }] Niestety, unik się nie udał...\n Otrzymałeś od życia ${Math.floor(dmg)
          } w tyłek`,
        ).color("#ff0000"),
      );
    } else {
      msg.reply(
        new EmbedBuilder().title("No siemka").field(
          "Informacje:",
          `[${Math.floor(okay / 2.5)}] Twój unik się udał!`,
        ).color("#00ff00"),
      );
    }
  },
};
