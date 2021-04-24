import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import {
    IUser,
    useResultsContext
} from '../context/ResultsContext';
import Typography from '@material-ui/core/Typography';
import {
    Collapse,
    Link,
    makeStyles,
} from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Emoji } from 'emoji-mart';
import Grow from '@material-ui/core/Grow';


const useStyles = makeStyles({
    root: {
        minHeight: '142px',
        padding: '16px',
        marginTop: '16px',
        marginBottom: '16px',
    },
    avatar: {
        width: '110px',
        height: '110px',
        float: 'left',
        marginRight: '14px',
        verticalAlign: 'middle'
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 6,
        lineHeight: 1.6,
        verticalAlign: 'baseline',
    },
    icon: {
        marginBottom: '-4px',
        height: '20px',
    },
    inlineText: {
        paddingLeft: '4px',
    },
});

export const UserResults: React.FC = () => {

    const { results } = useResultsContext()!;
    const classes = useStyles();

    return (
        <div>
            {results && results.users.map((user: IUser) => (
                <Grow in={true} timeout={400}>
                    <Paper
                     className={classes.root}
                     elevation={3}
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
                        {user.node.status && user.node.status.emoji && (
                            <span className={classes.inlineText}>
                                <Emoji emoji={user.node.status.emoji} size={24} />
                                <Typography
                                 className={classes.inlineText}
                                 variant="caption"
                                 display="inline"
                                >
                                    {user.node.status.message}
                                </Typography>
                            </span>
                        )}
                        <div>
                            <Link
                             className={classes.text}
                             display="inline"
                             color="secondary"
                             variant="button"
                             href={user.node.url}
                            >
                                {user.node.login}
                            </Link>
                            <Typography
                             className={classes.inlineText}
                             variant="body1"
                             display="inline"
                            >
                                <StarOutlineIcon className={classes.icon} />
                                {user.node.starredRepositories.totalCount}
                            </Typography>
                            <Typography
                             className={classes.inlineText}
                             display="inline"
                             variant="h6"
                            >
                                ∙
                            </Typography>
                            <Typography
                             className={classes.inlineText}
                             variant="body1"
                             display="inline"
                            >
                                <PeopleOutlineIcon className={classes.icon} />
                                {user.node.followers.totalCount} followers
                            </Typography>
                            <Typography
                             className={classes.inlineText}
                             display="inline"
                             variant="h6"
                            >
                                ∙
                            </Typography>
                            <Typography
                             className={classes.inlineText}
                             variant="body1"
                             display="inline"
                            >
                                {user.node.following.totalCount} following
                            </Typography>
                        </div>
                        {user.node.bio && (
                            <Typography
                             variant="body1"
                            >
                                {user.node.bio}
                            </Typography>
                        )}
                        <Collapse>
                        </Collapse>
                    </Paper>
                </Grow>
            ))}
        </div>
    );
};