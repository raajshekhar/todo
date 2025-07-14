import { useCallback, useMemo, useState } from 'react'
import TodoInput from './components/TodoInput'
import './App.css'
import TodoList from './components/TodoList';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons/faFlagCheckered';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons/faCalendarWeek';
import useTodo from './hooks/useTodo';

export interface ITodo {
  id: number;
  task: string;
  completed: boolean;
}

const date = new Date().toLocaleDateString();

function App() {
  const { todos, todoDetails, handleCompletedTodo, handleDeleteTodo, handleFormSubmit } = useTodo();

  return (
    <section className='w-[40%] m-auto mt-20'>
      <p className='font-bold text-xl mb-5 text-left'><FontAwesomeIcon className='mr-2' icon={faCalendarWeek} />Todo List for {date}</p>
      {todos.length ? todos.length !== todoDetails.completed && <p className='font-bold text-xl mb-5 text-left'><FontAwesomeIcon className='mr-2' icon={faHourglassHalf} /> Pending: {todoDetails.pending}  & <FontAwesomeIcon className='mr-2 ml-3' icon={faCircleCheck} /> Completed: {todoDetails.completed}</p> : null}
      {todos.length && todos.length === todoDetails.completed ? <p className='font-bold text-xl mb-5 text-left'><FontAwesomeIcon className='mr-2' icon={faFlagCheckered} />Great job. All todos done for the day!</p> : null}
      <TodoInput onFormSubmit={handleFormSubmit} />
      <TodoList todos={todos} completedTodo={handleCompletedTodo} deleteTodo={handleDeleteTodo} />
    </section>
  )
}

export default App
