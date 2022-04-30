export interface LoadFacebookUser {
  loadUser: (input: LoadFacebookUser.Input) => Promise<LoadFacebookUser.Output>
}

export namespace LoadFacebookUser {
  export type Input = {
    token: string
  }

  export type Output = undefined | {
    name: string
    email: string
    facebookId: string
  }
}
