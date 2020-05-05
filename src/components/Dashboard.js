import React from 'react'
import ManageCategories from './ManageCategories'
import CategoryBreakdown from './CategoryBreakdown'

function Dashboard() {

  const [activeMenuItem, setActiveMenuItem] = React.useState('menu-monthly-expenses')

  return (
    <div className="Home section">
      <div className="container">
        <div className="content">
          <h3 className="has-text-grey-light">Dashboard 📈</h3>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <aside class="menu">
              <ul class="menu-list">
                {activeMenuItem === 'menu-monthly-expenses'
                  ? <li className="has-background-white-ter"><a>Monthly Expenses</a></li>
                  : <li onClick={() => setActiveMenuItem('menu-monthly-expenses')}><a>Monthly Expenses</a></li>
                }
                {activeMenuItem === 'menu-category-manager'
                  ? <li className="has-background-white-ter"><a>Category Manager</a></li>
                  : <li onClick={() => setActiveMenuItem('menu-category-manager')}><a>Category Manager</a></li>
                }
              </ul>
            </aside>
          </div>

              {/* <Expenses /> */}
              {activeMenuItem === 'menu-monthly-expenses' && <CategoryBreakdown />}
              {activeMenuItem === 'menu-category-manager' && <ManageCategories />}

        </div>
      </div>
    </div>
  )
}

export default Dashboard
