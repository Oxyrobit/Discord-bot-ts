import { Collection, CommandInteraction, Message, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandBuilder, Snowflake } from "discord.js"

export interface BotEvent {
    name: string,
    once?: boolean | false,
    async execute: (...args?) => void
}

export interface SlashCommand {
    name: string,
    data: SlashCommandBuilder | any,
    guilds: Snowflake[] | null | undefined | false,
    async execute: (interaction : CommandInteraction) => Promise<void>,
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENVIRONMENT: string
            BASE_NAME: string
            CLIENT_ID: string
            TOKEN: string
            BASE_URL: string
            MAIN_GUILD_ID: string
            MAIN_LOGS_ID: string
            MONGO_URI: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}