import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  RefreshControl,
  Button,
} from "react-native";

export default function InventoryListScreen({ navigation }: any) {
  type Item = {
    id: number;
    name: string;
    qty: number;
  };

  const [items, setItems] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = async () => {
    // simulate fetch
    setItems([{ id: 1, name: "Item A", qty: 5 }]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View>
      <TextInput placeholder="Search items..." />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchItems} />
        }
        renderItem={({ item }) => (
          <Text onPress={() => navigation.navigate("ItemDetail", { item })}>
            {item.name} - Qty: {item.qty}
          </Text>
        )}
      />
      <Button
        title="Add Item"
        onPress={() => navigation.navigate("AddEditItem")}
      />
    </View>
  );
}
