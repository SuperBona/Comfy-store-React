import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  // 2
  const { filtered_products: products, grid_view } = useFilterContext()

  // 3
  if (products.lenght < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )
  }

  // 4
  if (grid_view === false) {
    return <ListView products={products}></ListView>
  }

  return <GridView products={products}>product list</GridView>
}

export default ProductList

/* this is linked to ProductsPage. and in here there's going to be one return if we cannot display any product, and then there's going to be another return where we either display the list view or the grid view. */

/* 1: let's start with grid view (return the GridView component) and get from the filter_products the products. 
we need to set up useFilterContext in filter_context.js, go there */

/* 2: invoke useFilterContext, the hook, and pass it in the gridview. go on GridView */

/* 3: set up one return if i don't have any product, so the case if filtered_product is empty. If my filtered_products array is filtered down to an empty array, then return... */

/* 4: state for the grid view, eventually controlled dinamically and prepare listView for this case. go on ListView */
