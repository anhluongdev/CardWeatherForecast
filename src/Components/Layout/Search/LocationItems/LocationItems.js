import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './LocationItems.module.scss';

const cx = classNames.bind(styles);
function LocationItems({ data, onClick, children }) {
    return (
        <Link className={cx('result-item')} to={`/@${data.LocalizedName}`} onClick={onClick}>
            {children}
        </Link>
    );
}

export default LocationItems;
