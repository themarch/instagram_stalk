const GetProfile = require('./GetProfile');
const getProfile = new GetProfile('theomarchandarvier')
const ReadWriteFile = require('./ReadWriteFile');
const GetFollower = require('./GetFollower');
const getFollower = new GetFollower(getProfile)
const readWriteFile = new ReadWriteFile()
const fs = require('fs');

async function doAction() {
    const nbFollower = await getProfile.getNbFollowers()
    if (!(readWriteFile.compareFile(nbFollower))) {
        readWriteFile.insertFollowerFile(nbFollower)
        console.log(`Tu viens de gagner un follow. Il s'agit de : ${await getFollower.getNameLastFollower()}`)
    }
    else {
        console.log('no new follower')
    }
}
async function main() {
    try {
        doAction()
    } catch (error) {
        await getProfile.init()
        doAction()
    }
}

main()