import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => (
    <div className="header"> 
      <h1>readable</h1>
      <h3>{props.pageHeader}</h3>
    </div>
)

Header.propTypes = {
  pageHeader: PropTypes.string
}

export default Header