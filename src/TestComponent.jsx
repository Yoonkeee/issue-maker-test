import { Button, Flex, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";

const Header = () => (
  <Flex
    bgColor="lightcoral"
    h="10vh"
    position="sticky"
    top={0}
    w="100%"
    zIndex={1}
  />
);

const TestButton = () => {
  // const { isSuccess, data } = useQuery("test", () => axios.get("/api/test"));
  const toast = useToast();
  // const result = isSuccess ? "success" : "error";
  const onClick = () => {
    axios.get("/api/test").then((res) => {
      console.log(res);
      toast({
        title: "success",
        description: res.data,
        status: "success",
        position: "top",
        duration: 500,
        isClosable: true,
      });
    });
    // toast({
    //   title: result,
    //   description: data,
    //   status: result,
    //   position: "top",
    //   duration: 500,
    //   isClosable: true,
    // });
  };
  return (
    <Button colorScheme="whatsapp" mt="20vh" onClick={onClick} variant="solid">
      Cors Test
    </Button>
  );
};

const TestComponent = () => (
  <VStack bgColor="lightyellow" h="200vh" w="100%">
    <Header />
    <TestButton />
  </VStack>
);

export default TestComponent;
