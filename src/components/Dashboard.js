import React from 'react'
import ManageCategories from './ManageCategories'
import CategoryBreakdown from './CategoryBreakdown'

function Dashboard() {
  return (
    <div className="Home section">
      <div className="container">
        <div className="content">
          <h3 className="has-text-grey-light">Dashboard 📈</h3>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <ManageCategories />
          </div>
          <div className="column">
            <div className="content">
              {/* <Expenses /> */}
              <CategoryBreakdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
