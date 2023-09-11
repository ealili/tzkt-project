import {createContext, useState, useContext} from 'react';

const PageContext = createContext({
    page: 0, setPage: () => {
    }
});

export function PageProvider({children}) {
    const [page, setPage] = useState(0);

    return (
        <PageContext.Provider value={{page, setPage}}>
            {children}
        </PageContext.Provider>
    );
}

export function usePage() {
    const context = useContext(PageContext);
    if (context === undefined) {
        throw new Error('usePage must be used within a PageProvider');
    }
    return context;
}
