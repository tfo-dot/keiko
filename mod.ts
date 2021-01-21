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

import { serve } from "https://deno.land/std@0.84.0/http/server.ts";

const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const request of server) {
  request.respond({ status: 200, body: "Bonjour!" });
}
