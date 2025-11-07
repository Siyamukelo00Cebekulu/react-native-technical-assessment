import { View, Button, Text } from "react-native";

export default function ItemDetailScreen({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <View>
      <Text>{item.name}</Text>
      <Text>Quantity: {item.qty}</Text>
      <Button
        title="Adjust Quantity"
        onPress={() => navigation.navigate("AdjustQuantity", { item })}
      />
      <Button
        title="Audit Log"
        onPress={() => navigation.navigate("AuditLog", { itemId: item.id })}
      />
    </View>
  );
}
