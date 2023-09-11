import React, {useState} from 'react';
import Table from './Table';

function PaginatedTable({
                            data,
                            headers,
                            renderRow,
                            tableClassName,
                            page,
                            totalPages,
                            onPageChange
                        }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (newPage) => {
        setIsLoading(true);
        onPageChange(newPage);

        // Apply delay for all buttons except "First Page" and "Last Page"
        if (newPage !== 0 && newPage !== totalPages - 1) {
            setTimeout(() => {
                setIsLoading(false);
            }, 900);
        } else {
            setIsLoading(false);
        }
    };

    const isLastPage = page === totalPages - 1;

    const PageButton = ({pageNumber}) => (
        <button
            className={'paginationButton'}
            onClick={() => handleClick(pageNumber - 1)}
            disabled={pageNumber > totalPages || isLoading || pageNumber - 1 === page}>
            {pageNumber}
        </button>
    );

    let pageStart = Math.max(1, page - 2);
    let pageEnd = Math.min(totalPages, page + 2);
    if (pageEnd - pageStart < 4 && pageStart > 1) {
        pageStart = Math.max(1, pageEnd - 4);
    }
    if (pageEnd - pageStart < 4 && pageEnd < totalPages) {
        pageEnd = Math.min(totalPages, pageStart + 4);
    }

    const pageButtons = Array(pageEnd - pageStart + 1).fill().map((_, idx) => pageStart + idx).map(pageNumber => (
        <PageButton key={pageNumber} pageNumber={pageNumber}/>
    ));

    return (
        <div>
            <Table
                data={data}
                headers={headers}
                renderRow={renderRow}
                tableClassName={tableClassName}
            />
            <div className={'paginationButtonsContainer'}>
                <button className={'paginationButton'} onClick={() => handleClick(0)}
                        disabled={page === 0 || isLoading}>
                    First
                </button>
                <button className={'paginationButton'} onClick={() => handleClick(page - 1)}
                        disabled={page === 0 || isLoading}>
                    Previous
                </button>
                {pageButtons}
                <button className={'paginationButton'} onClick={() => handleClick(page + 1)}
                        disabled={isLastPage || isLoading}>
                    Next
                </button>
                <button className={'paginationButton'} onClick={() => handleClick(totalPages - 1)}
                        disabled={isLastPage || isLoading}>
                    Last
                </button>
            </div>
        </div>
    );
}

export default PaginatedTable;
