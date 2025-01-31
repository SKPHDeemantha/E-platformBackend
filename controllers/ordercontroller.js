import { mergeConfig } from "axios";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin, isCustomer } from "./userController.js";

export async function createOrder(req, res) {
  //methanata oya req eka pass karala na ekai aula
  // if (!isCustomer(req)) { 
  //   return res.json({
  //     message: "Please login as customer to create orders"
  //   });
  // }

  try {
    const latestOrder = await Order.find().sort({ orderId: -1 }).limit(1);
    let orderId;
    
 
    if (latestOrder.length === 0) {
      orderId = "CBC0001";
    } else {
      const currentOrderId = latestOrder[0].orderId;
      const numberString = currentOrderId.replace("CBC", "");
      const number = parseInt(numberString);
      const newNumber = (number + 1).toString().padStart(4, "0");
      orderId = "CBC" + newNumber;
    }

    const newOrderData = req.body;
    const newProductArray = [];

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await Product.findOne({
        productId: newOrderData.orderedItems[i].productId
      });
      if (product == null) {
        return res.json({
          message: "Product with id " + newOrderData.orderedItems[i].productId + " not found"
        });
      }
      newProductArray[i] = {
        name: product.productName,
        price: product.price,
        quantity: newOrderData.orderedItems[i].qty,
        image: product.images[0]
      };
    }

    newOrderData.orderedItems = newProductArray;
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);
    await order.save();

    res.json({
      message: "Order created"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export async function getOrders(req, res) {
  try {
    if(isCustomer(req)){
      const order =await Order.find({email:req.user.email});
      res.json(orders);
      return;
    }
    if(isAdmin(req)){
      const order =await Order.find({email:req.user.email});
      res.json(orders);
      return;
    }
    const orders = await Order.find({ email: req.user.email });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export async function getquote(req, res) { 
  try {
    const newOrderData = req.body;
    const newProductArray = [];

    let total=0;
    let lableTotal=0;
   console.log(req.body)

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await Product.findOne({
        ProductId: newOrderData.orderedItems[i].ProductId
      });
      if (product == null) {
       res.json({
          message: "Product with id " + newOrderData.orderedItems[i].ProductId + " not found"
        });

        return;
      }
      lableTotal +=product.price * newOrderData.orderedItems[i].qty;
      total +=product.lastPrice * newOrderData.orderedItems[i].qty;
      newProductArray[i] = {
        name: product.productName,
        price: product.lastPrice,
        lablePrice :product.price,
        quantity: newOrderData.orderedItems[i].qty,
        image: product.images[0]
      };
    }
    console.log(newProductArray);
    newOrderData.orderedItems = newProductArray;
    
    newOrderData.total=total;
   

    res.json({
      orderedItems :newProductArray,
      total:total,
      lableTotal:lableTotal,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export async function updateOrder(req,res){
  if(!isAdmin(req)){
    res.json({
      message: "Please login as dmin to update orders",
    });
  }
  try{
    const orderId =req.params.orderId;

    const order =await Order.findOne({
      orderId: orderId,
    });
    if(order ==null){
      res.status(404).json({
        message :"Order not found",
      })
      return;
    }
   const notes =req.body.notes;
   const status =req.body.status;

   const updateOrder =await Order.findOneAndUpdate(
    {orderId: orderId},
   {notes:notes,status:status}
   );
   res.json({
    message: "Order updated",
    updateOrder: updateOrder
  });

}catch(error){

  
  res.status(500).json({
    message: error.message,
  });
  }
}