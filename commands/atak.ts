import { Client, CommandisMessage, EmbedBuilder } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default {
  name: "atak",
  description: "Atak dla SAO:Reborn",
  category: "Roleplay",
  help: new EmbedBuilder().title("No siemka").field(
    "Użycie:",
    "`keiko!atak <poziom> [modyfikator] [dodatkowe obrażenia] [krytyczne] [wartość krytycznego] [drugi atak]`",
  ).field("Ogólny opis", "Licze obrażenia ataku podstawowego"),
  run: (client: Client, msg: CommandisMessage) => {
    if (msg.guild && msg.guild.id != "749007879150895105") {
      return msg.reply(
        `<@${msg.author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze SAO:Reborn\``,
      );
    }
    const ulvl = msg.stringReader.readInt()
    const lvl = ulvl <= 0 ? 1 : ulvl;
    const okay = genRandom(0, 40) + msg.stringReader.readInt();
    const aDmg = msg.stringReader.readInt()
    let dmg = genRandom(0, lvl * 15) + lvl * 15 + aDmg;

    const crit = msg.stringReader.readInt();
    const critVal = msg.stringReader.readInt();
    const second = msg.stringReader.readInt();

    const goCrit = genRandom(0, 100) > crit && crit > 0 || crit == 100;
    const goSecond = genRandom(0, 100) > second && second > 0 || second == 100;

    if (goCrit) dmg *= critVal <= 0 ? 2 : critVal / 100;
    if (goSecond) dmg *= 2;

    const embed = new EmbedBuilder().title("No siemka");
    if (okay >= 15) {
      return msg.reply(
        new EmbedBuilder().title("No siemka").field(
          "Informacje:",
          `[${okay}] Trafiłeś ${goCrit ? "krytycznie" : ""} ${goSecond ? "podwójnie" : ""}, zadałeś ${dmg} obrażeń.`,
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
