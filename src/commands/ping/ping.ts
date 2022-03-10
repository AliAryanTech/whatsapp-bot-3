import { Command } from "../../models/Command";

export = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Returns pong'
        })
    }

    run = async (msg) => {
        const templateButtons = [
            {index: 1, urlButton: {displayText: 'Discord Server', url: 'https://discord.gg/harddisk'}},
            {index: 2, callButton: {displayText: 'Call me!', phoneNumber: '+1 (234) 5678-901'}},
        ]

        const templateMessage = {
            text: "Pong!",
            footer: 'Mensagem automatica',
            templateButtons: templateButtons
        }        

        this.client.sock.sendMessage(msg.key.remoteJid!, templateMessage)
    }
}