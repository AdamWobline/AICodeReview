import { useSelector, useDispatch } from 'react-redux'
import { setPagination } from '../reducers/paginationReducer'
import React from 'react';

const Pagination = () => {
  const dispatch = useDispatch()
  const pagination = useSelector(state => state.pagination)

  return (
    <div className="PaginationBar">
      <div>
        <span
          className={ pagination === 5 ? "Pagination__Btn Pagination__Btn--Active" : "Pagination__Btn" }
          role="button"
          onClick={() => dispatch(setPagination(5))}
        >5</span>
        /
        <span
          className={ pagination === 10 ? "Pagination__Btn Pagination__Btn--Active" : "Pagination__Btn" }
          role="button"
          onClick={() => dispatch(setPagination(10))}
        >10</span>
        /
        <span
          className={ pagination === 20 ? "Pagination__Btn Pagination__Btn--Active" : "Pagination__Btn" }
          role="button"
          onClick={() => dispatch(setPagination(20))}
        >20</span>
      </div>
    </div>
  )
}

export default Pagination