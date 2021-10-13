import { Command, CommandContext, ContentArgument, Embed } from "../deps.ts";
import { genRandom } from "../utils.ts";

export default class UnikCommand extends Command {
  name = "unik";
  description = "Unik dla SAO:Reborn";
  category = "Roleplay";
  args = [
    { name: "dodge", defaultValue: 0 } as ContentArgument,
    { name: "dmg", defaultValue: 0 } as ContentArgument,
    { name: "armor", defaultValue: 0 } as ContentArgument,
  ];

  execute(ctx: CommandContext) {
    const snek = ctx.args!["dodge"] as number;
    let dmg = ctx.args!["dmg"] as number;
    const armor = ctx.args!["armor"] as number;

    //80 - 100% żeby lekko zmniejszyć dmg
    dmg = Math.floor(dmg * (0.8 + (genRandom(0, 20) / 100)));

    const okay = genRandom(1, 100);

    if (okay > snek) {
      if (armor > 0) {
        dmg = dmg * (100 / (100 + armor));
      }
      ctx.message.reply({
        embed: new Embed().setTitle("No siemka").addField(
          "Informacje:",
          `[${
            Math.floor(okay / 2.5)
          }] Niestety, unik się nie udał...\n Otrzymałeś od życia ${
            Math.floor(dmg)
          } w tyłek`,
        ).setColor("#ff0000"),
      });
    } else {
      ctx.message.reply(
        new Embed().setTitle("No siemka").addField(
          "Informacje:",
          `[${Math.floor(okay / 2.5)}] Twój unik się udał!`,
        ).setColor("#00ff00"),
      );
    }
  }
}
