import './App.css'
import Cart from './components/Cart.jsx'
import ProductList from './components/Products.jsx'

function App() {
  return (
    <>
      <div className="container my-5">
          <div>
              <div className="row">
                  <div className="col-md-8">
                      <div className="row row-gap-4">
                          <h1 className='heading'>Desserts</h1>
                          <ProductList />
                      </div>
                  </div>

                  <div className="col-md-4">
                      <div id="cartItems">
                        <Cart />
                      </div>
                  </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default App