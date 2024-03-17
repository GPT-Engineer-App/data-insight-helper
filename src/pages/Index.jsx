import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-19n7.fly.dev/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 204) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const error = await response.json();
        toast({
          title: "An error occurred.",
          description: error.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-19n7.fly.dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
      } else {
        const error = await response.json();
        toast({
          title: "An error occurred.",
          description: error.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4} align="stretch">
        {!isLoggedIn ? (
          <>
            <Heading>Welcome to Interactive API</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleSignup}>
              Sign Up
            </Button>
            <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
              Log In
            </Button>
          </>
        ) : (
          <Box textAlign="center">
            <Heading mb={4}>Welcome back!</Heading>
            <Button colorScheme="red" onClick={() => setIsLoggedIn(false)}>
              Log Out
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
