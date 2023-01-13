import { Router } from 'express'

import * as mealsCtrl from '../controllers/meals.js'

const router = Router()

/* GET users listing. */
router.get('/', mealsCtrl.new)


export {
  router
}
