import { View, TextInput, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../context/AuthContext";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function SignInScreen() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { signIn } = useAuth();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    // Simulate successful login
    signIn({ email: data.email });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign In</Text>

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 4,
              }}
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 4,
              }}
            />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />

      <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
