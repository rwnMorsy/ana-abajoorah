import Icon from './Icon.jsx'

export default function ProductCard({ product }) {
  const image = product.images?.[0]
  return (
    <div className="cat">
      <div className="pic">
        {image ? <img src={image} alt={product.name} loading="lazy" /> : <Icon slug={product.category?.slug} />}
      </div>
      <div className="txt">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price">
          {Number(product.price).toLocaleString('ar-EG')} جنيه
          {product.stock === 0 && <small>غير متاح حالياً</small>}
        </div>
      </div>
    </div>
  )
}
