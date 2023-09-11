import React, {useEffect, useState} from 'react';
import apiService from '../../services/api/apiService';
import '../../App.css';
import BlockRow from './BlockRow';
import PaginatedTable from "../table/PaginatedTable";
import { usePage } from '../../context/PageContext';


function BlocksTable() {
    const { page, setPage } = usePage();

    const [blocks, setBlocks] = useState([]);
    // const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [sortDirection, setSortDirection] = useState('desc');
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const result = await apiService.get(`/blocks`, {
                    [`sort.${sortDirection}`]: 'level',
                    limit: rowsPerPage,
                    offset: page * rowsPerPage
                });
                setBlocks(result);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTotalCount = async () => {
            try {
                const count = await apiService.get(`/blocks/count`);
                setTotalCount(count);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlocks();
        fetchTotalCount();
    }, [page, sortDirection]);


    const totalPages = Math.ceil(totalCount / rowsPerPage);

    const handleSortChange = (event) => {
        setSortDirection(event.target.value);
    };

    return (
        <div className="blocksTableContainer">
            <div className="blocksHeader">
                <div className="sortDirection">
                    <label htmlFor="sortDirection">Sort direction </label>
                    <select id="sortDirection" value={sortDirection} onChange={handleSortChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <PaginatedTable
                data={blocks}
                headers={['Block Level', 'Proposer', 'Timestamp', 'Transaction Count']}
                renderRow={(block) => <BlockRow key={block.hash} block={block}/>}
                tableClassName="blockTable"
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}

export default BlocksTable;
