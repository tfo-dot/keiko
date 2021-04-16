import { Client, User } from "../deps.ts";

export default {
  name: "READY",
  run: (client: Client, user: User) => {
    console.log("Logged as " + user.data.username);
    client.game("hentai");
  }
};
