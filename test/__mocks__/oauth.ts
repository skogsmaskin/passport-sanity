module.exports.OAuth2 = () => {
  return {
    useAuthorizationHeaderforGET: () => {
      //
    },
    get: (url: string, accessToken: string, callback: any): void => {
      callback(
        null,
        '{"id": "1234", "name": "Test", "email": "test@test.com", "profileImage": null, "provider": "google"}',
        undefined
      )
    }
  }
}
