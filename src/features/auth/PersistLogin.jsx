import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'

import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { selectCurrentToken } from "./authSlice"

const PersistLogin = () => {

  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== "development") { //For React strict mode
      const verifyRefreshToken = async () => {
        try {
          await refresh()
          setTrueSuccess(true)
        } catch (error) {
          console.error(error)
        }
      }
      if (!token && persist) verifyRefreshToken()
    }
    return () => effectRan.current = true
  }, [])

  let content
  if (!persist) {
    content = <Outlet />
  } else if (isLoading) { //persist: yes, token: no
    content = <PulseLoader color={"#FFF"} />
  } else if (isError) { //persist: yes, token: no
    console.log("error")
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>
      </p>
    )
  } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
    content = <Outlet />
  } else if (token && isUninitialized) { //persist: yes, token: yes
    content = <Outlet />
  }

  return content
}
export default PersistLogin