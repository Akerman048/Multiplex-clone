import Inputmask from "inputmask";
import { useEffect, useRef } from "react";
import s from "./Login.module.css";
import loginPromo from "../../assets/images/lk_login_img_new.png";
import logo from "../../assets/logo.svg";

import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

import { Link } from "react-router-dom";

export const Login = () => {
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!phoneInputRef.current) return;

    const im = new Inputmask("(99) 999 9999");
    im.mask(phoneInputRef.current);

    // при розмонтуванні знімаємо маску (good practice)
    return () => {
      im.remove();
    };
  }, []);

  return (
    <div className={s.loginWrap}>
      <div className={s.loginFormLeft}>
        <img src={logo} />
        <h3>Login to your account</h3>
        <p>Here are all your orders and personal information</p>
        <div className={s.loginFormWrap}>
          <p className={s.loginInputLabel}>Mobile number</p>
          <div className={s.loginWrapInputSubmit}>
            <label className={s.loginLabel}>
              <p className={s.loginPhonePrefix}>+380</p>
              <input
                ref={phoneInputRef}
                type='tel'
                autoComplete='off'
                placeholder='(00) XXX XXXX'
                className={`${s.loginInput} ${s.loginPhoneInput}`}
              />
            </label>
            <button className={s.loginPhoneSubmit}>Continue</button>
          </div>
        </div>

        <div className={s.loginWithSocialWrap}>
          <div className={s.loginWrapSocialTitle}>
            <div className={s.stripe}></div>
            <span className={s.socialTitle}>or enter with</span>
          </div>
          <div className={s.socialLinks}>
            <Link to='/'>
              <FaFacebookF />
            </Link>
            <Link to='/'>
              <FaGoogle />
            </Link>
            <Link to='/'>
              <FaApple />
            </Link>
          </div>
        </div>

        <div className={s.lankBackWrap}>
          <span>Return to the site </span>
          <Link to='/' className={s.linkBack}>
            Multiplex
          </Link>{" "}
        </div>
      </div>
      <div className={s.loginRight}>
        <img src={loginPromo} />
        <h3>No need to download or print!</h3>
        <p>
          The tickets are already in your account - just log in now and show the
          QR code when entering the cinema.
        </p>
      </div>
    </div>
  );
};
