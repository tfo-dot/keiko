import { Command, CommandContext, ContentArgument, Embed } from "../deps.ts";

export default class PancerzCommand extends Command {
  name = "pancerz";
  description = "Atak dla SAO:Reborn";
  category = "Roleplay";
  args = [{ name: "pancerz", defaultValue: 0 } as ContentArgument]

  execute(ctx: CommandContext) {
    ctx.message.reply(
      new Embed().setTitle("No heja").addField(
        "Redukcja obrażeń:",
        `${
          Math.floor((100 / (100 + (ctx.args!["pancerz"] as number))) * 100)
        }%`,
      ),
    );
  }
}
