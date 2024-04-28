import { getGuildSync, printToLogsChannel } from '../../common/dToolBox'
import { print } from '../../common/toolbox'
import { type BotEvent } from '../../types'
import { type Client, Events } from 'discord.js'
import  { mongooseConnection } from './mongooseConnection'
import moment from 'moment'
import { loadCommands } from '../../handlers/commandHandler'
const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  async execute (client: Client) {
    const guild = getGuildSync({guildId : process.env.MAIN_GUILD_ID, client: client})

    if (process.env.MONGO_URI !== ''){

      const connected = mongooseConnection()
      process.stdout.write(`[${moment().format('HH:mm:ss')}] 🔵 Connexion à la base de données...`)
      await connected.then(() => {
        process.stdout.write(`\r[${moment().format('HH:mm:ss')}] 🟢 Connexion à la base de données réussie\n`)
      })
      .catch((err) => {
        
        printToLogsChannel({options: `[${moment().format('HH:mm:ss')}] 🔴 Erreur de connexion à la base de données : ${err}`})
        throw new Error(`\r[${moment().format('HH:mm:ss')}] 🔴 Erreur de connexion à la base de données : ${err}`)
      })
    }

    await guild.then(() => {
      printToLogsChannel({ options: `🟢 ${client.user?.tag} est opérationnel`})
      loadCommands()
      print((`🟢 ${client.user?.username} connecté`))

    })
    .catch(() => {
      throw new Error(`[${moment().format('HH:mm:ss')}] 🔴 Il n\'y a pas de serveur principal.`)
    })
  
  }
}

export default event
