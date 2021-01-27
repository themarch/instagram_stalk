const fs = require('fs');
const { stdout } = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class ReadWriteFile {
    constructor() {
        this.pathNbFollower = "nbFollow.txt"
        this.pathListFollower = "follower.txt"
        this.pathListFollower1 = "follower.txt1"
    }

    insertAllFollower(followers, pathFollower) {
        var file = fs.createWriteStream(pathFollower)
        file.on('error', function(err) { console.log(err) });
        for (const index in followers) {
            for (const index1 in followers[index]) {
                file.write(followers[index][index1].username + '\n');
            }
        }
        file.end()
        return followers
    }

     getFollowerFile() {
        const data = fs.readFileSync(this.pathNbFollower, 'utf8')
        return data
    }

    insertFollowerFile(nbFollower) {
        fs.writeFile(this.pathNbFollower, parseInt(nbFollower).toString(), function (err, data) {
        })
    }

    compareFile(nbFollower) {
        const followerFile =  this.getFollowerFile()
        if (followerFile != nbFollower)
            return false;
        return true; 
    }

    fileExist(path) {
        if (fs.existsSync(path)) {
            return true
        } 
        return false
    }

    followerDown(nbFollower) {
        const followerFile =  parseInt(this.getFollowerFile(), 10)
        if (followerFile > nbFollower)
            return true;
        return false; 
    }

    async followerLoose() {
        const cmd = `diff ${this.pathListFollower} ${this.pathListFollower1}`;
        var followLoser = '';
        try {
            await exec(cmd);
            followLoser = stdout.split('< ')[1]
            return (followLoser.split('\n')[0]);
          }catch (error) {
            followLoser = error.stdout.split('< ')[1]
            return (followLoser.split('\n')[0]);
        }
        return (followLoser);
    }

    deleteAndRenameFile() {
        fs.unlinkSync(this.pathListFollower)
        fs.rename(this.pathListFollower1, this.pathListFollower, function(err) {
        });
    }

}

module.exports = ReadWriteFile