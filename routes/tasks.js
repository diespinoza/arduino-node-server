const express = require('express');
const router = express.Router();

const {
  getAllAnimations,
  createAnimation,
  getAnimation,
  updateAnimation,
  deleteAnimation,
  getAllDeviceAnimations,
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
 *  app.patch('/api/v1/animations/:id')
 *  Update an animation
 *
 *  app.delete('/api/v1/animations/:id')
 *  delete an animation
 *
 * For an arduino client device:
 *  app.get('/api/v1/animations/device/:id')
 *  get animations for a device
 *
 *
 */

router.route('/').get(getAllAnimations).post(createAnimation);
router.route('/:id').get(getAnimation).patch(updateAnimation).delete(deleteAnimation);
router.route('/device/:id').get(getAllDeviceAnimations);



module.exports = router;
