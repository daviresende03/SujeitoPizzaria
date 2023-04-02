import {Router, Request, Response} from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';

import {CreateUserController} from './controllers/user/CreateUserController';
import {AuthUserController} from './controllers/user/AuthUserController';
import {DetailUserController} from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/item/AddItemController';
import { RemoveItemController } from './controllers/order/item/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// user routes
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// categories routes
router.post('/categories',isAuthenticated, new CreateCategoryController().handle);
router.get('/categories',isAuthenticated, new ListCategoryController().handle);

// products routes
router.post('/products', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/products', isAuthenticated, new ListByCategoryController().handle);

// orders routes
router.post('/orders', isAuthenticated, new CreateOrderController().handle);
router.delete('/orders', isAuthenticated, new RemoveOrderController().handle);
router.put('/orders/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get('/order', isAuthenticated, new DetailOrderController().handle);
router.put('/orders/finish', isAuthenticated, new FinishOrderController().handle);

// items routes
router.post('/orders/items', isAuthenticated, new AddItemController().handle);
router.delete('/orders/items', isAuthenticated, new RemoveItemController().handle);


export {router}