
class GetFollower {
    constructor(getProfile) {
        this.getProfile = getProfile
    }

    async getLastFollower() {
        const followers = await this.getProfile.client.getFollowers({ userId: await this.getProfile.getUserId(), first: 1})
        return followers
    }

    async getAllFollower() {
        const nb_follower = await this.getProfile.getNbFollowers() 
        var followers_arr = [];
        var isAfter = ''
        var index = 0
        while (index < nb_follower + 30) {
            var followers =  await this.getProfile.client.getFollowers({ userId: await this.getProfile.getUserId(), first: 20, after: isAfter})
            isAfter = followers.page_info.end_cursor
            followers_arr.push(followers.data)
            index+=20;
        }
        return followers_arr
    }

    async getNameLastFollower() {
        const followers = await this.getLastFollower()
        return (followers.data[0].username)
    }
}

module.exports = GetFollower