import { EmbedBuilder } from "discord.js";

export function informationsEmbed (param: { description: string, color?: string }) { // Message d'information
  const embed: EmbedBuilder = new EmbedBuilder()
    .setDescription('ℹ️ ' + param.description)
    .setColor('#58b9ff')
  return embed
}

export function dangerEmbed (param: { description: string, color?: string }) { // Message d'information
  const embed: EmbedBuilder = new EmbedBuilder()
    .setDescription('🚨 ' + param.description)
    .setColor('#d61222')
  return embed
}

export function warningEmbed (param: { description: string, color?: string }) { // Message d'information
  const embed: EmbedBuilder = new EmbedBuilder()
    .setDescription('⚠️ ' + param.description)
    .setColor('#ffe000')
  return embed
}