import { BotEvent } from "../../types";
import { Client, Events } from "discord.js";

const event: BotEvent = {
    name: Events.ClientReady, // Define an event with the name. List of all events: https://discord.js.org/docs/packages/discord.js/14.14.1/Client:Class#applicationCommandPermissionsUpdate
    once: true, // Set 'once' to true, indicating that the event handler should only be triggered once.

    // Define the 'execute' function that will be called when the event occurs. 
    // It is marked 'async', meaning it can handle asynchronous operations.
    async execute (client: Client) {
      

        // This function will be executed when the client is ready.
        // 'client' parameter refers to the instance of the Client that is ready.

        console.log('Im ready !')
  
  
    }
  }
  
  export default event