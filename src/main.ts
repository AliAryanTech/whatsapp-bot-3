import * as fs from 'fs'
import { Client } from './client/Client';
import { fetchLatestBaileysVersion, useSingleFileAuthState } from "@adiwajshing/baileys";

const runBot = async () => {

    /*
        these lines are optional, 
        they will create the folder 
        where you will store your session, 
        if you don't want you can delete it 
        or change the path
    */

    const path = './src/sessions'
        
    fs.access(path, (error) => {
        if (error) {
            fs.mkdir(path, (error) => {
                if (!error) {
                    console.log('sessions folder created successfully')
                }
            })
        }
    })
    
    const { state } = useSingleFileAuthState(`${path}/sessions.json`)
    const { version } = await fetchLatestBaileysVersion()
    
    const client = new Client({
        version,
        printQRInTerminal: true,
        auth: state
    })

    client.start()
}

runBot()
