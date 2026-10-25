import { useEffect, useState } from 'react'
import Icon from './components/Icon.jsx'
import ProductCard from './components/ProductCard.jsx'
import { API_URL, SHOP } from './config.js'

function useApi(path) {
  const [state, setState] = useState({ data: null, error: false })
  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}${path}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((data) => !cancelled && setState({ data, error: false }))
      .catch(() => !cancelled && setState({ data: null, error: true }))
    return () => {
      cancelled = true
    }
  }, [path])
  return state
}

export default function App() {
  const [lampOn, setLampOn] = useState(false)
  const [active, setActive] = useState('all')
  const categories = useApi('/api/categories')
  const products = useApi('/api/products')

  const list = (products.data || []).filter((p) => active === 'all' || p.category.slug === active)

  return (
    <>
      <header>
        <div className="wrap">
          <a className="logo" href="#top">{SHOP.name}</a>
          <nav>
            <a href="#cats">الأقسام</a>
            <a href="#products">المنتجات</a>
            <a href="#why">ليه إحنا</a>
            <a href="#contact">تواصل معنا</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className="hero">
          <div className="wrap">
            <div>
              <h1>إضاءة تعمل بيتك أدفأ</h1>
              <p>أباجورات ونجف وشابوهات وإضاءات مختارة بعناية، من محل شغال في الإضاءة من سنين. نساعدك تختار اللي يناسب غرفتك وذوقك.</p>
              <div className="btns">
                <a className="btn main" href="#products">شوف المنتجات</a>
                <a className="btn" href="#contact">تواصل معنا</a>
              </div>
            </div>
            <div className={`scene${lampOn ? ' on' : ''}`}>
              <div className="halo" />
              <button className="switch" type="button" onClick={() => setLampOn((v) => !v)}>
                {lampOn ? 'اطفي الأباجورة' : 'أنوّر الأباجورة'}
              </button>
              <svg viewBox="0 0 120 200" style={{ color: '#e9d3a8' }}><use href="#lamp" /></svg>
            </div>
          </div>
        </div>

        <section id="cats">
          <div className="wrap">
            <h2 className="sec-title">أقسامنا</h2>
            <p className="sec-sub">كل اللي تحتاجه لإضاءة البيت في مكان واحد</p>
            <div className="grid">
              {(categories.data || []).map((c) => (
                <a key={c.id} className="cat" href="#products" onClick={() => setActive(c.slug)}>
                  <div className="pic"><Icon slug={c.slug} /></div>
                  <div className="txt">
                    <h3>{c.name}</h3>
                    <p>{c._count.products} منتج</p>
                  </div>
                </a>
              ))}
            </div>
            {categories.error && <p className="state">تعذر تحميل الأقسام، حاولي تاني بعد شوية.</p>}
          </div>
        </section>

        <section id="products" className="band">
          <div className="wrap">
            <h2 className="sec-title">منتجاتنا</h2>
            <p className="sec-sub">&nbsp;</p>
            <div className="tabs">
              <button type="button" className={`btn${active === 'all' ? ' active' : ''}`} onClick={() => setActive('all')}>الكل</button>
              {(categories.data || []).map((c) => (
                <button key={c.id} type="button" className={`btn${active === c.slug ? ' active' : ''}`} onClick={() => setActive(c.slug)}>
                  {c.name}
                </button>
              ))}
            </div>
            <div className="grid">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {products.error && <p className="state">تعذر تحميل المنتجات، تأكدي إن السيرفر شغال.</p>}
            {!products.error && products.data && list.length === 0 && <p className="state">مفيش منتجات في القسم ده دلوقتي.</p>}
            {!products.error && !products.data && <p className="state">جاري التحميل...</p>}
          </div>
        </section>

        <section id="why">
          <div className="wrap">
            <h2 className="sec-title">ليه "{SHOP.name}"؟</h2>
            <p className="sec-sub">&nbsp;</p>
            <div className="why">
              <div><h3>خبرة في الشغل</h3><p>شغالين في الإضاءة من سنين ونعرف إيه اللي يناسب كل مكان.</p></div>
              <div><h3>مشورة صادقة</h3><p>ابعتلنا صورة الأوضة ونقترح عليك أنسب إضاءة ولون لمبة.</p></div>
              <div><h3>تركيب وتوصيل</h3><p>نوصّل ونركّب النجف والسبوتات لحد عندك.</p></div>
            </div>
          </div>
        </section>

        <section id="contact" className="band">
          <div className="wrap contact">
            <h2 className="sec-title">تواصل معنا</h2>
            <p>ابعت اسم المنتج أو صورة اللي عجبك وهنرد عليك في أقرب وقت</p>
            <div className="info">
              <span>العنوان: {SHOP.address}</span>
              <span>مواعيد الشغل: {SHOP.hours}</span>
              <span>الهاتف: {SHOP.phone}</span>
            </div>
            <a className="btn main" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noopener noreferrer">كلمنا على واتساب</a>
          </div>
        </section>
      </main>

      <footer>© {SHOP.name}، كل الحقوق محفوظة</footer>
    </>
  )
}
