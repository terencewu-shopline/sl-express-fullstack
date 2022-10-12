const database = {
  '1': {
    id: 1,
    title: 'First News',
    body: 'This is the first news.',
  }
}

class NewsController {
  async index(req, res) {
    return res.json({
      pagination: {
        total: 1,
      },
      items: Object.values(database),
    })
  }

  async show(req, res) {
    const id = req.params.id;
    if (!database[id]) {
      return res.sendStatus(404)
    }

    return res.json(database[id])
  }

  async update(req, res) {
    const id = req.params.id;
    if (!database[id]) {
      return res.sendStatus(404)
    }

    database[id] = {...database[id], ...req.body}

    return res.json(database[id])
  }
}

module.exports = NewsController;
