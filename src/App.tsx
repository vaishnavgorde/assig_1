import { Leaf, ShoppingBag, Sparkles } from 'lucide-react';
import { Basket } from './components/Basket';
import { Offers } from './components/Offers';
import { ProductList } from './components/ProductList';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header"><div className="brand"><div className="brand-mark"><Leaf size={22} /></div><div><span className="brand-name">fresh<span>basket</span></span><span className="brand-caption">GOOD FOOD. SMART SAVINGS.</span></div></div><div className="header-right"><span className="header-message"><Sparkles size={15} /> Your everyday shop, made easy</span><div className="header-bag"><ShoppingBag size={18} /></div></div></header>
      <main className="main-content">
        <section className="hero"><div className="hero-copy"><span className="hero-kicker"><span className="hero-dot" /> SIMPLE SHOPPING, BETTER VALUE</span><h1>Good things go<br /><em>in your basket.</em></h1><p>Pick your favourites. We’ll take care of the offers, savings, and sums.</p></div><div className="hero-art" aria-hidden="true"><div className="art-circle art-circle-one"/><div className="art-circle art-circle-two"/><span className="floating-food food-bread">🥖</span><span className="floating-food food-cheese">🧀</span><span className="floating-food food-apple">🍎</span><span className="floating-food food-leaf">🌿</span><div className="art-tag"><Sparkles size={14} /> SAVINGS MADE SIMPLE</div></div></section>
        <div className="shopping-layout"><ProductList /><Basket /></div>
        <Offers />
        <footer className="site-footer"><span>© 2026 Fresh Basket</span><span><Leaf size={14} /> Better value, one shop at a time</span><span>Prices in GBP (£)</span></footer>
      </main>
    </div>
  );
}
