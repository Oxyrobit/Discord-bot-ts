import { type Client, REST, Routes, Snowflake } from 'discord.js'
import { type SlashCommand } from '../types'
import moment from 'moment'

const body: any = []
const guildsBody: Record<Snowflake, any[]> = {}

export async function prepareCommand(client: Client, command: SlashCommand){

  if (command.guilds){
    command.guilds.forEach(async guildId =>{
      const guild = client.guilds.cache.get(guildId) ?? (await client.guilds.fetch(guildId).catch(err => {return undefined}))

      if (!guild) {
        console.log(`[${moment().format('HH:mm:ss')}] 🔴 Guild ${guildId} introuvable pour la commande ${command.name}.`)
        return 
      }

      if (!guildsBody[guildId]) {
        guildsBody[guildId] = [];
      }

      guildsBody[guildId].push(command.data.toJSON())
    
    })
  }
  else {
    body.push(command.data.toJSON())
  }

  client.slashCommands.set(command.name, command)
  
}


export async function loadCommands(){
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body })
    
    for (const [guildId, body] of Object.entries(guildsBody)) {

      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body })
    }
    
    console.log(`[${moment().format('HH:mm:ss')}] 🔵 S/lash command rechargée avec succès.`)

  } catch (error) {
    console.error(error)
  }
}