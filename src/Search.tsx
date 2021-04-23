import React from "react";
import axios from "axios";
import {
    Button,
    CircularProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { UserResult } from "./UserResult";
import { Pagination } from "./Pagination";
import { useResultsContext } from "./ResultsContext";


const useStyles = makeStyles({
    root: {
        marginTop: '16px',
        marginBottom: '16px',
    },
    button: {
        marginTop: '16px',
        marginBottom: '16px',
        marginLeft: '16px'
    }
});

export const Search: React.FC = () => {

    const [ query, setQuery ] = React.useState<string>('');
    const { results, setResults } = useResultsContext()!;
    const [ loading, setLoading ] = React.useState<boolean>(false);

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
             className={classes.root}
             onSubmit={handleSubmit}
             style={{ display: 'flex'}}
            >
                <TextField
                 className={classes.root}
                 fullWidth
                 id="search"
                 name="search"
                 label="Search GitHub Users"
                 variant="outlined"
                 onChange={handleChange}
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
                {loading && (
                    <CircularProgress
                     variant="indeterminate"
                     color="primary"
                     thickness={5}
                    />
                )}
            </form>
            
            {results.users && results.userCount !== 0 && (
                <>
                    <Typography
                     variant="h4"
                    >
                        Results: {results.userCount}
                    </Typography>
                    <UserResult
                     users={results.users}
                    />
                    {results.pageInfo && (
                        <Pagination
                         query={query}
                         pageInfo={results.pageInfo}
                        />
                    )}
                </>
            )}
        </>
    );
};