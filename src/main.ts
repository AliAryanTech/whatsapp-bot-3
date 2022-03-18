import * as fs from 'fs'
import { Client } from './client/Client';
import { fetchLatestBaileysVersion, useSingleFileAuthState } from "@adiwajshing/baileys";

const runBot = async () => {
    
    const { state } = useSingleFileAuthState(`./src/sessions.json`)
    const { version } = await fetchLatestBaileysVersion()
    
    const client = new Client({
        version,
        printQRInTerminal: true,
        auth: state
    })

    client.start()
}

runBot()
