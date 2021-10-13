import { CommandClient, CommandContext, Intents } from "./deps.ts";

const debug = !![...Deno.readDirSync("./")].find((entry) =>
  entry.name == "token.ts"
);
const Keiko = new CommandClient({ prefix: debug ? "=" : "keiko!" });

const token = debug
  ? (await import(`./token.ts`)).token
  : Deno.env.get("TOKEN");

await Keiko.commands.loader.loadDirectory("./commands");

Keiko.on("debug", console.log);

Keiko.on("ready", () => {
  console.log(`[Login] Logged in as ${Keiko.user?.tag}!`);
});

Keiko.on(
  "commandError",
  (ctx: CommandContext, err: Error) =>
    console.log(`${ctx} errored with '${err.message}'`),
);

Keiko.connect(token, Intents.NonPrivileged);

setInterval(
  () => fetch("https://keiko-assistant.herokuapp.com/"),
  5 * 60 * 1000,
);

import { serve } from "https://deno.land/std@0.83.0/http/server.ts";
import * as flags from "https://deno.land/std@0.83.0/flags/mod.ts";

const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}

const s = serve({ port: port });
console.log("http://localhost:" + port);

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
