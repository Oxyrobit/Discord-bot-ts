import { connect, connection } from 'mongoose'
import { printToLogsChannel } from '../../common/dToolBox'
import { waitCooldown } from '../../common/toolbox'

export let ready = false

export async function mongooseConnection() {
  
  // Connect to MongoDB
  await connect(process.env.MONGO_URI)
  .then(() => {
    ready = true
    return Promise.resolve()
  })
  .catch((err) => {
    printToLogsChannel({options: 'Erreur de connection à la BDD'})
    console.log("Erreur de connection à la BDD:")
    return Promise.reject(err)
  }
)}


connection.on('disconnected', () => {
  printToLogsChannel({options:'MongoDB disconnected! Reconnecting...'})
  console.log('MongoDB disconnected! Reconnecting...');
  waitCooldown(5)
  connect(process.env.MONGO_URI).catch(err => console.error('Failed to reconnect:', err));
});

connection.on('reconnected', () => {
  printToLogsChannel({options:'MongoDB reconnected!'})
  console.log('MongoDB reconnected!');
});

export function connectionState() {
  return new Promise((resolve, reject) => {

    switch (connection.readyState) {
      case 0:
        reject('disconnected')
        break
      case 1:
        resolve('connected')
        break
      case 2:
        reject('connecting')
        break
      case 3:
        reject('disconnecting')
        break
      default:
        reject('unknown')
        break
    }
  })
}
