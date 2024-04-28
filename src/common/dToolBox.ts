import {
  GuildMember,
  type Collection,
  type Guild,
  type GuildBasedChannel,
  VoiceState,
  Client,
  VoiceChannel,
  ChannelType,
  BaseGuildTextChannel,
  BaseMessageOptions,
  TextChannel,
} from "discord.js";
import { client } from "..";
export const MAX_CHANNEL = 50; // Nombre maximum de salons dans une catégorie

enum VoiceStateType {
  JOIN = "join",
  LEAVE = "leave",
  SWITCH = "switch",
  CAMERA_ON = "camera_on",
  CAMERA_OFF = "camera_off",
  MICRO_ON = "micro_on",
  MICRO_OFF = "micro_off",
  DEAF_ON = "deaf_on",
  DEAF_OFF = "deaf_off",
  STREAM_ON = "stream_on",
  STREAM_OFF = "stream_off",
  SERVER_DEAF_ON = "server_deaf_on",
  SERVER_DEAF_OFF = "server_deaf_off",
  SERVER_MICRO_ON = "server_micro_on",
  SERVER_MICRO_OFF = "server_micro_off",
}

export function getChannelsFromCategory(param: {
  guild: Guild;
  categoryId: string;
  type?: number[];
}) {
  // Récupère les salons d'une catégorie
  const category = param.guild?.channels.cache.get(param.categoryId);
  if (category == null) return undefined;

  const channels = param.guild.channels.cache.filter(
    (channel) => channel.parentId === category.id
  );

  if (param.type != null) {
    return channels.filter((channel) => param.type?.includes(channel.type));
  }

  return channels;
}

export function getChannelNumberFromCategory(param: {
  channels?: Collection<string, GuildBasedChannel>;
  guild?: Guild;
  categoryId?: string;
  type?: number[];
}) {
  // Récupère le nombre de salons dans une catégorie
  if (param.channels != null) {
    return param.channels.size;
  }

  return param.guild == null || !param.categoryId
    ? undefined
    : getChannelsFromCategory({
        guild: param.guild,
        categoryId: param.categoryId,
        type: param.type,
      })?.size;
}

export function isFullCategory(param: { guild: Guild; categoryId: string }) {
  // Vérifie si la catégorie est pleine
  const chanNum = getChannelNumberFromCategory({
    guild: param.guild,
    categoryId: param.categoryId,
  }); // Obtenir le nombre de salons dans la catégorie.

  if (chanNum === undefined) return undefined; // Si la catégorie n'existe pas.

  return chanNum >= MAX_CHANNEL; // Si le nombre de salons est supérieur ou égal au nombre maximum de salons.
}

export async function printToLogsChannel({options}: {options: string | BaseMessageOptions}) {

  // Envoie un message dans le salon de log
  const logsChannel = await client.channels.fetch(process.env.MAIN_LOGS_ID); // Obtenir le salon de logs.
 
  if (logsChannel != undefined && logsChannel instanceof TextChannel) {
    
    await logsChannel.send(options);
  }
}

export function getChannelById({ guild, channelId}: { guild: Guild; channelId: string }) : GuildBasedChannel | undefined {
  // Récupère un salon par son id
  const channel = guild.channels.cache.get(channelId) || guild.channels.resolve(channelId);
  if (channel == null) return undefined;

  return channel;
}

export function getMemberInVoiceChannel(param: {
  voiceChannel: GuildBasedChannel;
}) {
  // Récupère les membres dans un salon vocal
  return param.voiceChannel.members as Collection<string, GuildMember>;
}
export function getMemberCountInVoiceChannel(param: {
  voiceChannel: GuildBasedChannel;
}) {
  // Récupère le nombres de membres dans un salon vocal
  // @ts-expect-error // Ignorer a cause de values()
  const membersArray = Array.from(param.voiceChannel.members.values());

  return membersArray.length;
}

export function getRandomInt(param: { min?: number; max: number }) {
  const min = param.min ?? 0;
  const max = param.max;

  return Math.random() * (max - min) + min;
}
export async function getGuildSync({
  guildId,
  client,
}: {
  guildId: string;
  client: Client;
}) {
  // Récupère une guild par son id

  const guild = await client.guilds.fetch(guildId);

  return guild == null ? Promise.reject(undefined) : Promise.resolve(guild);
}
export async function getGuildMemberById(param: {
  guild: Guild | null;
  userId: string;
}) {
  // Récupère un utilisateur par son id

  const guild = param.guild;
  const userId = param.userId;
  const member = guild?.members.cache.get(userId) || guild?.members.resolve(userId);
  
  if (member == null) return undefined;
  return member;
}
export function getVoiceState(param: {
  oldState: VoiceState;
  newState: VoiceState;
}) {
  // Obtient ce qui a été changer dans le salon vocal
  const oldState = param.oldState;
  const newState = param.newState;

  if (oldState.channelId === null) {
    // Rejoindre un salon
    return VoiceStateType.JOIN;
  }

  if (newState.channelId === null) {
    // Quitter un salon
    return VoiceStateType.LEAVE;
  }

  if (oldState.channelId !== newState.channelId) {
    // Changement de salon
    return VoiceStateType.SWITCH;
  }

  return undefined;
}

export function getVoiceStateAdvanced(param: {
  oldState: VoiceState;
  newState: VoiceState;
}) {
  // Obtient ce qui a été changer dans le salon vocal
  const oldState = param.oldState;
  const newState = param.newState;

  if (oldState.channelId === null) {
    // Rejoindre un salon
    return VoiceStateType.JOIN;
  }

  if (newState.channelId === null) {
    // Quitter un salon
    return VoiceStateType.LEAVE;
  }

  if (oldState.channelId !== newState.channelId) {
    // Changement de salon
    return VoiceStateType.SWITCH;
  }

  if (oldState.streaming !== newState.streaming) {
    // Streaming
    if (newState.streaming) {
      return VoiceStateType.STREAM_ON;
    }
    return VoiceStateType.STREAM_OFF;
  }

  if (oldState.selfDeaf !== newState.selfDeaf) {
    // Sourdine
    if (newState.selfDeaf) {
      return VoiceStateType.DEAF_ON;
    }
    return VoiceStateType.DEAF_OFF;
  }

  if (oldState.selfMute !== newState.selfMute) {
    // Micro
    if (newState.selfMute) {
      return VoiceStateType.MICRO_OFF;
    }
    return VoiceStateType.MICRO_ON;
  }

  if (oldState.selfVideo !== newState.selfVideo) {
    // Caméra
    if (newState.selfVideo) {
      return VoiceStateType.CAMERA_ON;
    }
    return VoiceStateType.CAMERA_OFF;
  }

  if (oldState.serverDeaf !== newState.serverDeaf) {
    // Sourdine serveur
    if (newState.serverDeaf) {
      return VoiceStateType.SERVER_DEAF_ON;
    }
    return VoiceStateType.SERVER_DEAF_OFF;
  }

  if (oldState.serverMute !== newState.serverMute) {
    // Micro serveur
    if (newState.serverMute) {
      return VoiceStateType.SERVER_MICRO_ON;
    }
    return VoiceStateType.SERVER_MICRO_OFF;
  }

  return undefined;
}

export function getEmojiByName({
  guild,
  emojiName,
}: {
  guild: Guild;
  emojiName: string;
}) {
  return guild.emojis.cache.find((emoji) => emoji.name === emojiName);
}

export function getEmojisByName({
  guild,
  emojiNames,
}: {
  guild: Guild;
  emojiNames: string[];
}) {
  return guild.emojis.cache.filter((emoji) => {
    if (emoji.name != null) {
      return emojiNames.includes(emoji.name);
    }
  });
}
