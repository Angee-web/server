import Order from "../../models/order.js";

export const getAllOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


export const getOrderDetailsForAdmin = async (req, res) => {
    try {
      const {id } = req.params;
     
      const order = await Order.findById(id); 
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: " Order not found!",
        });
      }
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured",
      });
    }
  };