import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {loader as productsLoader,action as updateAvailabilityAction} from "./views/Products";
import NewProducts,{ action as newProductAction } from "./views/NewProducts";
import EditProducts,{loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import {action as deleteProductAction} from "./components/ProductDetails"

export const router =  createBrowserRouter([
    {
        path: '/',
        element: <Layout />, 
        HydrateFallback: () => <p>Cargando app...</p>,
        children: [
            {   
                index: true,
                element:<Products />,
                loader: productsLoader,
                action:updateAvailabilityAction
            },
            {
                path: 'producto/nuevo',
                element: <NewProducts />,
                action: newProductAction
            },
            {
                path:'products/:id/editar',//ROA Pattern - Resource-oriented desing
                element:<EditProducts />,
                loader: editProductLoader,
                action:editProductAction
            },
            {
                path:'productos/:id/eliminar',
                action: deleteProductAction


            }
        ]
    }
])