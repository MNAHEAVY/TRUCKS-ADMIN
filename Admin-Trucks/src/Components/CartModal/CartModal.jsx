import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./CartModal.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaWhatsapp } from "react-icons/fa";

const CartModal = ({ isVisible, onClose }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const removeFromCart = (productCode) => {
    const updatedCart = cart.filter((product) => product.codigo_producto !== productCode);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "3755600520";
    const message = cart
      .map((product) => `Producto: ${product.nombre}, Código: ${product.codigo_producto}`)
      .join("\n");
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      `Hola, me gustaría hacer un pedido de los siguientes productos:\n${message}`
    )}`;
  };
  const renderTooltipWhatsapp = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Hacer pedido por Whatsapp
    </Tooltip>
  );
  return (
    <div
      className={`cart-modal modal__content gradient ${isVisible ? "visible" : ""}`}
      role='dialog'
      aria-modal='true'
      aria-label='Cart'
    >
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='cart-modal__content cart-modal__content-bottom' tabIndex='-1'>
        <div className='cart-modal__form'>
          {cart.length === 0 ? (
            <>
              <h2>Your cart is empty</h2>
              <button className='continue-shopping-button' onClick={onClose}>
                Continue shopping
              </button>
            </>
          ) : (
            <>
              <h2>Tu carrito de compras</h2>
              <div className='cart-items'>
                {cart.map((product, index) => (
                  <div key={index} className='cart-card'>
                    {" "}
                    <button
                      type='button'
                      className='remove-button'
                      onClick={() => removeFromCart(product.codigo_producto)}
                    >
                      <FaTimes />
                    </button>
                    <a href={"/detail/" + product.codigo_producto}>
                      <img
                        src={product.imagen[0]}
                        alt={product.nombre}
                        className='cart-image'
                      />
                      <div className='cart-info'>
                        <p className='cart-title'>{product.nombre}</p>
                      </div>{" "}
                    </a>
                  </div>
                ))}
              </div>
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipWhatsapp}
              >
                <a
                  className='bn31'
                  href={generateWhatsAppLink()}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='bn31span'>
                    Comprar <FaWhatsapp />
                  </span>
                </a>
              </OverlayTrigger>
            </>
          )}
        </div>
        <button
          type='button'
          className='cart-modal__close-button modal__close-button link link--text focus-inset'
          aria-label='Close'
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default CartModal;
