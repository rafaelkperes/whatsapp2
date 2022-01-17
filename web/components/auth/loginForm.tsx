import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      return console.log("data", data);
    }, 2000);
  };

  return (
    <Flex
      as="form"
      direction="column"
      border="1px solid #ddd"
      borderRadius="10px"
      py={12}
      px={16}
      onSubmit={handleSubmit(onLogin)}
    >
      <Text as="h2" fontSize="3xl" textAlign="center" pb={4}>
        Login
      </Text>
      <FormControl isInvalid={errors.username}>
        <FormLabel
          htmlFor="username"
          color={!errors.username ? "black" : "red"}
        >
          Username
        </FormLabel>
        <Input
          type="text"
          borderColor="#ddd"
          mb={!errors.username ? 7 : 0}
          minW="250px"
          {...register("username", { required: "Username is missing." })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel
          htmlFor="password"
          color={!errors.password ? "black" : "red"}
        >
          Password
        </FormLabel>
        <Input
          type="password"
          borderColor="#ddd"
          mb={!errors.password ? 7 : 0}
          minW="250px"
          {...register("password", {
            required: "Password is missing.",
            minLength: {
              value: 6,
              message: "Password too short.",
            },
            maxLength: {
              value: 16,
              message: "Password too long.",
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="blue"
        type="submit"
        isDisabled={!isValid}
        isLoading={isLoading}
      >
        Login
      </Button>
    </Flex>
  );
};

export default LoginForm;
