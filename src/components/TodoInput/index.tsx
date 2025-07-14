import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TodoInputProps {
    onFormSubmit: (data: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onFormSubmit }) => {
    const [error, setError] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => inputRef.current?.focus(), [])

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputRef.current?.value) return setError('Please enter a todo item!');
        if (inputRef.current.value.length > 100) return setError('Todo is too long!');
        onFormSubmit(inputRef.current.value);
        inputRef.current.value = '';
        inputRef.current.blur();
    }, [onFormSubmit]);

    const handleInputChange = useCallback(() => {
        if (error) setError('');
    }, [error]);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Add new todo</label>
            <br />
            <input aria-describedby="todo-error" aria-invalid={!!error} onChange={handleInputChange} maxLength={100} id="new-todo" className='border h-[40px] rounded-[10px] pl-1 mr-2' ref={inputRef} type="text" placeholder='Enter your todo..' />
            <button aria-label="Add todo" type="submit" className='border rounded-[10px] hover:bg-gray-100 p-2'><FontAwesomeIcon icon={faPlus} /> Add Todo</button>
            <br />
            {error && <span id="todo-error" className='m-2 text-red-600 ml-0' role="alert">Please enter a todo item.</span>}
        </form>
    );
}

export default TodoInput;