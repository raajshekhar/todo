import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ITodo } from "../../App";

const useTodo = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const getStoredTodos = localStorage.getItem('todos');
        if (getStoredTodos) {
            setTodos(JSON.parse(getStoredTodos))
        }
        !initialized && setInitialized(true);
    }, [])

    useEffect(() => {
        initialized && localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos, initialized]);

    const handleFormSubmit = useCallback((data: string = '') => {
        const trimmed = data.trim();
        if (!trimmed) return;
        if (todos.some(todo => todo.task === trimmed)) return;
        const newTodo: ITodo = {
            id: todos.length + 1,
            task: data,
            completed: false
        }
        setTodos([...todos, newTodo]);
    }, [todos])

    const handleCompletedTodo = useCallback((id: number) => {
        setTodos(todos.map((todo: ITodo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }, [todos])

    const handleDeleteTodo = useCallback((id: number) => {
        setTodos(todos.filter((todo: ITodo) => todo.id !== id));
    }, [todos]);

    const todoDetails = useMemo(() => {
        return todos.reduce((acc, current) => {
            return {
                ...acc,
                pending: current.completed ? acc.pending : acc.pending + 1,
                completed: current.completed ? acc.completed + 1 : acc.completed
            }
        }, {
            pending: 0,
            completed: 0
        })
    }, [todos])

    return {
        todos,
        todoDetails,
        handleFormSubmit,
        handleCompletedTodo,
        handleDeleteTodo
    }
}

export default useTodo;
