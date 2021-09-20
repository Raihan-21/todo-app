import {useState, useEffect} from 'react'
import TodoList from './TodoList';
const Home = (props) => {
    const darkTheme = props.darkTheme
    const setDarkTheme = props.setDarkTheme
    const [list, setList] = useState([])
    const [todo, setTodo] = useState('')
    const [status, setStatus] = useState('all')
    const [filteredList, setFilteredList] = useState([])
    const handleAdd = (e) => {
        e.preventDefault();
        if(todo){
            setList([...list, {text: todo, completed: false, id: Math.random() * 20}])
            setTodo('')
        }
    }
    // save local
    const setStorageItem = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }
    const getStorageItem = (key,setState) => {
            let storageList = JSON.parse(localStorage.getItem(key))
            setState(storageList)
    }
    const handleClear = () => {
        const newList = list.filter(item => item.completed == false) 
        setList(newList)
    }
    const handleDelete = (id) => {
        setList(list.filter(item => item.id !== id))
    }
    const handleComplete = (item) => {
        setList(list.map(check => {
            if(check.id === item.id){
                return{
                    ...check, completed: !check.completed
                };
            }
            return check;
        }))
    }
    const themeHandler = () => {
        setDarkTheme(!darkTheme)
    }

    // const statusHandler = (e) => {
    //     setStatus(e.target.value)
    // }
    const statusHandler = (value) => {
        setStatus(value)
    }
    const filterHandler = () => {
        switch (status) {
            case "completed":
                setFilteredList(list.filter(item => item.completed === true))
                break;
            case "ongoing":
                setFilteredList(list.filter(item => item.completed === false))
                break;
            default:
                setFilteredList(list)
                break;
        }
    }

    useEffect(() => {
        getStorageItem('list',setList)
        getStorageItem('theme', setDarkTheme)
        console.log(list)
    }, [])
    useEffect(() => {
        if(darkTheme == false){
            document.body.classList.add('light')
        }
        else{
            document.body.classList.remove('light')
        }
        setStorageItem('theme', darkTheme)
        
    }, [darkTheme])

    useEffect(() => {
        filterHandler()
        setStorageItem('list', list)
    }, [list,status])
    return ( 
        <div className="home">
            <div className="header">
                <h1>TODO</h1>
                <button onClick={themeHandler} className='theme'></button>
            </div>
            
            <form action="" onSubmit={handleAdd}>
                {/* {<input type="submit" value=''  className='submit'/>} */}
                <button type="submit" className='submit circle-btn'></button>
                <input className='input' placeholder='Create a new todo...'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                ></input>
                
                {/* {<select onChange={statusHandler}>
                    <option value="all">All</option>
                    <option value="ongoing">On Going</option>
                    <option value="completed">Completed</option>
                </select>} */}
            </form>
            <div className="content">
            {list && <TodoList
             list={list}
               handleComplete={handleComplete}
               handleDelete={handleDelete}
                filteredList={filteredList}

            />}
            <div className="info">
                <div className="remain">{list.filter(item => item.completed == false).length} items left</div>
                <div className="filters">
                    <button onClick={() => statusHandler('all')} className={status == 'all' ? 'active' : ''}>All</button>
                    <button onClick={() => statusHandler('ongoing')} className={status == 'ongoing' ? 'active' : ''}>Active</button>
                    <button onClick={() => statusHandler('completed')} className={status == 'completed' ? 'active' : ''}>Completed</button>
                </div>
                <button className='clear' onClick={handleClear}>Clear Completed</button>
            </div>
            </div>
            
        </div>
     );
}
export default Home;