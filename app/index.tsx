import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Todo } from "../components/Todo";
const TodoImg = require("../assets/Logo.svg");
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

type TodoType = {
  done: boolean;
  description: string;
};

export default function Index() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [currTodo, setCurrTodo] = useState<string>("");

  function handleChangeTodo(text: string) {
    setCurrTodo(text);
  }

  function handleAddTodo() {
    const newTodo = { done: false, description: currTodo };

    setTodos((currTodos) => [...currTodos, newTodo]);
    setCurrTodo("");
  }

  function handleCheckTodo(index: number) {
    const newTodos = todos.map((t, idx) => {
      if (idx === index) {
        return {
          done: !t.done,
          description: t.description,
        };
      }
      return t;
    });

    setTodos(newTodos);
  }

  function handleDeleteTodo(index: number) {
    const newTodos = todos.filter((t, idx) => idx !== index);

    setTodos(newTodos);
  }

  const doneTodos = todos.filter((todos) => todos.done);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={TodoImg} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.actionContainer}>
          <TextInput
            style={styles.input}
            placeholder="Create a Todo"
            value={currTodo}
            onChangeText={(e) => handleChangeTodo(e)}
          ></TextInput>
          <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTextCreated}>
            Created <Text style={styles.infoTextQuantity}>{todos.length}</Text>
          </Text>
          <Text style={styles.infoTextDone}>
            Done <Text style={styles.infoTextQuantity}>{doneTodos.length}</Text>
          </Text>
        </View>

        <View style={styles.divider}></View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.description}
          renderItem={({ item, index }) => (
            <Todo
              onCheck={() => handleCheckTodo(index)}
              description={item.description}
              done={item.done}
              onDelete={() => handleDeleteTodo(index)}
            ></Todo>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{ color: "white" }}>
              No todos yet, add more to your list
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  headerContainer: {
    height: 170,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoTextCreated: {
    color: "#4EA8DE",
    fontWeight: "bold",
    fontSize: 16,
    display: "flex",
    gap: 5,
  },
  infoTextQuantity: {
    display: "flex",
    width: 25,
    height: 19,
    borderRadius: 10,
    color: "white",
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
  },
  divider: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoTextDone: {
    color: "#8284FA",
    fontWeight: "bold",
    fontSize: 16,
    display: "flex",
    gap: 5,
  },
  contentContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    gap: 10,
    marginTop: -27,
  },
  input: {
    lineHeight: 54,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#262626",
    color: "white",
    fontSize: 16,
    paddingLeft: 10,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 10,
  },
  addButton: {
    height: 54,
    width: 54,
    color: "white",
    backgroundColor: "#1E6F9F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
