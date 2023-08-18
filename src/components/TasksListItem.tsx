import React, { Fragment, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png';
import xIcon from '../assets/icons/x/x.png';
import { Task } from "./TasksList";

interface ITasksListItem {
    item: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTaskTitle: (id: number, newTitle: string) => void;
}

export function TasksListItem({ item, index, toggleTaskDone, removeTask, editTaskTitle }: ITasksListItem) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>(item.title);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const refInput = useRef<TextInput>(null);

    function handleSubmitEditing() {
        editTaskTitle(item.id, newTaskTitle.trim());
        setIsEditing(false);
    }

    useEffect(() => {
        setNewTaskTitle(item.title);
        if (isEditing) refInput.current?.focus();
    }, [isEditing])

    return (
        <Fragment>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    {!isEditing && (
                        <Text
                            style={item.done ? styles.taskTextDone : styles.taskText}
                        >
                            {item.title}
                        </Text>
                    )}

                    {isEditing && (
                        <TextInput
                            ref={refInput}
                            style={styles.input}
                            placeholderTextColor="#B2B2B2"
                            returnKeyType="send"
                            selectionColor="#666666"
                            onChangeText={setNewTaskTitle}
                            value={newTaskTitle}
                            onSubmitEditing={handleSubmitEditing}
                        />
                    )}

                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', alignContent: 'center', alignSelf: 'center' }}>
                {!isEditing && (
                    <TouchableOpacity
                        testID={`pen-${index}`}
                        style={{ paddingRight: 14 }}
                        onPress={() => { setIsEditing(true) }}
                    >
                        <Image source={penIcon} />
                    </TouchableOpacity>
                )}
                {isEditing && (
                    <TouchableOpacity
                        testID={`x-${index}`}
                        style={{ paddingRight: 18, }}
                        onPress={() => { setIsEditing(false) }}
                    >
                        <Image source={xIcon} />
                    </TouchableOpacity>
                )}

                <View style={{ borderWidth: 1, height: 24, borderColor: '#C4C4C4' }} >
                </View>

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 12 }}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        maxWidth: 230,
        fontFamily: 'Inter-Medium',
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium',
        maxWidth: 230,
    },
    input: {
        padding: 0,
        height: 21,
        fontFamily: 'Inter-Medium',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderRightWidth: 1,
        borderRightColor: '#EBEBEB',
        color: '#666666',
    }
})