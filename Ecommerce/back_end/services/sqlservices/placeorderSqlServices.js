const { sqlc } = require("../../database/pool");
let sql = require("mssql");
const newOrderPlace = async (
  res,
  address,
  city,
  state,
  pincode,
  id,
  cartitem,
  payid
) => {
  // console.log("ye cart hai", cartitem);
  let total = cartitem.quantity * cartitem.price;
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, cartitem._id)
    .input("user_id", sql.Int, id)
    .input("prod_id", sql.Int, cartitem.product_id)
    .input("seller", sql.Int, cartitem.seller)
    .input("address", sql.VarChar, address)
    .input("city", sql.VarChar, city)
    .input("state", sql.VarChar, state)

    .input("pincode", sql.Int, pincode)
    .input("quantity_ordered", sql.Int, cartitem.quantity)
    .input("order_total", sql.Int, total)
    .input("quantity", sql.Int, cartitem.quantity)
    .input("stock", sql.Int, cartitem.stock)

    .query(
      `   BEGIN TRANSACTION  
     
 
        update products set quantity=(@stock -@quantity) where _id=@prod_id and quantity>=@quantity 
        IF @@ROWCOUNT = 0
BEGIN
ROLLBACK TRANSACTION;
RETURN;
END;
   INSERT INTO orders (user_id,prod_id,address,city,state,pincode,seller,order_total,quantity_ordered,payment_status)VALUES(@user_id,@prod_id,@address,@city,@state,@pincode,@seller,@order_total,@quantity_ordered,'pending')
   IF @@ROWCOUNT = 0
BEGIN
ROLLBACK TRANSACTION;
RETURN;
END;
delete from carts where _id=@_id;
   
IF @@ROWCOUNT = 0
BEGIN
ROLLBACK TRANSACTION;
RETURN;
END;
      COMMIT TRANSACTION  `
    );

  console.log(result, "res for trans");
  // if (result.rowAffected != [1, 1, 1]) {
  //   res.json({ allplaced: "false" });
  // }
};
const updateStatus = async (status, _id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .input("status", sql.VarChar, status)
    .query(
      `update orders set  payment_status=@status  where user_id=@_id and  payment_status ='pending' and payid is null;`
    );
};
const updatePayId = async (payid, _id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .input("payid", sql.VarChar, payid)
    .query(
      `update orders set  payid=@payid  where user_id=@_id and payment_status='Pay Success' and payid is null; `
    );
};
const refillTheCart = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(
      `select * from orders where payment_status='failed' and user_id = @_id`
    );
  result.recordset.forEach(async (order) => {
    let order_id = order.order_id;
    let quantity = order.quantity_ordered;
    let product_id = order.prod_id;
    let result1 = await pool
      .request()
      .input("product_id", sql.Int, product_id)
      .input("order_id", sql.Int, order_id)
      .input("quantity", sql.Int, quantity)
      .query(`update products set quantity = quantity+@quantity where _id=@product_id;
       update orders set payment_status='refiled stock due to failure' where order_id =@order_id
      `);
  });
};

const deletePlaceOrderBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(
      `update orders set user_id =null,status='cancelled'  where order_id=@_id`
    );
  // .query(`update orders set status='cancelled'  where order_id=@_id`);
};
const confirmPlaceOrderBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool
    .request()
    .input("_id", sql.Int, _id)
    .query(
      `update orders set user_id =null,status='delivered'  where order_id=@_id`
    );
  // .query(`update orders set status='cancelled'  where order_id=@_id`);
};

const getMyordersWithItemsBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool.request().input("_id", sql.Int, _id)
    .query(`select orders.order_id,products.name,products.price,orders.address,orders.status,orders.order_total,orders.quantity_ordered ,products.images,orders.payment_status
    from orders inner join products on orders.prod_id=products._id where orders.user_id=@_id and (payment_status ='Pay Success' or payment_status= 'pending');`);

  return result.recordset;
};
const getMyPendingOrdersWithItemsBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool.request().input("_id", sql.Int, _id)
    .query(`select orders.order_id,products.name,products.price,orders.address,orders.status,orders.order_total,orders.quantity_ordered ,products.images,orders.payment_status
    from orders inner join products on orders.prod_id=products._id where orders.user_id=@_id and payment_status= 'pending';`);

  return result.recordset;
};
const getMyDeleviriesWithKeySellerBy_Id = async (_id) => {
  let pool = await sqlc;
  let result = await pool.request().input("_id", sql.Int, _id)
    .query(`select orders.order_id ,orders.user_id,products.name,products.price,orders.address,orders.status,orders.order_total,orders.quantity_ordered,orders.payment_status
    from orders inner join products on orders.prod_id=products._id where orders.seller=@_id and payment_status='Pay Success' or payment_status='pending';`);
  // console.log(result);
  return result.recordset;
};

module.exports = {
  newOrderPlace,
  updateStatus,
  deletePlaceOrderBy_Id,
  confirmPlaceOrderBy_Id,
  getMyordersWithItemsBy_Id,
  getMyDeleviriesWithKeySellerBy_Id,
  getMyPendingOrdersWithItemsBy_Id,
  updatePayId,
  refillTheCart,
};
