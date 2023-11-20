import { REST, Routes, SlashCommandBuilder } from "discord.js"
import { log } from "../other/utils"
import { Events } from "discord.js"
import { PluginTools } from "../other/typing"

export = {
    
    name: "plugin for testing / cmds",
    developers: ["NRD", "CatNowBlue"],
    version: "0.0.1",
    run: (tools: PluginTools) =>{

        const commands: object[] = []

        const testCommand = {

                data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('o lukin e nasin pali pi ilo ni'),
            // @ts-ignore
            execute: async (interaction) => {
                await interaction.reply(`nimi pi jan kepeken li **${tools.account.name}** \n ${interaction.user.username} li kepeken ilo ni`);
            }
        }
        commands.push(testCommand.data.toJSON())

        const rest = new REST({ version: "9" }).setToken(tools.account.token);

        (async () => {
            try {
                console.log(`Started refreshing application (/) commands.`);
                const data = await rest.put(
                    Routes.applicationGuildCommands("935941610280218724", "1095209086339002398"),
                    { body: commands },
                );
        
                console.log(`Successfully reloaded application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();

        tools.client.on(Events.InteractionCreate, interaction => {

            if (!interaction.isChatInputCommand()) return;
            if(interaction.commandName === "test") testCommand.execute(interaction)
            console.log(interaction);
        });
    }
}