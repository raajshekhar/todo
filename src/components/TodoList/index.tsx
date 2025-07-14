import React from 'react';
import type { ITodo } from '../../App';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';

interface ITodoList {
    todos: ITodo[];
    completedTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoList> = React.memo(({ todos, completedTodo, deleteTodo }) => {
    if (!todos?.length) return <p className='mt-5'> <FontAwesomeIcon icon={faList} /> Make progress, not just plans.</p>;
    return (
        <ul className='mt-5 text-left'>
            {todos.map((todo: ITodo) => (
                <li key={todo.id} className='flex justify-between items-center mb-2'>
                    <div>
                        {!todo.completed && <input className='mr-2' type="checkbox" checked={todo.completed} onChange={() => completedTodo(todo.id)} />}
                        <span className={todo.completed ? 'line-through' : ''}>{todo.task}</span> - {todo.completed ? 'Completed' : 'Not Completed'}
                    </div>
                    <div className='ml-2' >
                        {todo.completed ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />}
                    </div>
                </li>))}
        </ul>
    )
});

export default TodoList;