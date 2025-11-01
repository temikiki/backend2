import express, {Request, Response} from 'express'

const app = express()

const PORT = 5000;
app.use(express.json())

const products =[
    {id: 1, name: "Electric cooker", price: 10.0, catergory:"Electronics"},
    {id: 2, name: "carrot", price: 20.0, catergory:"Grocery"},
    {id: 3, name: "Iron", price: 30.0, catergory: "Electronics"},
];

app.get("/products", (req:Request, res:Response)=>{
    const catergory = req.query.catergory as string | undefined;
    if(catergory){
        const filteredProducts = products.filter((product) =>
            product.catergory.toLowerCase() === catergory.toLowerCase()
            );
            return res.json({
                message: "products retrived successfully",
                products: filteredProducts,
            });
    }
    return  res.json({
        message:"Product retrieved Successfully",
        products
    });
   
});

app.get("/products/:id", (req:Request, res:Response) =>{
    const productId =  req.params.id;
    const product = products.find((product) =>{
        if(product.id === parseInt(productId)){
            return product;
        }
    })
   
    return  res.json({
        message:"Product retrieved Successfully",
        product
    });
    
    
});


app.post("/products", (req:Request, res: Response) =>{
    const newProduct = req.body
    const updatedProduct = {...newProduct, id: products.length+ 1}
    products.push(updatedProduct);

    return res.status(201).json({
        message: "Product created successfully",
        product: updatedProduct,
    })
})

app.patch("/products/:id", (req:Request, res:Response) =>{
    const produceId = req.params.id;
    const updatedData = req.body;

    const ProductIndex = products.findIndex(
        (product) => product.id === parseInt(produceId)
    );
    if(ProductIndex === -1){
        return res.status(404).json({message: " Product not found"})
    }

    const updatedProduct = {...products[ProductIndex], ...updatedData};
    products[ProductIndex] = updatedProduct;
    return res.json({
        message:" product updated successfully",
        product: updatedProduct,
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
