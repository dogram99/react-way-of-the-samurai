import React from 'react';
import styles from './ProfileInfo.module.scss';
import CopyToClipboard from "../../CopyToClipboard";
import Spinner from "../../Spinner/Spinner";

type ProfileInfo = {
    profile: any,
    isLoading: boolean,
    history: any
}

const ProfileInfo: React.FC<ProfileInfo> = ({profile, isLoading, history}) => {

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div className={styles.descriptionBlock}>
            <button onClick={() => history.goBack()} className="btn btn--green mb-3">Go Back</button>
            <div className="d-flex align-items-center">
                <img className={styles.avatar} src={profile?.photos?.large} alt=""/>
                <span className={styles.title}>{profile?.aboutMe}</span>
            </div>
            <CopyToClipboard>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, aperiam architecto commodi corporis
                dolor dolorum ducimus eaque eos, fuga laudantium nostrum perspiciatis quas quasi, ratione reiciendis
                sequi sunt tempore totam?
            </CopyToClipboard>
        </div>
    );
}

export default ProfileInfo;