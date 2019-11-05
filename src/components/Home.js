import React from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Expenses from './Expenses'

class Home extends React.Component {
  render() {
    return (
      <div className="Home section">
        <div className="container">
            <div className="columns">
              <div className="column is-one-third">
                <div className="content">
                  <CreateLink />
                </div>
              </div>
              <div className="column">
                <div className="content">
                  <Expenses />
                </div>
              </div>
            </div>
          </div>
      </div>

    )
  }
}

export default Home
