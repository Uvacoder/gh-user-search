import React from "react";
import axios from "axios";
import {
    Box,
    Button,
    InputAdornment,
    LinearProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { UserResults } from "./UserResults";
import { Pagination } from "./Pagination";
import { useResultsContext } from "../context/ResultsContext";
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    form: {
        height: '50px',
        display: 'flex',
        padding: 0,
        alignItems: 'center',
    },
    loading: {
        marginTop: '3px',
        marginBottom: '3px',
        height: '6px',
    },
    input: {
        height: '44px',
        boxSizing: 'border-box',
    },
    button: {
        height: '40px',
        boxSizing: 'border-box',
        marginLeft: '14px',
        background: 'linear-gradient(to right, #5ce1e6, #ffeb32, #ff66c4)',
        backgroundSize: '200%',
        backgroundPosition: '0 0',
        boxShadow: '6px -2px 10px 0px rgba(82,82,82,0.6) inset',
        transition: 'background .3s linear',
        '&:hover': {
            backgroundPosition: '100% 0',
            boxShadow: '6px -2px 10px 0px rgba(82,82,82,0.6) inset',
        },
    }
});

export const Search: React.FC = () => {

    const [ query, setQuery ] = React.useState<string>('');
    const [ loading, setLoading ] = React.useState<boolean>(false);
    const { results, setResults } = useResultsContext()!;

    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e: any) => {
        
        setLoading(true);
        e.preventDefault();
        axios
            .post(
                "https://api.github.com/graphql",
                {
                    query: `query($searchQuery:String!) {
                        search(query: $searchQuery, type: USER, first: 10) {
                            userCount
                            edges {
                                node {
                                    ... on User {
                                        email
                                        avatarUrl
                                        bio
                                        followers {
                                            totalCount
                                        }
                                        following {
                                            totalCount
                                        }
                                        websiteUrl
                                        url
                                        status {
                                            emoji
                                            message
                                        }
                                        name
                                        login
                                        location
                                        isHireable
                                        id
                                        starredRepositories {
                                            totalCount
                                        }
                                    }
                                }
                            }
                            pageInfo {
                                hasNextPage
                                hasPreviousPage
                                endCursor
                                startCursor
                            }
                        }
                    }`,
                    variables: {
                        searchQuery: `${query}`
                    }
                },
                {
                    headers: {
                        Authorization: `bearer ${process.env.REACT_APP_GITHUB_BEARER_TOKEN}`
                    }
                }
            )
            .then(response => {
                setResults({
                    userCount: response.data.data.search.userCount,
                    users: response.data.data.search.edges,
                    pageInfo: response.data.data.search.pageInfo
                });
                // Clear the input field after submission and update state
                e.target[0].value = '';
                setQuery('');
                setLoading(false);
            });
    };

    return (
        <>
            <form
             className={classes.form}
             onSubmit={handleSubmit}
            >
                <TextField
                 className={classes.input}
                 fullWidth
                 id="user-search"
                 name="search"
                 placeholder="Search GitHub Users"
                 variant="outlined"
                 onChange={handleChange}
                 margin="dense"
                 InputProps={{
                     startAdornment: (
                         <InputAdornment position="start">
                             <SearchIcon />
                         </InputAdornment>
                     )
                 }}
                />
                <Button
                 className={classes.button}
                 variant="contained"
                 type="submit"
                 size="large"
                 disableElevation
                >
                    Search
                </Button>
            </form>
            <Box
             className={classes.loading}
            >
            {loading && (
                <LinearProgress
                 aria-busy={loading}
                 variant="indeterminate"
                 color="secondary"
                />
            )}
            </Box>
            {!loading && results && (
                <>
                    <Typography
                     variant="h6"
                    >
                        Results: {results.userCount}
                    </Typography>
                    <UserResults />
                    {results.pageInfo && (
                        <Pagination
                         query={query}
                        />
                    )}
                </>
            )}
        </>
    );
};