import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    
    images: [
      {
        type: String,
        default: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
         
        
      },
    ],
   
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review', // Reference to Review schema
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;


