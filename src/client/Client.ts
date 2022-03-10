import { join } from 'path';
import { Boom } from '@hapi/boom'
import { readdirSync } from 'fs';
import makeWASocket, { DisconnectReason, AnyMessageContent } from '@adiwajshing/baileys';

export class Client {
    sock: any
    options: object
    commands: object[]

    constructor(options: object) {
        this.options = options

        this.commands = []
        this.createCommands()
    }

    start() {        
        this.sock = makeWASocket(this.options)

        this.sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update
            
            if (connection === 'close') {
                if ((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                    this.start()
                }
            }
        })

        this.loadEvent()
    }

    createCommands() {
        const localPath: string = './src/commands'
        const path = readdirSync(localPath)
    
        for (const commandsPath of path) {
            const cmdFilePath = readdirSync(`${localPath}/${commandsPath}`)
    
            for (const cmdFile of cmdFilePath) {
                const commmandClass = require(join(process.cwd(), `${localPath}/${commandsPath}/${cmdFile}`))
                const newCommand = new (commmandClass)(this)
    
                this.commands.push(newCommand)
            }
        }
    }

    loadEvent() {
        const localPath: string = './src/controllers'
        const path = readdirSync(localPath)

        for (const file of path) {
            const eventClass = require(join(process.cwd(), `${localPath}/${file}`))
            const newEvent = new (eventClass)(this)

            this.sock.ev.on(newEvent.name, newEvent.run)
        }
    }

    sendMessageWTyping = async (msg: AnyMessageContent, jid: string) => {
		await this.sock.presenceSubscribe(jid)
		await this.sock.sendPresenceUpdate('composing', jid)
		await this.sock.sendPresenceUpdate('paused', jid)
		await this.sock.sendMessage(jid, msg)
	}
    
}
