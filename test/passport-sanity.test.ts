import Strategy from '../src/passport-sanity'
import { Profile } from '../src/profile'

const strategy = new Strategy(
  {
    clientID: 'xxx',
    clientSecret: 'yyy',
    callbackURL: 'http://localhost/callback',
    state: false
  },
  (accessToken: string, refreshToken: string, profile: any, cb: any) => {
    cb(null, {})
  }
)

/**
 * Strategy test
 */
describe('Strategy', () => {
  it('is instantiable', () => {
    expect(strategy).toBeInstanceOf(Strategy)
  })

  it('parses profile info', () => {
    let theProfile
    const done = jest.fn().mockImplementationOnce(
      (err: Error | null, profile?: Profile): void => {
        if (err) {
          return done(err)
        }
        theProfile = profile
        done(null, profile)
      }
    )
    strategy.userProfile('jibberishAccessToken', done)
    expect(theProfile).toEqual({
      _json: { profileImage: null, email: 'test@test.com', name: 'Test', id: '1234', provider: "google" },
      _raw: '{"id": "1234", "name": "Test", "email": "test@test.com", "profileImage": null, "provider": "google"}',
      displayName: 'Test',
      emails: [{ value: 'test@test.com' }],
      id: '1234',
      provider: 'sanity'
    })
  })
})
