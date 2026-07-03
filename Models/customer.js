const mongoose = require("mongoose");

// const Schema = mongoose.Schema;
const {Schema} = mongoose;

main()
.then(() => {console.log("connection successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
  item : String,
  price : Number,
});

const customerSchema = new Schema({
  name : String,
  orders : [
    {
      type : Schema.Types.ObjectId,
      ref : "Order"
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async() => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
}

findCustomer();

// const addCustomer = async() => {
//   let cust1 = new Customer({
//     name : "rahul Kumar",
//   });

//   let order1 = await Order.findOne({item : "Chips"});
//   let order2 = await Order.findOne({item : "Chocolates"});

//   cust1.orders.push(order1);
//   cust1.orders.push(order2);

//   let result = await cust1.save();
//   console.log(result);

//   // let result = await Customer.find({});
//   // console.log(result);
// }

// addCustomer();

// const addOrders = async() => {
//   let res = await Order.insertMany([
//     { item : "Samosa", price : 12 },
//     {item : "Chips", price : 20},
//     {item : "Chocolates", price : 40},
//   ]);

//   console.log(res);
// };

// addOrders();

