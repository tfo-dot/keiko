import { Client } from "./deps.ts";

let debug = [...Deno.readDirSync("./")].find((entry) =>
  entry.name == "token.ts"
);
let Keiko = new Client({ hotreload: true, prefix: "keiko!", debug: !!debug });

let token = debug ? (await import(`./token.ts`)).token : Deno.env.get("TOKEN");

Keiko.login(token);

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
