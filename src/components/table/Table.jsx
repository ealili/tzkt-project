import React from 'react';

function Table({data, headers, renderRow, tableClassName}) {
    return (
        <table className={tableClassName}>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item) => renderRow(item))}
            </tbody>
        </table>
    );
}

export default Table;
