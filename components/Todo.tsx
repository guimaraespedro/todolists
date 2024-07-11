import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type CheckBoxProps = {
  selected: boolean;
  onCheck: () => void;
};

function CheckBox({ selected, onCheck }: CheckBoxProps) {
  return (
    <TouchableOpacity
      onPress={onCheck}
      style={
        selected ? styles.checkBoxContainerSelected : styles.checkBoxContainer
      }
    >
      {selected && <AntDesign name="check" size={16} color="white" />}
    </TouchableOpacity>
  );
}

type TodoProps = {
  description: string;
  done: boolean;
  onCheck: () => void;
  onDelete: () => void;
};

export function Todo({ description, done, onCheck, onDelete }: TodoProps) {
  return (
    <View style={styles.container}>
      <CheckBox onCheck={onCheck} selected={done} />
      <Text style={done ? styles.descriptionDone : styles.description}>
        {description}
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <FontAwesome name="trash-o" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#262626",
    borderRadius: 5,
    marginBottom: 10,
    height: 64,
  },
  description: {
    color: "white",
  },
  descriptionDone: {
    color: "grey",
    textDecorationLine: "line-through",
  },
  checkBoxContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    borderColor: "#4EA8DE",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 50,
  },
  checkBoxContainerSelected: {
    width: 24,
    height: 24,
    justifyContent: "center",
    borderColor: "#5E60CE",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#5E60CE",
  },
});
