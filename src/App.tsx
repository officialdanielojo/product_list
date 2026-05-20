import { useState } from 'react'
import dessertsData from './data.json'
import './mediaQuery.css'

function App() {
  // Cart state stored as an object: { productId: quantity }
  const [cart, setCart] = useState<Record<string, number>>({})
  const [showOrder, setShowOrder] = useState(false)

  // Helper functions to manage state
  const addToCart = (id: string | number) => {
    setCart((prev) => ({ ...prev, [id]: 1 }))
  }

  const updateQuantity = (id: string | number, amount: number) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0
      const newQty = currentQty + amount

      if (newQty <= 0) {
        const updatedCart = { ...prev }
        delete updatedCart[id]
        return updatedCart
      }

      return { ...prev, [id]: newQty }
    })
  }

  // Derived state values
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  const totalPrice = dessertsData.reduce((sum, dessert) => {
    const qty = cart[dessert.id] || 0
    return sum + qty * dessert.price
  }, 0)

  return (
    <>
      <main>
        {/* PRODUCT LIST SECTION */}
        <section className="sect_1">
          <header>
            <h2>Desserts</h2>
          </header>

          <div className="products">
            {dessertsData.map((dessert) => {
              const quantity = cart[dessert.id] || 0

              return (
                <div key={dessert.id} className="dessert">
                  <div
                    className={`img_con ${quantity > 0 ? 'active-border' : ''}`}
                    style={{
                      backgroundImage: `url(${dessert.image})`,
                      backgroundSize: 'cover',
                    }}
                  ></div>

                  {quantity === 0 ? (
                    <button
                      className="add_to_cart"
                      onClick={() => addToCart(dessert.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        fill="none"
                        viewBox="0 0 21 20"
                      >
                        <g fill="#C73B0F" clipPath="url(#a)">
                          <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                          <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M.333 0h20v20h-20z" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div>
                      <div className="active_con" />
                      <div className="quantity_con" style={{ display: 'flex' }}>
                        <div
                          className="decrement_con"
                          onClick={() => updateQuantity(dessert.id, -1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="2"
                            fill="none"
                            viewBox="0 0 10 2"
                          >
                            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                          </svg>
                        </div>

                        <span className="num_of_quantity">{quantity}</span>

                        <div
                          className="increment_con"
                          onClick={() => updateQuantity(dessert.id, 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="none"
                            viewBox="0 0 10 10"
                          >
                            <path
                              fill="#fff"
                              d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="category">{dessert.category}</p>
                  <p className="name">{dessert.name}</p>
                  <p className="price">${dessert.price.toFixed(2)}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CART PANEL SECTION */}
        <section className="sect_2">
          <h2>
            Your Cart (<span id="quantity">{totalItems}</span>)
          </h2>

          {totalItems === 0 ? (
            <div className="empty_con">
              <div>
                <img
                  src="./assets/images/illustration-empty-cart.svg"
                  alt="Empty Cart"
                />
              </div>
              <p>Your added items will appear here</p>
            </div>
          ) : (
            <div className="order_con" style={{ display: 'block' }}>
              <div className="order_placement">
                {dessertsData.map((dessert) => {
                  const qty = cart[dessert.id]
                  if (!qty) return null

                  return (
                    <div
                      className="cart_item"
                      style={{
                        marginBottom: '1rem',
                      }}
                    >
                      <div key={dessert.id}>
                        <p
                          className="cart_item_name"
                          style={{ fontWeight: 'bold' }}
                        >
                          {dessert.name}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'center',
                          }}
                        >
                          <span
                            style={{ color: '#C73B0F', fontWeight: 'bold' }}
                          >
                            {qty}x
                          </span>
                          <span style={{ color: '#87635a' }}>
                            @ ${dessert.price.toFixed(2)}
                          </span>
                          <span
                            style={{ color: '#26110a', fontWeight: 'bold' }}
                          >
                            ${(qty * dessert.price).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div
                        className="remove_product"
                        onClick={() => updateQuantity(dessert.id, -qty)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="none"
                          viewBox="0 0 10 10"
                        >
                          <path
                            fill="#CAAFA7"
                            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                          />
                        </svg>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="checkout_section">
                <div className="total">
                  <p>Order Total</p>
                  <h1 id="total_cart_price">${totalPrice.toFixed(2)}</h1>
                </div>

                <div className="carbon_con">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    fill="none"
                    viewBox="0 0 21 20"
                  >
                    <path
                      fill="#1EA575"
                      d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"
                    />
                    <path
                      fill="#1EA575"
                      d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"
                    />
                  </svg>
                  <p>
                    This is a <span>carbon-neutral</span> delivery
                  </p>
                </div>

                <button onClick={() => setShowOrder(true)}>
                  Confirm Order
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      {/* Confirmed Order */}
      {showOrder && (
        <section>
          <div className="modal_backdrop" onClick={() => setShowOrder(false)} />
          <div className="show_order">
            <div className="header">
              <img
                src="./assets/images/icon-order-confirmed.svg"
                alt="Order Confirmed"
              />
              <p>Order confirmed</p>
              <span>We hope you enjoy your food!</span>
            </div>

            <div className="total_order">
              {dessertsData.map((dessert) => {
                const qty = cart[dessert.id]
                if (!qty) return null
                return (
                  <div>
                    <div
                      className="cart_item"
                      style={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '15px',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={dessert.image}
                          alt={dessert.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                          }}
                        />
                        <div>
                          <p
                            className="cart_item_name"
                            style={{
                              fontWeight: '500',
                              marginBottom: '10px',
                              fontSize: '18px',
                            }}
                          >
                            {dessert.name}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              gap: '15px',
                              alignItems: 'center',
                            }}
                          >
                            <span
                              style={{ color: '#C73B0F', fontWeight: 'bold' }}
                            >
                              {qty}x
                            </span>
                            <span style={{ color: '#87635a' }}>
                              @ ${dessert.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          color: '#26110a',
                          fontWeight: '600',
                          fontSize: '20px',
                        }}
                      >
                        ${(qty * dessert.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
              <div className="total" style={{ marginBlock: '30px' }}>
                <p>Order Total</p>
                <h1 id="total_cart_price">${totalPrice.toFixed(2)}</h1>
              </div>
            </div>
            <div className="checkout_section">
              <button
                onClick={() => {
                  setCart({})
                  setShowOrder(false)
                }}
              >
                Start New Order
              </button>
            </div>
          </div>
        </section>
      )}

      {/* <div className="attribution">
        <p>
          Challenge by{' '}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by{' '}
          <a
            href="https://github.com/officialdanielojo"
            target="_blank"
            rel="noreferrer"
          >
            Daniel Ojo
          </a>
          .
        </p>
      </div> */}
    </>
  )
}

export default App
