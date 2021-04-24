import { Box, makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ghlogodark from '../ghlogos/GitHub-Mark-64px.png';
import ghlogolight from '../ghlogos/GitHub-Mark-Light-64px.png';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '16px',
    },
    headerText: {
        paddingLeft: '10px',
        lineHeight: 1
    },
    subheaderText: {
        paddingLeft: '64px',
        marginBottom: '16px',
    },
});

export const Header: React.FC = () => {
    
    const theme = useTheme();
    const classes = useStyles();

    return (
        <header>
            <div className={classes.root}>
                <img
                 height="50px"
                 src={theme.palette.type === 'dark'
                    ? ghlogolight
                    : ghlogodark
                 }
                 alt="GitHub logo"
                />
                <Typography
                 className={classes.headerText}
                 variant="h2"
                 display="inline"
                >
                    GitHub User Search
                </Typography>
            </div>
            <Typography
             className={classes.subheaderText}
             display="block"
            >
                Search more than <Box component="span" fontWeight='fontWeightBold'> 70M </Box> users
            </Typography>
        </header>
    );
};