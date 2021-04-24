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
    useMediaQuery,
    useTheme,
    Theme,
    Box
} from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Emoji } from 'emoji-mart';
import Grow from '@material-ui/core/Grow';
import { numberFormatter } from '../utils/utils';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: '142px',
        padding: '16px',
        marginTop: '16px',
        marginBottom: '16px',
    },
    avatar: {
        [theme.breakpoints.down('sm')]: {
            width: '68px',
            height: '68px'
        },
        width: '110px',
        height: '110px',
        float: 'left',
        marginRight: '14px',
        verticalAlign: 'middle',
        boxShadow: '-2px 2px 12px 0px rgba(0, 0, 0, .4)'
    },
    username: {
        [theme.breakpoints.down('sm')]: {
            lineHeight: '1.2'
        },
        paddingTop: '6px',
        lineHeight: 1.6,
        verticalAlign: 'baseline',
    },
    icon: {
        marginBottom: '-4px',
        height: '20px',
    },
    inlineText: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: '-6px',
            lineHeight: '1',
            paddingLeft: 0,
            paddingRight: '4px',
        },
        paddingRight: '6px',
    },
    bio: {
        marginTop: '6px'
    },
    status: {
        minHeight: '34px',
        paddingTop: '4px',
        paddingBottom: '4px'
    }
}));

export const UserResults: React.FC = () => {

    const { results } = useResultsContext()!;

    const classes = useStyles();
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            {results && results.users.map((user: IUser) => (
                <Grow
                 in={true}
                 timeout={400}
                 key={user.node.id}
                >
                    <Paper
                     className={classes.root}
                     elevation={3}
                    >
                        <Avatar
                         className={classes.avatar}
                         alt={`${user.node.login}'s avatar`}
                         src={`${user.node.avatarUrl}`}
                        />
                        {user.node.name && (
                            <Typography
                             variant={smScreen ? 'h6' : 'h5'}
                             variantMapping={smScreen ? {h6: 'h5'} : undefined}
                             display="inline"
                             style={{ lineHeight: 1 }}
                            >
                                {user.node.name}
                            </Typography>
                        )}
                        <div>
                            <Link
                             className={classes.username}
                             display={smScreen ? "block" : "inline"}
                             color="secondary"
                             variant="button"
                             href={user.node.url}
                            >
                                {user.node.login}
                            </Link>
                            <Box
                             className={classes.status}
                            >
                            {user.node.status && user.node.status.emoji && (
                                <>
                                    <Emoji
                                     emoji={user.node.status.emoji}
                                     size={smScreen ? 16 : 20}
                                    /> 
                                    <Typography
                                     className={classes.inlineText}
                                     variant={smScreen ? "body2" : "body1"}
                                     display="inline"
                                    >
                                        {user.node.status.message}
                                    </Typography>
                                </>
                            )}
                            </Box>
                            <Typography
                             style={{marginLeft: '-4px'}}
                             className={classes.inlineText}
                             variant={smScreen ? 'body2' : 'body1'}
                             display="inline"
                            >
                                <StarOutlineIcon className={classes.icon} />
                                {numberFormatter(user.node.starredRepositories.totalCount)}
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
                             variant={smScreen ? 'body2' : 'body1'}
                             display="inline"
                            >
                                <PeopleOutlineIcon className={classes.icon} />
                                {numberFormatter(user.node.followers.totalCount)} followers
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
                             variant={smScreen ? 'body2' : 'body1'}
                             display="inline"
                            >
                                {numberFormatter(user.node.following.totalCount)} following
                            </Typography>
                        </div>
                        {user.node.bio && (
                            <Typography
                             className={classes.bio}
                             variant={smScreen ? 'body2' : 'body1'}
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