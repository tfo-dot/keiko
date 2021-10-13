import { Command, CommandContext, ContentArgument, Embed } from "../deps.ts";

import { genRandom } from "../utils.ts";
export default class DiceCOmmand extends Command {
  name = "dice";
  description = "Losu losu losu";
  category = "4Fun";
  args = [
    { name: "max" } as ContentArgument,
    { name: "min", defaultValue: 0 } as ContentArgument,
  ];
  execute(ctx: CommandContext) {
    const max = Math.abs(ctx.args!["max"] as number);
    const min = Math.abs(ctx.args!["min"] as number);

    return ctx.message.reply({
      embed: new Embed().setTitle("No siemka").addField(
        "Informacje:",
        `Wylosowałam: __***\`${genRandom(min, max)}\`***__.`,
      ).setColor("#00ff00"),
    });
  }
}
