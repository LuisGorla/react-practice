import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import AuthContext from '../../store/auth-context'
import Input from '../UI/Input/Input'

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [enteredPassword, setEnteredPassword] = useState('')
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const authCtx = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [formIsValid, setFormIsValid] = useState(false)

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  })

  const [passState, dispatchPass] = useReducer(passReducer, {
    value: '',
    isValid: null,
  })

  //obj destructuring right side of : is alias
  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passState

  useEffect(() => {
    console.log('1st EFFECT runing')

    return () => {
      console.log('1st EFFECT clean up')
    }
  }, [])

  useEffect(() => {
    //debounce
    const identifier = setTimeout(() => {
      console.log('request triggered')
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 600)

    //cleanup
    return () => {
      console.log('Clean up')
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
    // setFormIsValid(
    //   event.target.value.includes('@') && passState.isValid
    // )
  }

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: 'USER_INPUT', val: event.target.value })
    setFormIsValid(
      event.target.value.includes('@') && event.target.value.trim().length > 6,
    )
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid)
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6)
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passState.value)
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
