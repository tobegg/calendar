import { IUser } from '@/models/IUser';
import React, { FC } from 'react';

interface UserItemProps {
  user: IUser;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <div>
      {user.id}: {user.name} - {user.email}
    </div>
  );
};

export default UserItem;
