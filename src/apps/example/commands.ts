import { ActivityType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
  name: 'setactivity', // Define the command name.
  guilds: [process.env.MAIN_GUILD_ID, "GUILD_ID"], // Specify which guild(s) the command is for, using the guild ID stored in the environment variables. Set "False" for ALL GUILDS
  data: new SlashCommandBuilder() // Set up the command data using SlashCommandBuilder.
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Set default permissions for this command to Administrator only.
    .setName("setactivity")
    .setDescription("Change bot activity")
    .addStringOption((option) => {
      return option
        .setName('activity')
        .setDescription('Activité qui sera affiché.')
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName('type')
        .setDescription('Choose option.')
        .setRequired(false)
        .addChoices(
          { name: 'Playing', value: `${ActivityType.Playing}` },
          { name: 'Streaming', value: `${ActivityType.Streaming}` },
          { name: 'Listening', value: `${ActivityType.Listening}` },
          { name: 'Watching', value: `${ActivityType.Watching}` }
        );
    }),
    execute: async (interaction) => {
        // The function body starts here.
        const client = interaction.client;

        const name = <string>interaction.options.get('activity')?.value ?? 'Oxyrobot.fr';
        const type = <string>interaction.options.get('type')?.value ?? '0';

        if (!interaction.guildId || !interaction.guild) return;

        client.user?.setPresence({
        status: 'online',
        activities: [{
            name: `${name}`.substring(0, 31),
            type: parseInt(type),
        }],
        });

        // Send a reply to the interaction, notifying that the bot's activity has been changed.
        interaction.reply({ content: `L'activité du bot a été changé en "${name}".`, ephemeral: true });
  },
};

export default command