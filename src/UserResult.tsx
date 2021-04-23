import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { IUser } from './Search';


interface IUserResultProps {
    users: IUser[];
}

export const UserResult: React.FC<IUserResultProps> = ({
    users
}: IUserResultProps) => {

    return (
        <div>
            {users.map((user: IUser) => (
                <Paper elevation={2}>
                    <Avatar
                    alt={`${user.node.name}` + 'avatar'}
                    src={`${user.node.avatarUrl}`}
                    />
                </Paper>
            ))}
        </div>
    );
}