import { namedFactory } from '@controllers/crudFactory.controller'
import { Router } from 'express'

const factory = namedFactory('user')

const router = Router()

router.route('/').get(factory.getAll).post(factory.createOne)
router.route('/:id').get(factory.getOne).patch(factory.updateOne).delete(factory.deleteOne)

export default router
