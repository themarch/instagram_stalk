const GetProfile = require('./GetProfile');
const getProfile = new GetProfile('theomarchandarvier')
const ReadWriteFile = require('./ReadWriteFile');
const GetFollower = require('./GetFollower');
const getFollower = new GetFollower(getProfile)
const readWriteFile = new ReadWriteFile()
const pathNbFollower = "nbFollow.txt"
const pathListFollower = "follower.txt"

async function initFollower (){
    const nbFollower = await getProfile.getNbFollowers()
    if (!(readWriteFile.fileExist(pathNbFollower))) {
        const all_follower = await getFollower.getAllFollower()
        readWriteFile.insertAllFollower(all_follower, pathListFollower)
        readWriteFile.insertFollowerFile(nbFollower)
        console.log('never inscrit')
        return false
    }
    return nbFollower
}

async function ifLooseFollower(nbFollower) {
    const all_follower = await getFollower.getAllFollower()
    readWriteFile.insertFollowerFile(nbFollower)
    readWriteFile.insertAllFollower(all_follower, `${pathListFollower}1`)
    const followerLoose = await readWriteFile.followerLoose()
    readWriteFile.deleteAndRenameFile()
    console.log(`${followerLoose} t'as unfollow`)
}

async function whoLosed() {
    const nbFollower = await initFollower()
    if (nbFollower == 'false')
        return ;
    if (readWriteFile.followerDown(nbFollower)) {
        await ifLooseFollower(nbFollower);
        console.log('files updated')
    }
    else {
        console.log('all seems done')
    }
}
async function main() {
    
    try {
        await getProfile.init()
        whoLosed()
    } catch (error) {
        await getProfile.init()
        whoLosed()
    }
}

main()