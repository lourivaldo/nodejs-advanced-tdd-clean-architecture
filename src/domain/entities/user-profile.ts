export class UserProfile {
  initials?: string
  pictureUrl?: string

  constructor (readonly id: string) { }

  setPicture ({ pictureUrl, name }: { pictureUrl?: string, name?: string }): void {
    this.pictureUrl = pictureUrl
    if (pictureUrl === undefined && name !== undefined && name !== '') {
      const firstLetters = name.match(/\b(.)/g)!
      if (firstLetters.length > 1) {
        this.initials = `${firstLetters.shift()!}${firstLetters.pop()!}`.toLocaleUpperCase()
      } else {
        this.initials = name.substring(0, 2).toLocaleUpperCase()
      }
    }
  }
}
