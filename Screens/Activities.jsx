import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle, faCircle, faTrash, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "../global.css";

const TodosScreen = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");

  // Fetch data from API or AsyncStorage
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        } else {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos");
          const data = await response.json();
          setTodos(data.slice(0, 10)); // Limit to 10 todos
          console.log(data);
          
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Save todos to AsyncStorage
  const saveTodosToStorage = async (updatedTodos) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  };

  // Add a new todo
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      Alert.alert("Error", "Todo title cannot be empty.");
      return;
    }

    const updatedTodos = [
      {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
        status: "active",
      },
      ...todos
    ];

    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
    setNewTodo(""); // Clear input
    ToastAndroid.showWithGravity(
        "Added",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
  };

  // Toggle todo status (completed/not completed)
  const toggleTodoStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
    ToastAndroid.showWithGravity(
        "Updated",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
  };

  // Mark a todo as canceled
  const cancelTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: "canceled" } : todo
    );
    ToastAndroid.showWithGravity(
        "Canceled",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
    ToastAndroid.showWithGravity(
        "Deleted",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
  };

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View
      className={`flex-row items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 ${
        item.status === "canceled" ? "opacity-50" : ""
      }`}
    >
      <TouchableOpacity onPress={() => toggleTodoStatus(item.id)}>
        <FontAwesomeIcon
          icon={item.completed ? faCheckCircle : faCircle}
          size={20}
          color={item.completed ? "green" : "gray"}
        />
      </TouchableOpacity>

      <Text
        className={`ml-4 text-gray-700 dark:text-gray-300 text-base flex-1 ${
          item.completed ? "line-through" : ""
        }`}
      >
        {item.title}
      </Text>

      <TouchableOpacity onPress={() => cancelTodo(item.id)}>
        <FontAwesomeIcon icon={faTimesCircle} size={20} color="orange" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTodo(item.id)} className="ml-4">
        <FontAwesomeIcon icon={faTrash} size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-900">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-500">Loading Todos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-800">
      <Text className="text-xl bg-white dark:bg-gray-800 mb-5 font-bold text-gray-800 dark:text-gray-300 text-center py-4 shadow-md">
        Todo List
      </Text>

      {/* Add New Todo Input */}
      <View className="flex-row items-center p-4 bg-white dark:bg-gray-900 shadow-md">
        <TextInput
          placeholder="Add a new todo..."
          placeholderTextColor="#9CA3AF"
          value={newTodo}
          onChangeText={setNewTodo}
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300"
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          className="ml-2 bg-blue-500 rounded-lg px-4 py-2"
        >
          <Text className="text-white font-bold">Add</Text>
        </TouchableOpacity>
      </View>

      {/* Todos List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default TodosScreen;
