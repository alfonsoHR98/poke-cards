import  ReactDOM  from 'react-dom/client';
import { App } from './App'
import { Pokemon } from './Pokemon';
import './sass/index.scss'

const rootElement = document.querySelector('#root')
const root = ReactDOM.createRoot(rootElement)

console.log(root)

root.render(<Pokemon />)