import { Interaction, type Client } from 'discord.js';

export class InteractionHandler {
  constructor(private client: Client) {}

  async handle(interaction: Interaction) {}
}