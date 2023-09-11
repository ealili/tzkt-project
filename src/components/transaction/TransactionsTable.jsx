import React, {useEffect, useState} from 'react';
import apiService from '../../services/api/apiService';
import {Link, useParams} from 'react-router-dom';
import '../../App.css';
import PaginatedTable from "../table/PaginatedTable";

function TransactionsTable() {
    const [transactions, setTransactions] = useState([]);
    const {level} = useParams();
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const rowsPerPage = 15;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const result = await apiService.get(`/operations/transactions`, {
                    level: level,
                    limit: rowsPerPage,
                    offset: page * rowsPerPage
                });
                setTransactions(result);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTotalCount = async () => {
            try {
                const count = await apiService.get(`/operations/transactions/count?level=${level}`);
                setTotalCount(count);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
        fetchTotalCount();
    }, [page, level]);


    return (
        <div>
            <div className="transactionHeader">
                <h3>Transaction details for block level {level}</h3>
                <Link to="/">Go Back</Link>
            </div>
            <PaginatedTable
                data={transactions}
                headers={['Sender', 'Target', 'Amount', 'Status']}
                renderRow={(transaction) => (
                    <tr style={{cursor: 'auto'}} key={transaction.id}>
                        <td style={{textAlign: 'left'}}>{transaction.sender?.alias || 'Unknown'}</td>
                        <td style={{textAlign: 'left'}}>{transaction.target?.alias || 'Unknown'}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</td>
                    </tr>
                )}
                tableClassName="transactionsTable"
                page={page}
                totalPages={Math.ceil(totalCount / rowsPerPage)}
                onPageChange={setPage}
            />
        </div>
    );
}

export default TransactionsTable;
