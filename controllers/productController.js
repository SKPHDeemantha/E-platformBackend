import Product from "../models/product.js";

export function getProduct(req,res){

    Product.find().then(
        (productList)=>{
            res.json({
                list : productList
            })
        }).catch(()=>{
            res.json({
                message :"Error"
            })
        })
}

export function createProduct(req,res){
    
//     console.log(req.user)

    
//   if(req.user == null){
//     res.json({
//       message : "You are not logged in"
//     })
//     return
//   }

//   if(req.user.type != "admin"){
//     res.json({
//       message : "You are not an admin"
//     })
//     return
//   }


const product =new Product(req.body)
    product.save().then(()=>{
        res.json({
            message :"Product created"
        })
    }).catch(()=>{
        res.json({
            meassge :"product not created"
        })
    })

}
// export function getProductByName(req,res){
//     const name =res.params.name;

//     Product.find({name : name}).then(
//         (productList)=>{
//             res.jason({
//                 list : productList
//             })
//         }
//     ).catch(
//         ()=>[
//             res.jason({
//             message :"Error"
//             })
//         ]
//     )
// }