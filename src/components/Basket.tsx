import { Minus, Plus, ShoppingBasket, Trash2, Tag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { calculateBill } from '../features/basket/bill';
import { clearBasket, decreaseQuantity, increaseQuantity, removeFromBasket } from '../features/basket/basketSlice';
import { formatMoney } from '../utils/money';

export function Basket() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.basket.items);
  const bill = calculateBill(items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="panel basket-panel" aria-labelledby="basket-title">
      <div className="panel-heading basket-heading">
        <div>
          <p className="eyebrow">READY WHEN YOU ARE</p>
          <h2 id="basket-title">Your basket <span className="count-pill">{itemCount}</span></h2>
        </div>
        {items.length > 0 && <button className="text-button" onClick={() => dispatch(clearBasket())}>Clear all</button>}
      </div>

      {bill.lines.length === 0 ? (
        <div className="empty-basket">
          <div className="empty-icon"><ShoppingBasket size={30} /></div>
          <h3>Your basket is waiting</h3>
          <p>Add a few products to see your bill and special offers here.</p>
        </div>
      ) : (
        <>
          <div className="basket-lines">
            {bill.lines.map((line) => (
              <article className="basket-line" key={line.productId}>
                <div className="basket-product-emoji" aria-hidden="true">{line.product.emoji}</div>
                <div className="basket-item-main">
                  <div className="basket-item-top">
                    <div><h3>{line.product.name}</h3><p>{formatMoney(line.unitPricePence)} each</p></div>
                    <strong className="line-total">{formatMoney(line.totalPence)}</strong>
                  </div>
                  <div className="basket-item-bottom">
                    <div className="quantity-control" aria-label={`${line.product.name} quantity controls`}>
                      <button onClick={() => dispatch(decreaseQuantity(line.productId))} aria-label={`Decrease ${line.product.name} quantity`}><Minus size={14} /></button>
                      <span aria-live="polite">{line.quantity}</span>
                      <button onClick={() => dispatch(increaseQuantity(line.productId))} aria-label={`Increase ${line.product.name} quantity`}><Plus size={14} /></button>
                    </div>
                    {line.discountPence > 0 && <span className="discount-label"><Tag size={13} /> {line.discountLabel}</span>}
                    <button className="remove-button" onClick={() => dispatch(removeFromBasket(line.productId))} aria-label={`Remove ${line.product.name}`} title="Remove item"><Trash2 size={15} /></button>
                  </div>
                  {line.discountPence > 0 && <div className="line-savings">You save {formatMoney(line.discountPence)}</div>}
                </div>
              </article>
            ))}
          </div>

          <div className="bill-summary">
            <div className="summary-row"><span>Subtotal</span><span>{formatMoney(bill.subtotalPence)}</span></div>
            <div className="summary-row savings-row"><span>Special offer savings</span><span>−{formatMoney(bill.savingsPence)}</span></div>
            <div className="summary-total"><div><span>Total to pay</span><small>Including all discounts</small></div><strong>{formatMoney(bill.totalPence)}</strong></div>
            {bill.savingsPence > 0 && <div className="success-message">🎉 You saved {formatMoney(bill.savingsPence)} on this shop!</div>}
          </div>
        </>
      )}
    </section>
  );
}
