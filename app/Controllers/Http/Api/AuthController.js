'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const errorKeys = use('App/Constants/ErrorKeys')

class AuthController {
  async login ({ request, response, auth }) {
    const dataLogin = request.only(['username', 'password'])
    try {
      const user = await User.getAuthUser(dataLogin.username)
      if (user) {
        const correct = await Hash.verify(dataLogin.password, user.password)
        if (correct) {
          return await this.sentAuthInfo(response, auth, user)
        }
      }
      return this.loginFailed(response)
    } catch (e) {
      console.log(e.message)
      return this.loginFailed(response)
    }
  }

  async signUp ({ request, response, auth }) {
    this.formData = request.only(User.getFormDataList())
    const user = await User.create(this.formData)
    const token = await auth.generate(user)
    return response.json({
      token,
      user
    })
  }

  async checkAuthCode ({ request, response, auth }) {
    const dataLogin = request.only(['username', 'password', 'code'])
    if (dataLogin.code) {
      const user = await User.getAuthUser(dataLogin.username, dataLogin.code)
      if (user) {
        const correct = await Hash.verify(dataLogin.password, user.password)
        if (correct) return this.sentAuthInfo(response, auth, user)
        user.generateNewAuthCode()
        await user.save()
      }
    }
    return this.loginFailed(response)
  }

  async sentAuthInfo (response, auth, user) {
    const token = await auth.generate(user)
    return response.json({
      token: token.token,
      user
    })
  }

  async loginFailed (response) {
    return response.unauthorized({
      errors: { password: errorKeys.errorLoginData }
    })
  }

  async current ({ response, auth }) {
    return response.json({
      user: auth.user
    })
  }


  async logout ({ response, auth, session }) {
    // Doesn't work
    // await auth.revokeTokens(auth.current.user, [auth.getAuthHeader()])
    return response.json({
      status: true
    })
  }
}

module.exports = AuthController
