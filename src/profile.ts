interface UserInfoRaw {
  id: string
  name: string
  email: string
  profileImage: string | null
}

export interface Profile {
  _raw?: string
  _json?: UserInfoRaw
  id?: string
  displayName?: string
  emails?: { value: string }[]
  photos?: { value: string }[]
  provider?: string
  username?: string
}

export function parseUserProfile(userInfo: UserInfoRaw) {
  const profile: Profile = {}
  profile.id = userInfo.id
  profile.displayName = userInfo.name
  if (userInfo.email) {
    profile.emails = [{ value: userInfo.email }]
  }
  if (userInfo.profileImage) {
    profile.photos = [{ value: userInfo.profileImage }]
  }
  return profile
}
