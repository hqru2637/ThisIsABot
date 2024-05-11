import { Client, Events, IntentsBitField } from 'discord.js';
import { InteractionHandler } from './InteractionHandler';
import 'dotenv/config';

export class Main {
  client: Client;
  interactions: InteractionHandler;
  constructor() {
    this.client = new Client({
      intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent]
    });
    this.interactions = new InteractionHandler(this.client);
    this.init().catch(console.error);
  }

  async init() {
    this.client.once(Events.ClientReady, () => {
      console.log(`Logged in as ${this.client.user?.tag}`);
    });

    this.client.on(Events.InteractionCreate, interaction => {
      this.interactions.handle(interaction).catch(console.error);
    });
    
    await this.client.login(process.env.TOKEN);
  }
}

export const main = new Main();