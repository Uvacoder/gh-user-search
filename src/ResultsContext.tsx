import React from 'react';


type Props = {
	children: React.ReactNode;
};

interface IStatus {
    emoji: string;
    message: string;
};

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
    };
};

export interface IPageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string;
    startCursor: string;
};

interface IQueryResults {
    userCount: number;
    users: IUser[];
    pageInfo: IPageInfo | undefined;
};

interface IResultsContext {
    results: IQueryResults;
    setResults: (results: IQueryResults) => void;
};

const ResultsContext = React.createContext<IResultsContext | undefined>(
    undefined
);

export const ResultsProvider = ({
    children
}: Props) => {
    const [ results, setResults ] = React.useState<IQueryResults>({
        userCount: 0,
        users: [],
        pageInfo: undefined
    });

    return (
        <ResultsContext.Provider value={{ results, setResults }}>
            {children}
        </ResultsContext.Provider>
    )
};

export const useResultsContext = () => React.useContext(ResultsContext);