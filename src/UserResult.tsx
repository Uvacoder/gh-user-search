import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { IUser } from './ResultsContext';
import Typography from '@material-ui/core/Typography';
import { Link, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        minHeight: '80px',
        padding: '16px',
        marginTop: '16px',
        marginBottom: '16px',
    },
    avatar: {
        width: '80px',
        height: '80px',
        float: 'left',
        marginRight: '14px',
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 6,
        lineHeight: 1,
    },
});

interface IUserResultProps {
    users: IUser[];
};

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
                 key={user.node.id}
                >
                    <Avatar
                     className={classes.avatar}
                     alt={`${user.node.login}'s avatar`}
                     src={`${user.node.avatarUrl}`}
                    />
                    {user.node.name && (
                        <Typography
                         variant="h5"
                         display="inline"
                        >
                            {user.node.name}
                        </Typography>
                    )}
                    <Link
                     className={classes.text}
                     display="block"
                     color="secondary"
                     variant="button"
                     href={user.node.url}
                    >
                        {user.node.login}
                    </Link>
                    {user.node.bio && (
                        <Typography
                         variant="body1"
                        >
                            {user.node.bio}
                        </Typography>
                    )}
                </Paper>
            ))}
        </div>
    );
};