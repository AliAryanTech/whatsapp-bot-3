import { Client } from './client/Client';
import { fetchLatestBaileysVersion, useSingleFileAuthState } from "@adiwajshing/baileys";

const { state } = useSingleFileAuthState('./src/sessions/sessions.json')

const runBot = async () => {
    const { version } = await fetchLatestBaileysVersion()
    
    const client = new Client({
        version,
        printQRInTerminal: true,
        auth: state
    })

    client.start()
}

runBot()
