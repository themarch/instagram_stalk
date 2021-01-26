const fs = require('fs')
const { normalize, resolve } = require('path')

class ReadWriteFile {

    constructor() {

    }

     getFollowerFile() {
        const data = fs.readFileSync('result.txt', 'utf8')
        return data
    }

    insertFollowerFile(nbFollower) {
        fs.writeFile('result.txt', nbFollower, function (err, data) {
        })
    }

    compareFile(nbFollower) {
        const followerFile =  this.getFollowerFile()
        if (followerFile != nbFollower)
            return false;
        return true; 
    }
}

module.exports = ReadWriteFile