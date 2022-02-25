import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const CookBookID = (props) => {
  const router = useRouter()
  const { id } = router.query

  return <div>CookBookID -- {id}</div>
}

CookBookID.propTypes = {}

export default CookBookID
