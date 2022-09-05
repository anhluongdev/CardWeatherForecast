import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './InfoItems.module.scss';
import * as getWeatherForecast from '~/APIServices/getWeatherForecast';

const cx = classNames.bind(styles);
function InfoItems({ dataForecast }) {
    const [apiWeatherForecast, setApiWeatherForecast] = useState([]);
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        if (!dataForecast.key) {
            setApiWeatherForecast([]);
            return;
        }
        const fetchApi = async () => {
            const result = await getWeatherForecast.showWeatherForecast(dataForecast.key);
            const weatherArr = result.DailyForecasts;
            setApiWeatherForecast(weatherArr);
        };
        fetchApi();
    }, [dataForecast.key]);

    const handleClick = (index) => {
        setIsFlipped((isFlipped) => !isFlipped);
    };

    const renderDays = (data) => {
        const slicingData = data.slice(0, 10);
        const reFormatData = new Date(slicingData).toString();
        const standardData = reFormatData.slice(0, 3);
        return standardData;
    };

    const renderDate = (data) => {
        const slicingData = data.slice(0, 10);
        const reFormatData = new Date(slicingData).toString();
        const standardData = reFormatData.slice(4, 15);
        return standardData;
    };
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('location-title')}>{dataForecast.cityName}</h2>
            <div className={cx('cards__wrap')}>
                {apiWeatherForecast.map((cardItem, index) => (
                    <div
                        key={index}
                        className={cx('card', { 'is-flipped': isFlipped })}
                        onClick={() => handleClick(index)}
                    >
                        <div className={cx('card__shadow')}></div>
                        <div className={cx('card__front')}>
                            <div className={cx('card__text')}>
                                <h2 className={cx('day__text')}>{renderDays(cardItem.Date)}</h2>
                                <h2 className={cx('date__text')}>{renderDate(cardItem.Date)}</h2>
                            </div>
                        </div>
                        <div className={cx('card__back')}>
                            <div className={cx('card__info')}>
                                <div className={cx('card__day')}>
                                    <h3 className={cx('status__day')}>Ngày</h3>
                                    <div className={cx('item__info')}>
                                        <div className={cx('img__info')}>
                                            <img className={cx('weather__img')} src="" alt="" />
                                        </div>
                                        <div className={cx('info__text')}>
                                            <p className={cx('info__status')}></p>
                                            <p className={cx('info__temp')}></p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('card__night')}>
                                    <h3 className={cx('status__day')}>Đêm</h3>
                                    <div className={cx('item__info')}>
                                        <div className={cx('img__info')}>
                                            <img className={cx('weather__img')} src="" alt="" />
                                        </div>
                                        <div className={cx('info__text')}>
                                            <p className={cx('info__status')}></p>
                                            <p className={cx('info__temp')}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InfoItems;
