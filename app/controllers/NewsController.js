const _ = require('lodash')

const database = {
  '1': {
    id: 1,
    title: 'First News',
    body: 'This is the first news.',
  }
}

const SEARCHABLE_FIELDS = ['title', 'body']

class NewsController {
  async index(req, res) {
    const page = parseInt(req.query.page) || 1
    const limit = req.query.limit || 10
    const skip = (page - 1) * limit
    const search = req.query.search || ''

    let results = Object.values(database)
    let items = []
    let total = 0

    if (!_.isEmpty(search)) {
      results = results.filter(rec => Object.values(_.pick(rec, SEARCHABLE_FIELDS)).some(value => value.indexOf(search) >= 0))
    }

    items = results.slice(skip, skip + limit)
    total = results.length

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
