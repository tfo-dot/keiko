import { Client } from "./deps.ts";

let debug = [...Deno.readDirSync("./")].find((entry) =>
  entry.name == "token.ts"
);
let Keiko = new Client({ hotreload: true, prefix: "=", debug: !!debug });

let token = debug ? (await import(`./token.ts`)).token : Deno.env.get("TOKEN");

Keiko.login(token);

setInterval(
  () => fetch("https://keiko-assistant.herokuapp.com/"),
  5 * 60 * 1000,
);
