import {
  Button,
  Center,
  Container,
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
    <Center as="form" h="100vh" onSubmit={handleSubmit(onLogin)}>
      <Container centerContent p={8}>
        <Text as="h2" fontSize="4xl" py={4}>
          Login
        </Text>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email" color={!errors.email ? "black" : "red"}>
            Email
          </FormLabel>
          <Input
            type="text"
            borderColor="#ddd"
            mb={!errors.email ? 7 : 0}
            minW="250px"
            placeholder="email@email.com"
            {...register("email", { required: "Email is missing." })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
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
            placeholder="********"
            {...register("password", {
              required: "Password is missing.",
              minLength: {
                value: 8,
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
        <Button alignSelf="flex-end" variant="link" mb={4}>
          Esqueceu sua senha?
        </Button>
        <Button
          w="100%"
          textTransform="uppercase"
          my={4}
          type="submit"
          isDisabled={!isValid}
          isLoading={isLoading}
        >
          Login
        </Button>
        <Flex align="center" w="100%" py={4}>
          <Text>Não tem cadastro?</Text>
          <Button alignSelf="flex-end" variant="link" mx={2} lineHeight="base">
            Crie sua conta!
          </Button>
        </Flex>
      </Container>
    </Center>
  );
};

export default LoginForm;
