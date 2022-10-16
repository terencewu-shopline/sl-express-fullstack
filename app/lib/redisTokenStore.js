class RedisTokenStore {
  async fetch(clientId, merchantId, staffId) {
    try {
      const key = `token:${clientId}-${merchantId}-${staffId}`;
      const result = await redisSession.get(key)
      console.log(result)
      if (!result) {
        return undefined;
      }

      return JSON.parse(result);
    } catch(e) {
      console.error(e)
      return undefined;
    }
  }

  async save(clientId, merchantId, staffId, tokenData) {
    try {
      const key = `token:${clientId}-${merchantId}-${staffId}`;
      await redisSession.set(key, JSON.stringify(tokenData))
      return true
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = RedisTokenStore
