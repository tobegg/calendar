import { IUser } from '@/models/IUser';
import { userAPI } from '@/services/UserService';
import React, { FC } from 'react';
import UserItem from './UserItem';

const UsersContainer: FC = () => {
  const { data: users, error, isLoading } = userAPI.useFetchAllUsersQuery(5);
  const [createUser, {}] = userAPI.useCreateUserMutation();

  const handleCreate = async () => {
    const newUser: IUser = { id: 142, name: 'Name', email: 'email' };
    await createUser(newUser);
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && (<p>Error</p>)}
      <button onClick={handleCreate}>Add User</button>
      {users?.map(user => {
        return <UserItem key={user.id} user={user} />
      })}
    </div>
  );
};

export default UsersContainer;