class HomeController {
  async check(req, res) {
    res.send('OK');
  }

  async index(req, res) {
    res.render('index')
  }
}

module.exports = HomeController;
