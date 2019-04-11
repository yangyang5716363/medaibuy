import React, { Component } from 'react'
import NoData from '@/components/NoData'
import './styles.css'

class Refferral extends Component {

  leftRefferral (leftURL, leftCount) {
    return [(
      <ul className="refferral__left-url" key="a">
        {
          leftURL && leftURL.length && leftURL.map((url, key) => <li key={ key }>{ url.value }</li>)
        }
      </ul>),

      (<ul className="refferral__left-percentage" key="b">
        {
          leftCount && leftCount.length && leftCount.map((count, key) => (
            <li key={ key }>
              <span>{ count.value }</span>
              <em>{ count.proportion }</em>
            </li>
          ))
        }
      </ul>),

      (<ol className="refferral__left-line" key="c">
        {
          leftURL && leftURL.length && leftURL.slice(1).map((url, key) => <li key={ key }></li>)
        }
      </ol>),
    ]
  }

  rightRefferral (rightURL, rightCount) {
    return [
      (
        <ol className="refferral__right-line refferral__right-line-right" key="1">
          { rightURL && rightURL.length && rightURL.slice(1).map((url, key) => <li key={ key }></li>) }
        </ol>
      ),
      (
        <ul className="refferral__right-percentage" key="2">
          {
            rightCount && rightCount.length && rightCount.map((count, key) => (
              <li key={ key }>
                <span>{ count.value }</span>
                <em>{ count.proportion }</em>
              </li>
            ))
          }
        </ul>
      ),
      (
        <ul className="refferral__right-url" key="3">
          {
            rightURL && rightURL.length && rightURL.map((url, key) => <li key={ key }>{ url.value }</li>)
          }
        </ul>
      ),
    ]
  }

  allRefferral (leftURL, leftCount, rightURL, rightCount, content) {
    return [
      (
        ( leftURL && leftCount && leftURL.length && leftCount.length ) ? 
          this.leftRefferral(leftURL, leftCount) : 
          <div className="empty" key="1"><NoData /></div>
      ),
      (
        <div className="refferral__line" key="2">
          <div></div>
        </div>
      ),
      (
        <div className="refferral__arc" key="3">
          <div>{ content }</div>
        </div>
      ),
      (
        <div className="refferral__line refferral__line-right" key="4">
          <div></div>
        </div>
      ),
      (
        ( rightURL && rightCount && rightURL.length && rightCount.length ) ? 
          this.rightRefferral(rightURL, rightCount) : 
          <div className="empty" key="5"><NoData /></div>
      )
    ]
  }

  render() {
    const { RefferralData = {}, style } = this.props
    const { leftURL = [], leftCount = [], rightURL = [], rightCount = [], content } = RefferralData
    const allEmpty = () => (
      <div className="all-empty">
        <div className="empty"><NoData /></div>
      </div>
    )
    return (
      <div className="refferral" style={ style }>
        {
          ( !leftURL.length && !leftCount.length && !rightURL.length && !rightCount.length ) ? 
            allEmpty() : 
            this.allRefferral(leftURL, leftCount, rightURL, rightCount, content)
        }
      </div>
    )
  }
}

export default Refferral