class HomeController {
  async check(req, res) {
    res.send('OK');
  }

  async index(req, res) {
    res.render('index', {
      csrfToken: req.csrfToken(),
    })
  }
}

module.exports = HomeController;
