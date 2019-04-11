import ImageScroll from '@/components/ImageScroll'
import LazyLoad from './LazyLoad'

// 根据类型 返回图片展示形式
export default {
  static (image, height, ImageType, width) {
    return <img src={ image.src} height={ `${height * ( ImageType / width )}px` } />
    // return <LazyLoad dataSrc={image.src} />
  },

  staticPlay (image, height, ImageType, width) {
    return (
      <div>
        <div className="mask">
          <span></span>
        </div>
        <img src={ image.src} height={ `${height * ( ImageType / width )}px` } />
        {/* <LazyLoad dataSrc={image.src} /> */}
      </div>
    )
  },

  // 静态滚动
  staticScroll (image, height, ImageType, width) {
    return (
      <div className="advertising-card__static-scroll">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <img src={ image.src} width={ `${height * ( ImageType / width )}px` } />
        {/* <LazyLoad dataSrc={image.src} /> */}
      </div>
    )
  },

  // 滚动效果
  scroll (image) {
    return (
      <div>
        <ImageScroll image={ image } />
      </div>
    )
  },

  // 播放器
  play ({ src, image }) {
    return (
      <video width="100%" controls preload="meta" poster={ image }>
        <source src={ src } type="video/mp4" />
      </video>
    )
  }
}