import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useResultsContext } from '../context/ResultsContext';
import axios from 'axios';
import { IconButton } from '@material-ui/core';


interface IPaginationProps {
    query: string;
};

export const Pagination: React.FC<IPaginationProps> = ({
    query,
}: IPaginationProps) => {

    const { results, setResults } = useResultsContext()!;

    const handleForwardClick = () => {
        axios
            .post(
                "https://api.github.com/graphql",
                {
                    query: `query($searchQuery:String!, $endCursor:String!) {
                        search(
                            query: $searchQuery,
                            type: USER,
                            first: 10,
                            after: $endCursor
                        ) {
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
                        searchQuery: `${query}`,
                        endCursor: `${results.pageInfo?.endCursor}`
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
            });
    };

    const handleBackClick = () => {
        axios
            .post(
                "https://api.github.com/graphql",
                {
                    query: `query($searchQuery:String!, $startCursor:String!) {
                        search(
                            query: $searchQuery,
                            type: USER,
                            last: 10,
                            before: $startCursor
                        ) {
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
                        searchQuery: `${query}`,
                        startCursor: `${results.pageInfo?.startCursor}`
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
            });
    };

    return (
        <>
            {results.userCount !== 0 && results.pageInfo?.hasPreviousPage && (
                <IconButton
                 aria-label="back/previous"
                 onClick={handleBackClick}
                >
                    <ChevronLeftIcon
                     fontSize='large'
                    />
                </IconButton>
            )}
            {results.userCount !== 0 && results.pageInfo?.hasNextPage && (
                <IconButton
                 aria-label="forward/next"
                 onClick={handleForwardClick}
                >
                    <ChevronRightIcon
                     fontSize='large'
                    />
                </IconButton>
            )}
        </>
    );
};