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
  run: (client: Client, msg: CommandisMessage | SlashCommandAtak) => {

    if (!(msg as CommandisMessage).data) { }
    if ((msg as CommandisMessage).guild && (msg as CommandisMessage).guild?.id != "749007879150895105") {
      return (msg as CommandisMessage).reply(
        `<@${(msg as CommandisMessage).author.id}>, sorka ale coś poszło nie tak, szczegóły: \`Komenda nie jest wykonywana na serwerze SAO:Reborn\``,
      );
    }
    const ulvl = !(msg as CommandisMessage).stringReader ? msg.lvl : ((msg as CommandisMessage).stringReader.readInt())
    const lvl = ulvl <= 0 ? 1 : ulvl;
    const okay = genRandom(0, 40) + (!(msg as CommandisMessage).stringReader ? msg.okayModif : ((msg as CommandisMessage).stringReader.readInt()))
    const aDmg = !(msg as CommandisMessage).stringReader ? msg.addDmg : ((msg as CommandisMessage).stringReader.readInt())
    let dmg = genRandom(0, lvl * 15) + lvl * 15 + aDmg;

    const crit = !(msg as CommandisMessage).stringReader ? msg.crit : ((msg as CommandisMessage).stringReader.readInt())
    const critVal = !(msg as CommandisMessage).stringReader ? msg.critMulti : ((msg as CommandisMessage).stringReader.readInt())
    const second = !(msg as CommandisMessage).stringReader ? msg.second : ((msg as CommandisMessage).stringReader.readInt())

    const goCrit = genRandom(0, 100) > crit && crit > 0 || crit == 100;
    const goSecond = genRandom(0, 100) > second && second > 0 || second == 100;

    if (goCrit) dmg *= critVal <= 0 ? 2 : critVal / 100;
    if (goSecond) dmg *= 2;

    let embed = new EmbedBuilder().title("No siemka");
    if (okay >= 15) {
      embed = embed.field(
        "Informacje:",
        `[${okay}] Trafiłeś${goCrit ? " krytycznie" : ""}${goSecond ? " podwójnie" : ""}, zadałeś ${dmg} obrażeń.`,
      ).color("#00ff00")
    } else {
      embed = embed.field(
        "Informacje:",
        `[${okay}] Niestety, atak się nie udał...`,
      )
        .color("#ff0000")
    }

    if ((msg as CommandisMessage).data) {
      (msg as CommandisMessage).reply(embed)
    }

    return embed
  }
};

export interface SlashCommandAtak {
  lvl: number,
  okayModif: number,
  addDmg: number,
  crit: number,
  critMulti: number,
  second: number
}