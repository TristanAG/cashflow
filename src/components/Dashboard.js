import React from 'react'

function Dashboard() {
  return (
    <div className="Home section">
      <div className="container">
        <h3 className="has-text-grey-light">Dashboard 📈</h3>
      </div>
      <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <div className="content">
                {/* <CreateLink /> */}
              </div>
            </div>
            <div className="column">
              <div className="content">
                {/* <Expenses /> */}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
