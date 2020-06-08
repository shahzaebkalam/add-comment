import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navigation = (props) => (
  <div>
    <Link to={props.route} className="route btn btn-router">
      {props.linkText}
    </Link>
  </div>
)

Navigation.propTypes = {
  route: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired
}

export default Navigation