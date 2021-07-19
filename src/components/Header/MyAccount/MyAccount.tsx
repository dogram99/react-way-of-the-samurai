import React, {PropsWithChildren} from 'react';
import {Avatar, Dropdown, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import styles from "./MyAccount.module.scss";
import SubMenu from "./SubMenu";
import {ProfileType} from "../../../types";

type MyAccountPropsType = {
    ownerProfile: PropsWithChildren<ProfileType>,
    logOut: () => void
}

const MyAccount: React.FC<MyAccountPropsType> = props => {
    const {logOut, ownerProfile} = props;

    return (
        <div className={`${styles.wrapper} no-border`}>
            <Dropdown overlay={<SubMenu logOut={logOut}/>}>
                <Button style={{height: 40}}>
                    <div className={styles.inner}>
                        <span className={`${styles.login} mr-2`}>{ownerProfile.fullName}</span>
                        <Avatar src={ownerProfile.photos?.large} icon={<UserOutlined/>}/>
                    </div>
                </Button>
            </Dropdown>
        </div>
    );
}

export default MyAccount;
