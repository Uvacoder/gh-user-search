import React from "react";
import axios from "axios";
import {
    Button,
    CircularProgress,
    makeStyles,
    TextField
} from "@material-ui/core";
import { UserResult } from "./UserResult";


const useStyles = makeStyles({
    root: {
        margin: '16px',
    },
});

interface IStatus {
    emoji: string;
    message: string;
}

export interface IUser {
    node: {
        avatarUrl: string;
        bio: string | null;
        email: string;
        followers: {
            totalCount: number;
        };
        following: {
            totalCount: number;
        };
        id: string;
        isHireable: boolean;
        location: string | null;
        login: string;
        name: string | null;
        status: IStatus | null;
        url: string;
        websiteUrl: string | null;
    }
}

interface IQueryResult {
    userCount: number;
    users: IUser[];
}

export const Search: React.FC = () => {

    const [ query, setQuery ] = React.useState<string>('');
    const [ results, setResults ] = React.useState<IQueryResult>({
        userCount: 0,
        users: []
    });
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
                        search(query: $searchQuery, type: USER, first: 100) {
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
                    users: response.data.data.search.edges
                });
                // Clear the input field after submission and update state
                e.target[0].value = '';
                setQuery('');
                setLoading(false);
            });
    };

    return (
        <>
            <form className={classes.root} noValidate onSubmit={handleSubmit}>
                <TextField
                className={classes.root}
                 id="search"
                 name="search"
                 label="Search GitHub Users"
                 variant="outlined"
                 onChange={handleChange}
                />
                <Button
                className={classes.root}
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
                <UserResult
                 users={results.users}
                />
            )}
        </>
    );
}