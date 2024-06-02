import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { increment } from "../redux/counter/counterSlice"
import { incrementByAmount } from "../redux/counter/counterSlice"
import { decrement } from "../redux/counter/counterSlice"

function Counter() {
  const [amount, setAmount] = useState(3)
  const countValue = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>
        {countValue}
      </h1>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <br /><br />
      <input type="number" value={amount}  onChange={(event) => setAmount(event.target.value)}/>
      <button onClick={() => dispatch(incrementByAmount(amount))}>Increment By Amount</button>

    </div>
  )
}

export default Counter