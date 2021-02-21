import { Client, CommandisMessage, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default {
  name: "atak",
  description: "Atak dla SAO:Reborn",
  category: "Roleplay",
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie:",
    "`keiko!atak <poziom> [dodatkowe obrażenia] [modyfikator]`",
  ).field("Ogólny opis", "Licze obrażenia ataku podstawowego"),
  run: (client: Client, msg: CommandisMessage) => {
    if (msg.guild && msg.guild.id != "749007879150895105") {
      return msg.reply(
        `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze SAO:Reborn\``,
      );
    }

    let lvl = msg.stringReader.readInt() - 1;
    if (lvl < 0) {
      return msg.reply(
        `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Poziom nie może być mniejszy od 0\``,
      );
    }
    let dmg = genRandom(0, lvl * 15) + lvl * 15 + msg.stringReader.readInt();
    let okay = genRandom(0, 40) + msg.stringReader.readInt();

    let embed = new EmbedBuilder().title("No siemka");
    if (okay >= 15) {
      return msg.reply(
        new EmbedBuilder().title("No siemka").field(
          "Informacje:",
          `[${okay}] Trafiłeś, zadałeś ${dmg} obrażeń.`,
        ).color("#00ff00"),
      );
    } else {
      return msg.reply(
        new EmbedBuilder().title("No siemka").field(
          "Informacje:",
          `[${okay}] Niestety, atak się nie udał...`,
        )
          .color("#ff0000"),
      );
    }
  },
};
