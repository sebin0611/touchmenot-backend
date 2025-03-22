import mongoose from "mongoose";







const cartSchema = new mongoose.Schema({
    
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      products: [
        {
          productId:
           {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
          },
          quantity: 
          {
            type: Number,
            required: true,
            min: 1,
          },
          price:
           {
            type: Number,
            required :true,
            default : 0
          }
        },
      ],
      totalPrice:
       {
        type: Number,
        required: true,
      },
     
      },
        {
      timestamps: true, 
    }
  );


  
  cartSchema.virtual('calculatedTotalPrice').get(function () {
    return this.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  });

  
  
  
  const Cart = mongoose.model('Cart', cartSchema);
  export default Cart;