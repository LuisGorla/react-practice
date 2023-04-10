import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import styles from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const [buttonIsAnimated, setButtonAnimation] = useState(false)
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0)

  //handles animation shown by timeout
  const btnClasses = `${styles.button} ${buttonIsAnimated ? styles.bump : ''}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    setButtonAnimation(true)

    //remove style after animation finished
    const timer = setTimeout(() => {
      setButtonAnimation(false)
    }, 100)

    //cleanup function
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
