import React from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { UserResult } from "./UserResult";


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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e: any) => {

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
            });
        // Clear the input field after submission and update state
        e.target[0].value = '';
        setQuery('');

    };

    return (
        <div>
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                 id="search"
                 name="search"
                 label="Search GitHub Users"
                 variant="outlined"
                 onChange={handleChange}
                />
                <Button
                 variant="contained"
                 type="submit"
                 size="large"
                 disableElevation
                >
                    Search
                </Button>
            </form>
            {results.users && results.userCount !== 0 && (
                <UserResult
                 users={results.users}
                />
            )}
        </div>
    );
}