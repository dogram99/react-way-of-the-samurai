import React, { FC, memo, useEffect } from 'react';

import { Messages } from './Messages/Messages';
import { useActions } from '../../store';
import styles from './Chat.module.scss';

export const Chat: FC = memo(() => {
  const { startMessagesListening, stopMessagesListening } = useActions();

  useEffect(() => {
    startMessagesListening();
    return () => {
      stopMessagesListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={`${styles.wrapper} default-box`}>
      <Messages />
    </section>
  );
});
