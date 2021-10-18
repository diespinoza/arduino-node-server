const express = require('express');

const router = express.Router();

const {
  getAllTasks,
} = require('../controllers/tasks');

/* What will this API look like?
 * For a web client:
 *  app.get('/')
 *  serve a home page. has actions for CRUD
 *
 * app.get('/api/v1/animations')
 *  get all the animations
 *
 *  app.post('/api/v1/animations')
 *  create a new animation
 *
 *  app.get('/api/v1/animations/:id')
 *  get a single animation
 *
 *  app.post('/api/v1/animations')
 *  create a new animation
 *
 * For an arduino client device:
 *
 *
 */

router.route('/').get(getAllTasks);


module.exports = router;
