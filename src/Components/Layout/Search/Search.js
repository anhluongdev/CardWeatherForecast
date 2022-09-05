import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as searchService from '~/APIServices/searchServices';
import styles from './Search.module.scss';
import { SearchIcon } from '~/Icons';
import { useDebounce } from '~/Hooks';
import { LocationItems } from './LocationItems';

const cx = classNames.bind(styles);

function Search({ keyPassFunc }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.searchLocation(debounced);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleClickOnResult = (result) => {
        setSearchValue(`${result.LocalizedName}, ${result.Country.LocalizedName}`);
        setSearchResult([]);
        setShowResult(false);
        keyPassFunc({
            key: result.Key,
            cityName: result.LocalizedName,
            isShowInfo: true,
        });
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                placement="bottom"
                offset={[0, 10]}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <h4 className={cx('search-title')}>Locations found</h4>
                        <div className={cx('search-wrapper')}>
                            {searchResult.length > 0 ? (
                                searchResult.map((result) => (
                                    <LocationItems
                                        key={result.Key}
                                        data={result}
                                        onClick={() => {
                                            handleClickOnResult(result);
                                        }}
                                    >
                                        {result.LocalizedName}, {result.Country.LocalizedName}
                                    </LocationItems>
                                ))
                            ) : (
                                <div>Not Found</div>
                            )}
                        </div>
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        className={cx('inputSearch')}
                        type="text"
                        placeholder="Search location..."
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
