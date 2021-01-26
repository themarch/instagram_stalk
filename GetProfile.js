const Login = require('./Login');

class GetProfile extends Login {

  constructor(username) {
      super()
      this.username = username
  }

  async getUserId() {
    const user = await this.client.getUserByUsername({username: this.username})
    return user.id
  }
  
  async getNbFollowers() {
    const user = await this.client.getUserByUsername({username: this.username})
    return user.edge_followed_by.count
  }
}

module.exports = GetProfile