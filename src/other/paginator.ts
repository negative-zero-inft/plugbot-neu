// the following piece of code runs on hopes and prayers. please proceed with caution
import { APIEmbed, ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, EmbedBuilder, Events, Interaction, InteractionType, Message } from "discord.js";
import { uniqueID, log } from "./utils";
import { PlugBot } from "./client";

export async function paginator(msg: Message, client: PlugBot, embeds: APIEmbed[], options?: { content?: string }, accountName?: string) {
    let currentPage = 0;

    const id = uniqueID(6);

    const nextbtns = new ButtonBuilder()
        .setCustomId(`next-${id}`)
        .setEmoji("➡️")
        .setStyle(ButtonStyle.Primary);

    const prevbtns = new ButtonBuilder()
        .setCustomId(`prev-${id}`)
        .setEmoji("⬅️")
        .setStyle(ButtonStyle.Primary);

    const pageView = new ButtonBuilder()
        .setCustomId(`pageview-${id}`)
        .setLabel(`Page: ${currentPage + 1}/${embeds.length}`)
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(prevbtns, pageView, nextbtns);

    const msgContent = {
        content: options?.content,
        embeds: [embeds[currentPage]],
        components: [row]
    };
    await msg.channel.send(msgContent);
    async function interactionHandler(i: Interaction<CacheType>) {
        if (i.type == InteractionType.MessageComponent && i.customId.endsWith(id)) {
            switch (i.customId) {
                case `prev-${id}`:
                    if (currentPage == 0) break;
                    currentPage--;
                    log(`${i.user.username} has changed to page ${currentPage}`, "paginator", { username: accountName || undefined });
                    msgContent.embeds = [embeds[currentPage]];
                    break;
                case `next-${id}`:
                    if (embeds.length <= currentPage + 1) break;
                    currentPage++;
                    log(`${i.user.username} has changed to page ${currentPage}`, "paginator", { username: accountName || undefined });
                    msgContent.embeds = [embeds[currentPage]];
                    break;
                case `pageview-${id}`:
                    log(`${i.user.username} is opening page preview. ${embeds.length} pages.`, "paginator", { username: accountName || undefined });
                    await i.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${embeds.map((e, i) => `**Page ${i + 1}**: ${e.title || "no title"}`).join("\n")}`)
                        ],
                        ephemeral: true
                    });
                    return;

            }
            pageView.setLabel(`Page: ${currentPage + 1}/${embeds.length}`);
            const newrow = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(prevbtns, pageView, nextbtns);

            msgContent.components = [newrow];
            await i.update(msgContent); // i am dead
        }
    }

    client.addListener(Events.InteractionCreate, interactionHandler);

    // self destruct after 1 minute
    setTimeout(() => {
        client.removeListener(Events.InteractionCreate, interactionHandler);
    }, 60e3);
}
