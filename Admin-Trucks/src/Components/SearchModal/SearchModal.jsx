import { useEffect } from "react";
import "./SearchModal.css";
import { FaTimes, FaSearch } from "react-icons/fa";

const SearchModal = ({ isVisible, onClose }) => {
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
      className={`search-modal modal__content gradient ${isVisible ? "visible" : ""}`}
      role='dialog'
      aria-modal='true'
      aria-label='Search'
    >
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='search-modal__content search-modal__content-bottom' tabIndex='-1'>
        <div className='search-modal__form' data-loading-text='Loading...'>
          <form
            action='/search'
            method='get'
            role='search'
            className='search search-modal__form'
          >
            <div className='field'>
              <input
                className='search__input field__input'
                id='Search-In-Modal'
                type='search'
                name='q'
                placeholder='Search'
                role='combobox'
                aria-expanded='false'
                aria-owns='predictive-search-results'
                aria-controls='predictive-search-results'
                aria-haspopup='listbox'
                aria-autocomplete='list'
                autoCorrect='off'
                autoComplete='off'
                autoCapitalize='off'
                spellCheck='false'
                aria-activedescendant=''
              />
              <label className='field__label' htmlFor='Search-In-Modal'>
                Search
              </label>
              <input type='hidden' name='options[prefix]' value='last' />
              <button
                type='reset'
                className='reset__button field__button hidden'
                aria-label='Clear search term'
              >
                <svg
                  className='icon icon-close'
                  aria-hidden='true'
                  focusable='false'
                ></svg>
              </button>
              <button className='search__button field__button' aria-label='Search'>
                <FaSearch style={{ fontWeight: "100" }} />
              </button>
            </div>
            <div
              className='predictive-search predictive-search--header'
              tabIndex='-1'
              data-predictive-search=''
            >
              <div className='predictive-search__loading-state'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  className='spinner'
                  viewBox='0 0 66 66'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    className='path'
                    fill='none'
                    strokeWidth='6'
                    cx='33'
                    cy='33'
                    r='30'
                  ></circle>
                </svg>
              </div>
            </div>
            <span
              className='predictive-search-status visually-hidden'
              role='status'
              aria-hidden='true'
            ></span>
          </form>
        </div>
        <button
          type='button'
          className='search-modal__close-button modal__close-button link link--text focus-inset'
          aria-label='Close'
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
