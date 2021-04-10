import styled from 'styled-components'
import {useState} from 'react'
import initialData from '../data/initial-data';
import Column from '../components/column';
import {DragDropContext, resetServerContext} from 'react-beautiful-dnd'


// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `


export default function Home() {
  resetServerContext();
  const [state, setState] = useState(initialData);

  const onDragEnd = result => {
    const {destination, source, draggableId} = result;
    console.log(destination, source, draggableId);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const newState = state;
    const taskIds = Array.from(newState.columns[destination.droppableId].taskIds);
    // change task orders
    const fromIndex = source.index;
    const toIndex = destination.index;
    const id = taskIds.splice(fromIndex, 1)[0];
    taskIds.splice(toIndex, 0, id);
    newState.columns[destination.droppableId].taskIds = taskIds;
    setState(state => newState);
    console.log(state);
  }

  return (<DragDropContext onDragEnd={onDragEnd}>
  { 
    state.columnOrder.map(columnId => {
      const column = state.columns[columnId];
      const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
      return <Column key={column.id} column={column} tasks={tasks} />;
    })
  }
  </DragDropContext>);
}
