import classes from './Counter.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { counterActions } from '../store'

const Counter = () => {
  const dispatch = useDispatch()
  //subscribe to redux store
  const counter = useSelector(state => state.counter)

  const showCounter = useSelector(state => state.showCounter)

  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)) //{type: uinique_id, payload: 5}
  }

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.disableCounter())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Increase 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}

export default Counter
