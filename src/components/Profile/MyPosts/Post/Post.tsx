import React, {createElement, useState, memo} from 'react';
import {Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from '@ant-design/icons';
// import styles from './Post.module.scss';
import {IPost} from "../../../../interfaces";
import {NavLink} from "react-router-dom";


const Post: React.FC<IPost> = props => {
    const {message, likesCount} = props;

    let [likes, setLikes] = useState(likesCount);
    let [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<any>(null);

    const like = () => {
        setLikes(++likes);
        setDislikes(dislikes);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(likes);
        setDislikes(++dislikes);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'like d' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
        <Comment
            actions={actions}
            author={<NavLink to="/">Han Solo</NavLink>}
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
            }
            content={
                <p>
                    {message}
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    );
}

export default memo(Post);