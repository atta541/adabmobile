const Cart = require('../../models/cart.model');
const SubItems = require('../../models/subItems.model'); 

exports.addToCart = async (req, res) => {
  try {
    
    const userId = req.user.id; 
    const { productId, quantity } = req.body;
  
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const product = await SubItems.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity), price: product.price, name: product.name, picture: product.picture });
    }

    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateCart = async (req, res) => {
  
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing from token' });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.splice(itemIndex, 1); 
      }

      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.deleteFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; 

  
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getCart = async (req, res) => {
   

  const userId = req.user.id; 
  if (!userId) {
      return res.status(400).json({ message: 'User ID is missing from token' });
  }

  try {
      const cart = await Cart.findOne({ userId }).populate({
          path: 'items.productId', 
          model: 'SubItems' 
      });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

       
      res.status(200).json(cart);
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: error.message });
  }
};



exports.clearCart = async (userId) => { 
  try {
     
    if (!userId) {
      console.error('clearCart function: User ID is missing');
      return false;
    }

    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      console.error('clearCart function: Cart not found');
      return false;
    }

    return true; 
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};
