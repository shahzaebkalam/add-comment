import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { fetchCategories } from '../actions/action_categories'


class Categories extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  renderCategories() {
    const { categories } = this.props
    if(!categories) {
      return <span>loading...</span>
    }
    console.log(this.props)
    if (categories) {
      return _.map(categories, category => {
        return (
          <li key={category.name} className="category-item">
            <Link to={`/${category.path}`} className="category-link">{category.name}</Link>
          </li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <h3>categories</h3>
        <ul className="category-parent">{ this.renderCategories() }</ul>
      </div>
    )
  }
}

Categories.propTypes = {
  fetchCategories: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps, { 
  fetchCategories 
})(Categories)