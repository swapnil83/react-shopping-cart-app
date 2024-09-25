import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './context/Context.jsx';

createRoot(document.getElementById('root')).render(
    <Context>
        <App />
    </Context>
);
