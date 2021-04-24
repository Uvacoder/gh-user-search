import { Box, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ghlogodark from '../ghlogos/GitHub-Mark-64px.png';
import ghlogolight from '../ghlogos/GitHub-Mark-Light-64px.png';


const useStyles = makeStyles({
    root: {
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

    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <header className={classes.root}>
            <Grid
            container
            direction="row"
            alignContent="flex-start"
            alignItems="center"
            spacing={1}
            >
                <Grid item style={{ padding: 0}}>
                    <img
                    height={smScreen ? '34px' : '50px'}
                    src={theme.palette.type === 'dark'
                        ? ghlogolight
                        : ghlogodark
                    }
                    alt="GitHub logo"
                    />
                </Grid>
                <Grid item xs={9}>
                    <Typography
                    className={classes.headerText}
                    variant={smScreen ? 'h5' : 'h2'}
                    variantMapping={smScreen ? {h5: 'h1'} : undefined}
                    display="inline"
                    >
                        GitHub User Search
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                    style={{ marginTop: '12px'}}
                    display="block"
                    >
                        
                        Search more than <Box component="span" fontWeight='fontWeightBold'> 70M </Box> users
                    </Typography>
                </Grid>
            </Grid>
        </header>
    );
};