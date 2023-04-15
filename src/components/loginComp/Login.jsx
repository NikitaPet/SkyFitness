/* eslint-disable react/jsx-pascal-case */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  usePostSignInWithPasswordQuery,
  usePostSignUpQuery,
} from '../../pages/services/queryApi';
import { Button } from '../commonComponents/button/button';
//  import { ContextTheme } from '../Others/Context';
import * as S from './LoginStyles';
//  import * as GS from '../../GlobalStyle';
import Logo from '../logo/Logo';
import {
  loginDataErrorMSGSelector,
  signUpSelector,
  logInSelector,
  loginDataSelector,
} from '../../store/selectors/selectors';
import { FetchLoginSuccess, FetchSignUpPassNotEqual } from '../../store/actions/creators/creators';
/* import {
  loginDataSelector,
  loginDataLoadingSelector,
  loginDataErrorSelector,
  loginDataErrorMSGSelector,
  AccessTokenSelector,
  RefreshTokenSelector,
  GetIdTokenRefIntSelector,
} from '../../store/selectors/selectors';
import {
  fetchLogin,
  fetchSignUp,
  fetchGetToken,
  fetchRefreshToken,
} from '../../store/actions/thunks/thunks'; */

const InputFields = [
  {
    name: 'login',
    placeholder: 'Логин(email)',
    key: '1',
    type: 'email',
  },
  {
    name: 'Password',
    placeholder: 'Пароль',
    key: '2',
    type: 'password',
  },
  {
    name: 'ReturnPassword',
    placeholder: 'Повторите пароль',
    key: '3',
    type: 'password',
  },
  /*   {
    name: "userName",
    placeholder: "Имя пользователя",
    key: "4",
    type: "text",
  }, */
];
function Login() {
  // const { theme, setTheme } = useContext(ContextTheme);

  return (
    <S.CenterBlock>
      <S.LoginMainBlock>
        <S.groupLogoImg>
          <Logo />
        </S.groupLogoImg>
        <LoginBlock />
      </S.LoginMainBlock>
    </S.CenterBlock>
  );
}

export default Login;
export function LoginBlock() {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let errorMessage = useSelector(loginDataErrorMSGSelector);
  const signUpData = useSelector(signUpSelector);

  /*  
  const isLoading = useSelector(loginDataLoadingSelector);
  const error = useSelector(loginDataErrorSelector);

  const AccessToken = useSelector(AccessTokenSelector);
  const RefreshToken = useSelector(RefreshTokenSelector);
  const idRefreshTokenInterval = useSelector(GetIdTokenRefIntSelector); */
  const isLoading = false;
  const [userName, setUserName] = useState('');
  const [loginMail, setLoginMail] = useState('');
  const [password, setPassword] = useState('');
  const [skipSignUp, setSkipSignUp] = useState(true);
  const [skipLogIn, setSkipLogIn] = useState(true);
  const [repeatPassword, setRepeatPassword] = useState('');

  const loginStates = {
    states: {
      userName,
      loginMail,
      password,
      repeatPassword,
    },
    funcStates: {
      setUserName,
      setLoginMail,
      setPassword,
      setRepeatPassword,
      setSkipSignUp,
      setSkipLogIn,
    },
  };
  const {
    data: dataSignUp,
    error: errorSignUp,
    isLoading: isLoadingSignUp,
  } = usePostSignUpQuery(
    {
      email: loginMail,
      password,
    },
    { skip: skipSignUp }
  );
  const {
    data: dataLogIn,
    error: errorLogIn,
    isLoading: isLoadingLogIn,
  } = usePostSignInWithPasswordQuery(
    {
      email: loginMail,
      password,
    },
    { skip: skipLogIn }
  );

  if (errorSignUp) {
    errorMessage = { signUpError: errorSignUp.data.error.message };
  }
  const logInData = useSelector(loginDataSelector);
  console.log(logInData);
  /*   useEffect(() => {
    if (idRefreshTokenInterval) {
      clearInterval(idRefreshTokenInterval);
    }
  }, []);
  
  useEffect(() => {
    const getToken = loginData?.id > 0;
    if (getToken && AccessToken === null) {
      const TokenAccessDataObj = {
        email: loginStates.states.loginMail,
        password: loginStates.states.password,
      };
      dispatch(fetchGetToken(TokenAccessDataObj));
    } else if (AccessToken !== null && RefreshToken !== null) {
      const id = setInterval(() => {
        dispatch(fetchRefreshToken());
      }, 40000);
      localStorage.setItem(
        "MySpotyfyLoginData",
        JSON.stringify({
          id: loginData.id,
          username: loginData.username,
          refreshToken: RefreshToken,
          accessToken: AccessToken,
          idRefTokenInt: id,
        })
      );
      dispatch(FetchRefreshTokenInterval(id));
      dispatch(FetchUserLogIn(true));
      navigate("/");
    }
  }, [loginData, AccessToken]); */

  useEffect(() => {
    if (dataLogIn) {
      dispatch(FetchLoginSuccess(dataLogIn));
    } else if (dataSignUp) {
      dispatch(FetchLoginSuccess(dataSignUp));
    }

    //  navigate("/");
  }, [dataLogIn, dataSignUp]);
  return (
    <S.LoginInputsBlock>
      <LoginMenu
        isLoading={isLoading}
        list={InputFields}
        count={signUp ? 4 : 2}
        loginStates={loginStates}
      />
      {Object.keys(errorMessage).length > 0 && (
        <S.ErrorArea>
          <ShowErrors errorMessage={errorMessage} />
        </S.ErrorArea>
      )}
      {!signUp && (
        <ButtonLogIn
          isLoading={isLoading}
          loginStates={loginStates.states}
          loginFunc={loginStates.funcStates}
          dispatch={dispatch}
        />
      )}
      <ButtonGetSignUp
        signUp={signUp}
        setSignUp={setSignUp}
        dispatch={dispatch}
        loginStates={loginStates.states}
        loginFunc={loginStates.funcStates}
      />
    </S.LoginInputsBlock>
  );
}
function ShowErrors({ errorMessage }) {
  let keys = Object.keys(errorMessage);
  keys = keys.map((errorMessageKey, key) => (
    // eslint-disable-next-line react/no-array-index-key
    <S.ErrorSpan key={key}>{errorMessage[errorMessageKey]}</S.ErrorSpan>
  ));
  return keys;
}
const LoginMenu = ({ list, count, loginStates, isLoading }) => {
  const { states } = loginStates;
  const { funcStates } = loginStates;

  const content = [];
  function ChangeInput(e) {
    const { target } = e;
    switch (target.name) {
      case 'userName':
        funcStates.setUserName(target.value);
        break;
      case 'login':
        funcStates.setLoginMail(target.value);
        break;
      case 'Password':
        funcStates.setPassword(target.value);
        break;
      case 'ReturnPassword':
        funcStates.setRepeatPassword(target.value);
        break;
      default:
        throw new Error('Отсутствует поле в форме Login');
    }
  }
  function getValue(key) {
    switch (key) {
      case '1':
        return states.loginMail;
      case '2':
        return states.password;
      case '3':
        return states.repeatPassword;
      case '4':
        return states.userName;
      default:
        throw new Error('Отсутствует state в форме Login');
    }
  }
  list.forEach((inputElem, index) => {
    if (index < count) {
      content.push(
        <S.InputField
          type={inputElem.type}
          disabled={isLoading}
          value={getValue(inputElem.key)}
          name={inputElem.name}
          placeholder={inputElem.placeholder}
          key={inputElem.key}
          onChange={(e) => ChangeInput(e)}
        />
      );
    }
  });
  return content;
};

export function ButtonLogIn({ dispatch, loginStates, isLoading, loginFunc }) {
  // eslint-disable-next-line consistent-return

  const loginDataObj = {
    email: loginStates.loginMail,
    password: loginStates.password,
  };

  function handelClickBtnLogin() {
    loginFunc.setSkipLogIn(false);
  }

  return (
    <S.groupButtonLogIn>
      <Button.s18.blue
        width="278px"
        height="52px"
        disabled={isLoading}
        onClick={() => handelClickBtnLogin()}
      >
        Войти
      </Button.s18.blue>
    </S.groupButtonLogIn>
  );
}

function ButtonGetSignUp({
  signUp,
  setSignUp,
  dispatch,
  loginStates,
  loginFunc,
}) {
  const navigate = useNavigate();

  const CheckPassword = () => {
    const { password: pass, repeatPassword: repPass } = loginStates;
    return pass === repPass;
  };
  function HandelClickBtnSignUp() {
    const signUpDataObj = {
      username: loginStates.userName,
      email: loginStates.loginMail,
      password: loginStates.password,
    };
    if (!signUp) {
      setSignUp((prev) => !prev);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (!CheckPassword()) {
        dispatch(
          FetchSignUpPassNotEqual({ SignUpPassNotEqual: 'Пароли не совпадают' })
        );
        return;
      }
      loginFunc.setSkipSignUp(false);
    }
  }

  return (
    <S.groupButtonGetSignUp $signUp={signUp}>
      <Button.s18.white
        width="278px"
        height="52px"
        onClick={() => HandelClickBtnSignUp()}
      >
        Зарегистироваться
      </Button.s18.white>
    </S.groupButtonGetSignUp>
  );
}
