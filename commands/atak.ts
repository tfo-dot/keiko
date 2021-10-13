import { Command, CommandContext, ContentArgument, Embed } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default class AtakCommand extends Command {
  name = "atak";
  description = "Atak dla SAO:Reborn";
  category = "Roleplay";

  args = [
    { name: "lvl", defaultValue: 1 } as ContentArgument,
    { name: "modif", defaultValue: 0 } as ContentArgument,
    { name: "ad", defaultValue: 0 } as ContentArgument,
    { name: "crit", defaultValue: 0 } as ContentArgument,
    { name: "crit value", defaultValue: 0 } as ContentArgument,
  ];

  execute(ctx: CommandContext) {
    const lvl = Math.abs(ctx.args!["lvl"] as number);
    const okay = genRandom(0, 40) + (ctx.args!["modif"] as number);
    const aDmg = Math.abs(ctx.args!["ad"] as number);
    const crit = Math.abs(ctx.args!["crit"] as number);
    const critVal = (ctx.args!["crit value"] as number);
    const goCrit = genRandom(0, 100) > crit && crit > 0 || crit == 100;

    const dmg =
      (genRandom(0, (lvl - 1) * 5) + (lvl - 1) * 10 + aDmg + 30) * critVal <= 1
        ? 2
        : critVal / 100;

    const embed = new Embed().setTitle("No siemka");

    if (okay >= 15) {
      embed.addField(
        "Informacje",
        `[${okay}] Trafiłeś${
          goCrit ? " krytycznie" : ""
        }, zadałeś ${dmg} obrażeń.`,
      ).setColor("#00ff00");
    } else {
      embed.addField(
        "Informacje:",
        `[${okay}] Niestety, atak się nie udał...`,
      ).setColor("#ff0000");
    }

    ctx.message.reply({ embed });
  }
}