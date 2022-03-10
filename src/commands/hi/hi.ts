import { Command } from "../../models/Command";

export = class extends Command {
    constructor(client) {
        super(client, {
            name: 'hi',
            description: 'Return hello'
        });
    };

    run = async (msg) => {
        this.client.sock.sendMessage(msg.key.remoteJid!, { text: "Hello" });
    }
}