import { useEffect } from "react";
import "./Drawer.css";

const Drawer = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  return (
    <div
      id='menu-drawer'
      className={`gradient menu-drawer motion-reduce color-inverse ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className='menu-drawer__inner-container'>
        <div className='menu-drawer__navigation-container'>
          <nav className='menu-drawer__navigation'>
            <ul className='menu-drawer__menu has-submenu list-menu' role='list'>
              <li
                style={{
                  padding: "1rem",
                  background: " #6c757d14",
                  borderRadius: "20px",
                }}
              >
                <a
                  id='HeaderDrawer-home'
                  href='/juegos'
                  className='menu-drawer__menu-item list-menu__item link link--text focus-inset menu-drawer__menu-item--active'
                  aria-current='page'
                >
                  Juegos
                </a>
              </li>
              <br />
              <li
                style={{
                  padding: "1rem",
                  background: " #6c757d14",
                  borderRadius: "20px",
                }}
              >
                <a
                  id='HeaderDrawer-catalog'
                  href='/juguetes'
                  className='menu-drawer__menu-item list-menu__item link link--text focus-inset'
                >
                  Juguetes
                </a>
              </li>{" "}
              <br />
              <li
                style={{
                  padding: "1rem",
                  background: " #6c757d14",
                  borderRadius: "20px",
                }}
              >
                <a
                  id='HeaderDrawer-contact'
                  href='/novedades'
                  className='menu-drawer__menu-item list-menu__item link link--text focus-inset'
                >
                  Novedades
                </a>
              </li>
            </ul>
          </nav>
          <div className='menu-drawer__utility-links'>
            <div className='menu-drawer__localization header-localization'></div>
            <ul className='list list-social list-unstyled' role='list'>
              <li className='list-social__item'>
                <a
                  href='https://www.instagram.com/el.reino.de.los.juguetes/'
                  className='link list-social-link'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 25 25'
                    width='50'
                    height='50'
                  >
                    <path
                      fill='currentColor'
                      fillRule='evenodd'
                      d='M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.43 2.43 0 0 0-.912.593 2.486 2.486 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23 0 2.134.01 2.39.046 3.229.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046 2.134 0 2.39-.01 3.23-.046.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23 0-2.134-.01-2.39-.055-3.229-.027-.784-.164-1.204-.274-1.495a2.43 2.43 0 0 0-.593-.913 2.604 2.604 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273ZM6.697 2.05c.857-.036 1.131-.045 3.302-.045 1.1-.014 2.202.001 3.302.045.664.014 1.321.14 1.943.374a3.968 3.968 0 0 1 1.414.922c.41.397.728.88.93 1.414.23.622.354 1.279.365 1.942C18 7.56 18 7.824 18 10.005c0 2.17-.01 2.444-.046 3.292-.036.858-.173 1.442-.374 1.943-.2.53-.474.976-.92 1.423a3.896 3.896 0 0 1-1.415.922c-.51.191-1.095.337-1.943.374-.857.036-1.122.045-3.302.045-2.171 0-2.445-.009-3.302-.055-.849-.027-1.432-.164-1.943-.364a4.152 4.152 0 0 1-1.414-.922 4.128 4.128 0 0 1-.93-1.423c-.183-.51-.329-1.085-.365-1.943C2.009 12.45 2 12.167 2 10.004c0-2.161 0-2.435.055-3.302.027-.848.164-1.432.365-1.942a4.44 4.44 0 0 1 .92-1.414 4.18 4.18 0 0 1 1.415-.93c.51-.183 1.094-.33 1.943-.366Zm.427 4.806a4.105 4.105 0 1 1 5.805 5.805 4.105 4.105 0 0 1-5.805-5.805Zm1.882 5.371a2.668 2.668 0 1 0 2.042-4.93 2.668 2.668 0 0 0-2.042 4.93Zm5.922-5.942a.958.958 0 1 1-1.355-1.355.958.958 0 0 1 1.355 1.355Z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </a>
              </li>
              <li className='list-social__item'>
                <a href='https://wa.me/3755295478' className='link list-social-link'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 25 25'
                    width='45'
                    height='45'
                  >
                    <path
                      fill='currentColor'
                      d='M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9'
                    ></path>
                  </svg>
                  <span className='visually-hidden'>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Drawer;
