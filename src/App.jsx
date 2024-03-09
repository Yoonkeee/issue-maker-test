import { VStack } from "@chakra-ui/react";
import { GithubTest } from "./GithubTest";

const App = () => (
  <VStack
    bgColor="white"
    justifyContent="flex-start"
    minH="100vh"
    pt="10vh"
    w="100%"
  >
    <GithubTest />
  </VStack>
);

export default App;
