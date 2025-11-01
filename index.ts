import express, {Request, Response} from 'express'

const app = express()

const PORT = 5000;

const products =[
    {id: 1, name: "product A", price: 10.0},
    {id: 2, name: "product B", price: 20.0},
    {id: 3, name: "product C", price: 30.0},
];

app.get("/products", (req:Request, res:Response)=>{
    res.json({message: "Product retrieved  successfully", products})
})

app.get("/products/:id", (req:Request, res:Response) =>{
    const productId =  req.params.id;
    console.log("product Id:", productId)
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
