import {useNavigate} from 'react-router-dom';
import apiService from "../../services/api/apiService";
import {useEffect, useState} from "react";

const BlockRow = ({block}) => {
    const navigate = useNavigate();
    const [transactionCount, setTransactionCount] = useState(null);

    useEffect(() => {
        const fetchTransactionCount = async () => {
            try {
                const result = await apiService.get(`/operations/transactions/count?level=${block.level}`);
                setTransactionCount(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactionCount();
    }, [block]);

    const navigateToTransactions = () => {
        navigate(`/transactions/${block.level}`);
    };

    return (
        <tr key={block.hash} onClick={navigateToTransactions}>
            <td>{block.level}</td>
            <td style={{textAlign: 'left'}}>{block.proposer?.alias || 'Unknown'} </td>
            <td>{new Date(block.timestamp).toLocaleString()}</td>
            <td >{transactionCount !== null ? transactionCount : ''}</td>
        </tr>
    );
};

export default BlockRow;
