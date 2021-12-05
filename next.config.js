module.exports = {
  reactStrictMode: true,
  
  env: {
    // Username = testUser, Password = 12345, Cluster = cluster0
    URI: 'mongodb+srv://testUser:12345@cluster0.kobzn.mongodb.net?retryWrites=true&w=majority'
  },

  images: {
    domains: ['books.google.com']
  }
}
