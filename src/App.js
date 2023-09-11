import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import BlocksTable from "./components/block/BlocksTable";
import TransactionsTable from "./components/transaction/TransactionsTable";
import {PageProvider} from "./context/PageContext";

const App = () => {
    return (
        <Router>
            <PageProvider>
                <Link className={'title'} to={'/'}>Blockchain Data</Link>
                <Routes>
                    <Route index element={<BlocksTable/>}/>
                    <Route path="/transactions/:level" element={<TransactionsTable/>}/>
                </Routes>
            </PageProvider>
        </Router>
    );
}

export default App;