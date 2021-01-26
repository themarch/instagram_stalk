
class GetFollower {
    constructor(getProfile) {
        this.getProfile = getProfile
    }

    async getLastFollower() {
        const followers = await this.getProfile.client.getFollowers({ userId: await this.getProfile.getUserId(), first: 1})
        return followers
    }

    async getNameLastFollower() {
        const followers = await this.getLastFollower()
        return (followers.data[0].username)
    }
}

module.exports = GetFollower