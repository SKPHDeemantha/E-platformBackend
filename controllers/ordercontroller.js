import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

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

    for (let i = 0; i < newOrderData.orderedItems.length; i++) {
      const product = await Product.findOne({
        productId: newOrderData.orderedItems[i].productId
      });
      if (product == null) {
        return res.json({
          message: "Product with id " + newOrderData.orderedItems[i].productId + " not found"
        });
      }
      lableTotal +=product.price =newOrderData.orderedItems[i].qty;
      total +=product.lastPrice * newOrderData.orderedItems[i].qty;
      newProductArray[i] = {
        name: product.productName,
        price: product.lastPrice,
        lablePrice :product.price,
        quantity: newOrderData.orderedItems[i].qty,
        image: product.images[0]
      };
    }

    newOrderData.orderedItems = newProductArray;
    newOrderData.orderedItems =newProductArray;
    newOrderData.total=total;
    newOrderData.orderId = "QUOTE"; 
    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);
    const savedOrder= await order.save();

    res.json({
      message: "Quote created",
      order : savedOrder
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}