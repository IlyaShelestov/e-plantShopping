import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalSum = cart.reduce(
      (total, item) => Number(item.cost.substr(1)) * item.quantity + total,
      0
    );
    return totalSum;
  };

  const calculateTotalNumber = () => {
    const totalNum = cart.reduce((total, item) => item.quantity + total, 0);
    return totalNum;
  };

  const handleContinueShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  const handleCheckout = (e) => {
    alert("Coming Soon...");
  };

  const handleIncrement = (item) => {
    const prevQuantity = cart.find((i) => i.name === item.name).quantity;
    dispatch(updateQuantity({ name: item.name, quantity: prevQuantity + 1 }));
  };

  const handleDecrement = (item) => {
    const prevQuantity = cart.find((i) => i.name === item.name).quantity;
    if (prevQuantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: prevQuantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const plant = cart.find((i) => i.name === item.name);
    if (plant) {
      return plant.quantity * Number(plant.cost.substr(1));
    }
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      >
        Total Number of Plants: {calculateTotalNumber()}
      </div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckout(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
