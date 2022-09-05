import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import styles from './Logo.module.scss';

const cx = classNames.bind(styles);

function Logo() {
    return (
        <Link to="/">
            <img className={cx('logo')} src={images.logo} alt="" />
        </Link>
    );
}

export default Logo;
