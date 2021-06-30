import React, {useState} from 'react'
import {Alert} from "antd";
import {ApiTwoTone, EditTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import styles from './ProfileInfo.module.scss';
import ProfileStatus from "./ProfileStatus";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";
import {ProfileInfoPropsType} from "../../../types/PropsTypes";

const ProfileInfo: React.FC<ProfileInfoPropsType> = props => {
    const {profile, saveProfile, errorText} = props;
    const [editMode, setEditMode] = useState(false);
    const {ErrorBoundary} = Alert;

    const onSubmit = () => {
        saveProfile().then(() => {
            setEditMode(false);
        }).catch((e: string) => console.log(e))
    }

    return (
        <div className={`${styles.wrapper} default-box`}>
            <ErrorBoundary>
                <div className={styles.profileHead}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className={styles.profileName}>{profile.fullName}</h1>
                        <div className={styles.online}>online <span className="ml-1"><ApiTwoTone/></span></div>
                    </div>
                    <ProfileStatus/>
                    <span className={styles.status}/>
                </div>
                <div className="d-flex justify-content-end mt-3 mb-2">
                    {editMode
                        ? <CloseCircleTwoTone onClick={() => setEditMode(!editMode)}/>
                        : <EditTwoTone onClick={() => setEditMode(!editMode)}/>
                    }
                </div>
                {!editMode
                    ? <ProfileData/>
                    : <ProfileDataForm profile={profile} onSubmit={onSubmit} errorText={errorText}/>
                }
            </ErrorBoundary>
        </div>
    );
}

export default ProfileInfo;