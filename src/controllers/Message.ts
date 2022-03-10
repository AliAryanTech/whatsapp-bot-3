import { Event } from "../models/Event"

export = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messages.upsert'
        })
    }

    run = async (m) => {
        const msg = m.messages[0]
        const command = this.client.commands.find(command => command.name === (msg.message?.conversation ||  msg.message?.extendedTextMessage?.text));
        
        if (command) command.run(msg)
    } 
}