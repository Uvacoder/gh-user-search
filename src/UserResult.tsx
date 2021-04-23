import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { IUser } from './Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        minHeight: '80px',
        padding: '16px',
        margin: '16px',
    },
    avatars: {
        width: '80px',
        height: '80px',
        float: 'left',
        marginRight: '14px',
    },
});

interface IUserResultProps {
    users: IUser[];
}

export const UserResult: React.FC<IUserResultProps> = ({
    users
}: IUserResultProps) => {

    const classes = useStyles();

    return (
        <div>
            {users.map((user: IUser) => (
                <Paper
                 className={classes.root}
                 elevation={2}
                >
                    <Avatar
                     className={classes.avatars}
                     alt={`${user.node.name}'s avatar`}
                     src={`${user.node.avatarUrl}`}
                    />
                    <Typography
                     variant="h6"
                     display="inline"
                    >
                        {user.node.name}
                    </Typography>
                    <Typography
                     variant="subtitle1"
                    >
                        {user.node.login}
                    </Typography>
                    <Typography
                     variant="subtitle2"
                    >
                        {user.node.bio}
                    </Typography>
                </Paper>
            ))}
        </div>
    );
}