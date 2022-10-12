const _ = require('lodash')

const database = {
  '1': {
    id: 1,
    title: 'First News',
    body: 'This is the first news.',
  }
}

class NewsController {
  async index(req, res) {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (page - 1) * limit

    const items = Object.values(database).slice(skip, skip + limit)
    const total = Object.keys(database).length

    return res.json({
      pagination: {
        page,
        total,
      },
      items,
    })
  }

  async create(req, res) {
    const id = (_.last(Object.values(database))?.id || 0) + 1

    database[id] = {
      id,
      ...req.body,
    }

    return res.status(201).json(database[id])
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

  async delete(req, res) {
    const id = req.params.id;
    if (!database[id]) {
      return res.sendStatus(404)
    }

    delete database[id]

    return res.json({
      success: true,
    })
  }
}

module.exports = NewsController;
