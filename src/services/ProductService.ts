import { safeParse,pipe ,string,transform,number,parse} from "valibot"
import { DraftProductSchema ,ProductSchema, ProductsSchema,type Product} from "../types"
import axios from "axios"
import { toBoolean } from "../utils"



export type ProductData={
    [k: string]: FormDataEntryValue
}

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name:data.name,
            price: +data.price

        })
        if(result.success){
            const url= `${import.meta.env.VITE_API_URL}/api/products`
            // const data = await axios(url,{method:'POST'})  --->Variable metodo
            const { data } = await axios.post(url,{
                name: result.output.name,
                price: result.output.price
            })
            console.log(data)
        }else{
            throw new Error('Datos no Validos')
        }

    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result=safeParse(ProductsSchema,data.data)
        if(result.success){
            return result.output
        }else {
            throw new Error('Hubo un error...')
        }


    } catch (error) {
        console.log(error)
    }
}

export async function getProductsById(id : Product['id']) {
    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result=safeParse(ProductSchema,data.data)
        if(result.success){
            return result.output
        }else {
            throw new Error('Hubo un error...')
        }


    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data:ProductData,id : Product['id']) {
    try {
        const NumberSchema= pipe(string(), transform(Number), number());
        const result = safeParse(ProductSchema, {
            id,
            name:data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        console.log(result.output)
        if(result.success){
            const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
            const {data} = await axios.put(url, result.output)
            console.log(data)
        }else{
            throw new Error('Datos no Validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id:Product['id']) {
    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
        console.log('eliminando '+id)
    } catch (error) {
        console.log(error)
    }

}
export async function updateProductAvailability(id: Product['id']) {
    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
       

    } catch (error) {
        console.log(error)
    }
}
