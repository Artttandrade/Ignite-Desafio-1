import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function isTaskTitleRepeated(newTitle: string) {
    const taskRepeated = tasks.find(task => task.title.toUpperCase() === newTitle.toUpperCase())
    if (taskRepeated) return true;
    else return false;
  }

  function handleTaskRepeated() {
    Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
  }

  function handleAddTask(newTaskTitle: string) {
    if (isTaskTitleRepeated(newTaskTitle)) {
      handleTaskRepeated();
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks => oldTasks.map(old => {
      if (old.id === id) {
        old.done = !old.done
      }
      return old;
    }));
  }

  function handleRemoveTask(id: number) {
    const taskToRemove = tasks.find(task => task.id === id);

    Alert.alert('Remover item', `Tem certeza que deseja remover a tarefa: ${taskToRemove?.title}?`, [
      {
        text: 'Não',
        onPress: () => { },
        style: 'destructive'
      },
      {
        text: 'Sim',
        onPress: () => setTasks(oldTasks => oldTasks.filter(old => old.id !== id))
      }
    ], {
      cancelable: true
    },);
  }

  function handleEditTaskTitle(id: number, newTitle: string) {
    if (isTaskTitleRepeated(newTitle)) {
      handleTaskRepeated();
      return;
    }

    setTasks(oldTasks => oldTasks.map(old => {
      if (old.id === id) {
        old.title = newTitle
      }
      return old;
    }));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.filter(task => !task.done).length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTaskTitle={handleEditTaskTitle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})