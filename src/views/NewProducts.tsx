import { NavLink,Form, useActionData, type ActionFunctionArgs,redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";


export async function action({request}:ActionFunctionArgs){
  const data= Object.fromEntries(await request.formData())
  
  let error=''
  if(Object.values(data).includes('')){
    error='Todos los campos son requeridos'
  }
  if(error.length){
    return error 
  }
  await addProduct(data)
  return redirect('/')
}


export default function NewProducts() {

  const error=useActionData() as string 
  console.log(error)


  return (
    <>
      <div className="flex justify-between ">
        <h2 className="text-4xl font-black text-slate-500">Registrar Productos</h2>
        <NavLink to="/" className="rounded-md bg-indigo-600 p-3 text-sm text-white shadow-sm hover:bg-indigo-500 font-bold  ">
          Volver a Productos
        </NavLink>


      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form
          className="mt-10"     
          method="POST" 
      >
        <ProductForm />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
        
      </Form>
    </>
  )
}
