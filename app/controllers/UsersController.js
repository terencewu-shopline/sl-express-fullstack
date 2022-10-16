class UsersController {
  async me(req, res) {
    res.json({
      merchantId: res.locals.currentMerchantId,
      performerId: res.locals.performerId,
    })
  }
}

module.exports = UsersController;
