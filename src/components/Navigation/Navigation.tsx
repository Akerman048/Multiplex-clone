import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuUserRound } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

import logo from "../../assets/logo.svg";
import screenx from "../../assets/screenx.png";
import s from "./Navigation.module.css";

export const Navigation = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div className={s.navigation}>
      <RxHamburgerMenu className={s.menuBtn} onClick={() => setMenuToggle(prev => !prev)}/>

      <Link className={s.logolink} to='/'>
        <img src={logo} alt='Logo' />
      </Link>

      <Link className={s.lklink} to='login'>
        Sign In
        <LuUserRound className={s.lklinkimg} />
      </Link>
      <Link className={s.screenx} to='/'>
        <img src={screenx} alt='Logo' />
      </Link>

      {menuToggle && (
        <div className={s.overlay} onClick={()=> setMenuToggle(false)}></div>
      )}

      <div className={`${s.burgerMenuWrap} ${menuToggle ? s.burgerMenuOpen : ""}`}>
        <IoCloseCircle className={s.closeIcon} onClick={() => setMenuToggle(prev => !prev)}/>
        <div className={s.burgerMenuContent}>
          <img src={logo} />
          <ul className={s.burgerMenuList}>
            <li className={s.activeLink}>
              <Link to='/'>Now in cinemas</Link>
            </li>
            <li>
              <Link to='/'>Coming soon</Link>
            </li>
            <li className={s.accent}>
              <Link to='/'>Buy popcorn online</Link>
            </li>
            <li>
              <Link to='/'>Promotions and discounts</Link>
            </li>
            <li>
              <Link to='/'>Cinemas</Link>
            </li>
            <li>
              <Link to='/'>Ticket refund</Link>
            </li>
            <li>
              <Link to='/'>Help</Link>
            </li>
            <li>
              <Link to='/'>About the company</Link>
            </li>
          </ul>
          <div className={s.burgerSignInWrap}>
            <span>Personal area</span>
            <Link className={s.burgerSignLink} to='/login'>
              <LuUserRound className={s.burgerSignLinkIcon} /> Sign in
            </Link>
          </div>
          <div className={s.burgerMenuSocialsWrap}>
            <span>Our social</span>
            <ul className={s.burgerMenuSocialsList}>
              <li className={s.burgerMenuSocialsLinkWrap}>
                <a
                  className={s.burgerMenuSocialsLink}
                  href='https://www.facebook.com/'
                >
                  <FaFacebookF className={s.burgerSocialIcon} /> Facebook
                </a>
              </li>
              <li className={s.burgerMenuSocialsLinkWrap}>
                <a
                  className={s.burgerMenuSocialsLink}
                  href='https://www.youtube.com/'
                >
                  <FaYoutube className={s.burgerSocialIcon} /> Youtube
                </a>
              </li>
              <li className={s.burgerMenuSocialsLinkWrap}>
                <a
                  className={s.burgerMenuSocialsLink}
                  href='https://www.instagram.com/'
                >
                  <AiFillInstagram className={s.burgerSocialIcon} /> Instagram
                </a>
              </li>
              <li className={s.burgerMenuSocialsLinkWrap}>
                <a
                  className={s.burgerMenuSocialsLink}
                  href='https://telegram.org/'
                >
                  <FaTelegramPlane className={s.burgerSocialIcon} /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
