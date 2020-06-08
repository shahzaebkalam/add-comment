import { getCategories } from '../api_methods'

export const FETCH_CATEGORIES = 'fetch_categories'

export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
    payload: getCategories()
  }
}