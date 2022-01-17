import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });
  const [isLoading, setIsLoading] = useState(false);
  const onRegister = (data: any) => {
    setIsLoading(true);
    console.log("data", data);
    if (data.password !== data.confirmPassword) return;
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
      onSubmit={handleSubmit(onRegister)}
    >
      <Text as="h2" fontSize="3xl" textAlign="center" pb={4}>
        Create account
      </Text>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name" color={!errors.name ? "black" : "red"}>
          Full Name
        </FormLabel>
        <Input
          type="text"
          borderColor="#ddd"
          mb={!errors.name ? 7 : 0}
          minW="250px"
          {...register("name", { required: "Full name is missing." })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
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

      <FormControl isInvalid={errors.confirmPassword}>
        <FormLabel
          htmlFor="confirmPassword"
          color={!errors.confirmPassword ? "black" : "red"}
        >
          Confirm Password
        </FormLabel>
        <Input
          type="password"
          borderColor="#ddd"
          mb={!errors.confirmPassword ? 7 : 0}
          minW="250px"
          {...register("confirmPassword", {
            required: "Confirm your Password.",
          })}
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="blue"
        type="submit"
        isDisabled={!isValid || isSubmitting}
        isLoading={isLoading}
      >
        Create
      </Button>
    </Flex>
  );
};

export default RegisterForm;
