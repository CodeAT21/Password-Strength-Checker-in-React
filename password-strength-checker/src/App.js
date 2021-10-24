import React,{useState} from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const App = () => {
  const [userInfo, setuserInfo] = useState({
    password: '',
  });

  const [isError, setError] = useState(null);
  const handleChangePassword = (e) => {
    let password  = e.target.value;
    setuserInfo({
      ...userInfo,
      password:e.target.value
    });
    setError(null);
    let capsCount, smallCount, numberCount, symbolCount
    if (password.length < 4) {
      setError("Password must be minimum 4 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &");
      return;
    }
    else {
      capsCount = (password.match(/[A-Z]/g) || []).length
      smallCount = (password.match(/[a-z]/g) || []).length
      numberCount = (password.match(/[0-9]/g) || []).length
      symbolCount = (password.match(/\W/g) || []).length
      if (capsCount < 1) {
        setError("Must contain one UPPERCASE letter");
        return;
      }
      else if (smallCount < 1) {
        setError("Must contain one lowercase letter");
        return;
      }
      else if (numberCount < 1) {
        setError("Must contain one number");
        return;
      }
      else if (symbolCount < 1) {
        setError("Must contain one special character: @$! % * ? &");
        return;
      }
    }
  }
  
  const [isStrength, setStrength] = useState(null);
  const dataHandler = async (childData) => {
    setStrength(childData);
  }

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      console.log(userInfo.password);
    } catch (error) { throw error;} 
  };

  return (
    <div className="App">
      <h1>Password Strength Checker in React</h1>
      <div className="wrapper">
        <form onSubmit={onSubmit} className="login__Form">
          <label htmlFor="password">
            Password 
            {isError !== null && (
              <p className="errors"> - {isError}</p>
            )}
          </label>
          <input type="password" id="password" name="password" onChange={handleChangePassword} required />
          <PasswordStrengthMeter password={userInfo.password} actions={dataHandler}/>
          {isStrength === 'Strong' && 
            <button type="submit" className="gr__log__button"  > Create Account  </button>
          }
        </form>
      </div>
    </div>
  )
}
export default App
