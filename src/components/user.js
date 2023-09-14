import React, { useEffect } from 'react'

export default ({ userName } = {}) =>{
  useEffect(() => {
    console.log('client render')
  }, [])

  const clickFn = async () => {
    const response = await fetch("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          value: "test"
        }
      })
    })
    console.log(await response.json())
  }
  
  return (
    <html>
      <body>
        <div>hello, {userName}</div>
        <button onClick={clickFn}>button</button>
      </body>
    </html>
  )
}

