import { ButtonBuilder, ButtonStyle } from "discord.js";


const ColorButton = {
    Primary: ButtonStyle.Primary, // Bleu
    Secondary: ButtonStyle.Secondary, // Gris
    Success: ButtonStyle.Success, // Vert
    Danger: ButtonStyle.Danger, // Rouge
    Link: ButtonStyle.Link // Lien
}

export function simpleButton(param:{customId: string, label: string, style?: keyof typeof ColorButton, disabled?: boolean, url?: string}) {
    const simpleButton = new ButtonBuilder()
        .setCustomId(param.customId)
        .setLabel(param.label)
        .setDisabled(param.disabled || false)
        .setStyle(ColorButton[param.style || 'Primary']);

    if (param.style === 'Link') {
        simpleButton.setURL(param.url || process.env.BASE_URL)
        simpleButton.setCustomId('') // Si c'est un lien, on enlève le customId
    }

    return simpleButton;
}
