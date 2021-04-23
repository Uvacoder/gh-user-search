import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IPageInfo, useResultsContext } from './ResultsContext';
import axios from 'axios';


interface IPaginationProps {
    query: string;
    pageInfo: IPageInfo;
};

export const Pagination: React.FC<IPaginationProps> = ({
    query,
    pageInfo
}: IPaginationProps) => {

    const { setResults } = useResultsContext()!;

    const handleBackClick = () => {
        axios
            .post(
                "https://api.github.com/graphql",
                {
                    query: `query($searchQuery:String!) {
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
            });
    };

    const handleForwardClick = () => {

    };

    return (
        <>
            {pageInfo.hasPreviousPage && (
                <ChevronLeftIcon
                 onClick={handleBackClick}
                />
            )}
            {pageInfo.hasNextPage && (
                <ChevronRightIcon
                 onClick={handleForwardClick}
                />
            )}
        </>
    );
}