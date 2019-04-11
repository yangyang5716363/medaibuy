import React, { PureComponent } from 'react'
import AdvertisingCard from '@/components/AdvertisingCard'
import CardHeader from '@/components/CardHeader'
import './styles.scss'

export default class extends PureComponent {
  constructor (props) {
    super(props)
    this.onMore = this.onMore.bind(this)
    this.onButton = this.onButton.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  onMore (event) {
    console.log( event )
  }

  onButton (event) {
    console.log( event )
  }

  onSelect (event) {
    console.log( event )
  }

  render() {
    const AdvertisingCardConfig = {
      // 收藏文案
      collection: 'Collection',

      logo: require('@/assets/cs2.png'),

      logoTitle: 'am Tangan Wanita Gedi 2018',

      // 描述
      description: "Midi Files VITA CE N'E' - Eros Ramazzotti A CHI (Hrt) (Live TV) - Fausto Leali DATEY SOGNAMI (Live 2018) - Bia-gio Antonaccivi ALWAYS REMEMBER US THIS WAY",
      /* 
        图片展示方式 
        static 静态面试 | staticPlay 播放 | staticScroll 滚动 | scroll 滚动图片
      */
      // images: {
      //   type: 'static',
      //   src: require('@/assets/cs.png')
      // },
      images: {
        type: 'staticPlay',
        src: require('@/assets/cs.png')
      },
      // images: {
      //   type: 'scroll',
      //   srcArr: [
      //     {
      //       value: 0,
      //       src: require('@/assets/cs.png')
      //     },
      //     {
      //       value: 1,
      //       src: require('@/assets/cs.png')
      //     },
      //     {
      //       value: 2,
      //       src: require('@/assets/cs.png')
      //     },
      //   ]
      // },
      // images: {
      //   type: 'play',
      //   src: 'https://www.w3schools.com/html/mov_bbb.mp4'
      // },
      // images: {
      //   type: 'staticScroll',
      //   src: require('@/assets/cs.png')
      // },
      // 标题
      title: 'Canzoni Karaoke, basi musical',
      // 介绍
      introduction: 'Song Service offre canzoni karaoke e basi musicali in formato MP3 e MIDI. Scarica oltre successi italiani e internazionali.',
      // icon 列表
      applications: [
        {
          type: 'thumbs-up',
          value: 293
        },
        {
          type: 'message',
          value: 47
        },
        {
          type: 'bounce',
          value: 80
        },
        {
          type: 'time',
          value: 248
        },
        {
          type: 'mobile',
          value: 248
        },
        {
          type: 'sports',
          value: 248
        },
        {
          type: 'eye',
          value: '2018.11.11~2019.01.15'
        }
      ],

      // 原始地址
      original: {
        content: 'https://www.baidu.com',
        url: 'https://www.baidu.com'
      },

      more: 'Learn More'
    }

    const PageHeaderConfig = {
      title: 'Offer Analysis',
      
      // 标题整体样式
      style: {
        'fontSize': '12px',
        'height': '45px',
      },

      // tips 文本
      tipsOps: {
        text: 'prompt text',
      },

      // button 列表
      buttonOps: {
        data: [
          {
            key: 0,
            value: '左侧',
            // 默认是否选中
            active: true
          },
          {
            key: 1,
            value: '中间',
            active: false
          },
          {
            key: 2,
            value: '中间',
            active: false
          },
          {
            key: 3,
            value: '中间',
            active: false
          },
          {
            key: 4,
            value: '右侧',
            active: false
          }
        ]
      },

      // 下拉列表
      selectOps: {
        // 默认值
        copywriting: 'all',
        data: [
          {
            key: 0,
            value: '列表1'
          },
          {
            key: 1,
            value: '列表2'
          },
          {
            key: 2,
            value: '列表3'
          }
        ]
      },

      links: {
        text: '我是链接',
        style: {
          fontSize: '12px'
        }
      }
    }

    return (
      <div className="home">
        <AdvertisingCard { ...AdvertisingCardConfig } />
        
        <CardHeader
          { ...PageHeaderConfig }
          onSelectClick={ this.onSelect }
          onMoreClick={ this.onMore }
          onButtonClick={ this.onButton }
        />
      </div>
    );
  }
}
