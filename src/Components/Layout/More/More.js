import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { InboxIcon, MessageIcon } from '~/Icons';
import styles from './More.module.scss';

const cx = classNames.bind(styles);
function More() {
    return (
        <div className={cx('more-options')}>
            <Link className={cx('signup-btn')} to="/signup">
                Sign up
            </Link>
            <Link className={cx('login-btn')} to="/login">
                Log in
            </Link>
        </div>
    );
}

export default More;
