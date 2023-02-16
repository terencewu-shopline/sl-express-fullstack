const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)

const Token = db.collection('tokens')

class CyclicDBTokenStore {
  async fetch(clientId, merchantId, staffId) {
    try {
      const key = `token:${clientId}-${merchantId}-${staffId}`;
      const result = await Token.get(key)

      if (!result) {
        return undefined;
      }

      return JSON.parse(result.props.value);
    } catch(e) {
      console.error(e)
      return undefined;
    }
  }

  async save(clientId, merchantId, staffId, tokenData) {
    try {
      const key = `token:${clientId}-${merchantId}-${staffId}`;
      await Token.set(key, {
        value: JSON.stringify(tokenData),
      })
      return true
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = CyclicDBTokenStore
