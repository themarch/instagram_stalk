const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')

const username = ''
const password = ''
const cookieStore = new FileCookieStore('./cookies.json')
const client = new Instagram({ username: username, password : password, cookieStore}, { language: 'es-CL' })

class Login {
    constructor(){
        this.client = client
    }

    async init () {
        await this.client.login()
    }
}

module.exports = Login; 