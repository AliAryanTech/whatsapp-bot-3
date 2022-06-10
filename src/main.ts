import * as fs from 'fs'
import { Client } from './client/Client';
import { fetchLatestBaileysVersion, useSingleFileAuthState } from "@adiwajshing/baileys";

async function bootstrap() {
    const { state } = useSingleFileAuthState(`./src/sessions/sessions.json`)
    const { version } = await fetchLatestBaileysVersion()
    
    const client = new Client({
        version,
        printQRInTerminal: true,
        auth: state
    })

    client.start()
}

bootstrap()
