export interface LoadFacebookUserApi {
  loadUser: (input: LoadFacebookUserApi.Input) => Promise<LoadFacebookUserApi.Output>
}

export namespace LoadFacebookUserApi {
  export type Input = {
    token: string
  }

  export type Output = undefined | {
    name: string
    email: string
    facebookId: string
  }
}
