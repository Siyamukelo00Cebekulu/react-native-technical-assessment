// app/navigation/AppNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InventoryListScreen from "../screens/Inventory/InventoryListScreen";
import ItemDetailScreen from "../screens/Inventory/ItemDetailScreen";
import AddEditItemScreen from "../screens/Inventory/AddEditItemScreen";
import AdjustQuantityScreen from "../screens/Inventory/AdjustQuantityScreen";
import AuditLogScreen from "../screens/Inventory/AuditLogScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InventoryList" component={InventoryListScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
      <Stack.Screen name="AddEditItem" component={AddEditItemScreen} />
      <Stack.Screen name="AdjustQuantity" component={AdjustQuantityScreen} />
      <Stack.Screen name="AuditLog" component={AuditLogScreen} />
    </Stack.Navigator>
  );
}
