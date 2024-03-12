import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Root = () => (
  <VStack
    alignContent="center"
    bgColor="white"
    justifyContent="flex-start"
    mb="5vh"
    minH="100vh"
    mx="auto"
    pt="10vh"
    w="800px"
  >
    <Outlet />
  </VStack>
);

export default Root;
