import { Check, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToBasket } from '../features/basket/basketSlice';
import { products } from '../features/products/products';
import { formatMoney } from '../utils/money';

export function ProductList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.basket.items);

  return (
    <section className="panel products-panel" aria-labelledby="products-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">YOUR SHOP</p>
          <h2 id="products-title">Products</h2>
        </div>
        <span className="muted small">5 essentials</span>
      </div>
      <div className="product-list">
        {products.map((product) => {
          const quantity = items.find((item) => item.productId === product.id)?.quantity ?? 0;
          return (
            <article className="product-row" key={product.id}>
              <div className="product-emoji" aria-hidden="true">{product.emoji}</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <strong className="product-price">{formatMoney(product.pricePence)}</strong>
              <button className={quantity ? 'button button-added' : 'button button-primary'} onClick={() => dispatch(addToBasket(product.id))} aria-label={`Add ${product.name} to basket`}>
                {quantity ? <Check size={16} /> : <Plus size={16} />}
                <span>{quantity ? `Add more (${quantity})` : 'Add'}</span>
              </button>
            </article>
          );
        })}
      </div>
      <div className="offer-note">
        <span className="offer-note-icon">✦</span>
        <div><strong>Smart savings, automatically</strong><p>Offers are applied as you shop.</p></div>
      </div>
    </section>
  );
}
