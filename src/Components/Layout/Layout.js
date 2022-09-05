import classNames from 'classnames/bind';

import styles from './Layout.module.scss';
import { Logo } from './Logo';
import { Search } from './Search';
import { More } from './More';
import { Sidebar } from '~/Components/Sidebar';
import { useState } from 'react';
import Info from '~/Pages/Info';

const cx = classNames.bind(styles);
function Layout() {
    const [keyReceive, setKeyReceive] = useState({});

    const passKey = (key) => {
        setKeyReceive(key);
    };
    console.log(keyReceive);
    return (
        <div className={cx('wrapper')}>
            <header className={cx('wrapperHeader')}>
                <Logo />
                <Search keyPassFunc={passKey} />
                <More />
            </header>
            <div className={cx('container')}>
                <Sidebar />
                {keyReceive.isShowInfo && <Info data={keyReceive} />}
            </div>
        </div>
    );
}

export default Layout;
