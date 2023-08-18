import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import { TasksListItem } from './TasksListItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTaskTitle: (id: number, newTitle: string) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTaskTitle }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TasksListItem
              index={index}
              item={item}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              editTaskTitle={editTaskTitle}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}