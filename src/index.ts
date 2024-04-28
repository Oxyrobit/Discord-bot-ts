import * as dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { SlashCommand, type BotEvent} from './types';
import { join } from 'path';
import { readdirSync } from 'fs';
import moment from 'moment';
import { prepareCommand } from './handlers/commandHandler';

dotenv.config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});

client.slashCommands = new Collection<string, SlashCommand>();

const appsDir = join(__dirname, "./apps");

const folders = readdirSync(appsDir, { withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

folders.forEach(folder => {
  process.stdout.write(`[${moment().format('HH:mm:ss')}] 🔵 Chargement de ${folder}`)
  const files = readdirSync(`${appsDir}/${folder}`, {encoding: 'utf-8', recursive: true}).filter(file => file.endsWith('.js'))
  files.forEach(async file => {
    const module: BotEvent | SlashCommand | undefined = (await import(`${appsDir}\\${folder}\\${file}`)).default
    
    if (!module){
      //process.stdout.write(`[${moment().format('HH:mm:ss')}] 🔴 Impossible de charger le module ${file}\n`)
      return
    }

    if ('data' in module) {
      await prepareCommand(client, module)
    }
    else if( 'once' in module) {
      module.once
        ? client.once(module.name, (...args) => { module.execute(...args) })
        : client.on(module.name, (...args) => { module.execute(...args) })
    }
    
  })
  process.stdout.write(`\r[${moment().format('HH:mm:ss')}] 🔵 Module ${folder} chargé avec succès\n`)
})

process.env.BOT_NAME = client.user?.username || "Bot";
client.login(process.env.TOKEN);