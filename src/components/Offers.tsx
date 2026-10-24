import { Gift, Percent, Sandwich } from 'lucide-react';

const offers = [
  { icon: Gift, title: 'Cheese treat', detail: 'Buy one cheese, get the second free', badge: '2 for 1' },
  { icon: Sandwich, title: 'Soup & bread', detail: 'Get 50% off bread when you buy soup', badge: '½ price' },
  { icon: Percent, title: 'Butter bonus', detail: 'Enjoy one-third off every butter', badge: '⅓ off' },
];

export function Offers() {
  return (
    <section className="offers-section" aria-labelledby="offers-title">
      <div className="section-title-row"><div><p className="eyebrow">A LITTLE EXTRA</p><h2 id="offers-title">Today's special offers</h2></div><span className="live-badge"><span /> Applied automatically</span></div>
      <div className="offers-grid">
        {offers.map(({ icon: Icon, title, detail, badge }) => <article className="offer-card" key={title}><div className="offer-icon"><Icon size={19} /></div><div className="offer-copy"><h3>{title}</h3><p>{detail}</p></div><span className="offer-badge">{badge}</span></article>)}
      </div>
    </section>
  );
}
