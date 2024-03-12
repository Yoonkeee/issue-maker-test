import { useRecoilState } from "recoil";
import { Button, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { issuesAtom, metadataAtom } from "./store";

export const Setting = () => {
  const [issues, setIssues] = useRecoilState(issuesAtom);
  const [metadata, setMetadata] = useRecoilState(metadataAtom);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedLabel("");
  }, [selectedRepo]);
  useEffect(() => {
    if (!issues.length) {
      toast({
        title: "No issues found",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      navigate("/");
    }
  }, [issues]);

  const onClick = () => {
    const { url } = metadata.labels[selectedRepo];
    if (selectedRepo && selectedLabel) {
      setMetadata((prev) => ({
        ...prev,
        selectedRepo,
        selectedLabel,
        url,
      }));
      toast({
        title: "이슈 목록을 만들어드렸어요!",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      navigate("/issues");
    } else {
      toast({
        title: "레포와 라벨을 선택해주세요",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <VStack w="100%">
      <HStack
        borderBottom="5px black solid"
        h="100px"
        justifyContent="space-between"
        mb="50px"
        w="100%"
      >
        {metadata.labels &&
          Object.entries(metadata.labels).map(([name, { labels, url }]) => (
            <Button
              key={name}
              colorScheme={selectedRepo === name ? "telegram" : "gray"}
              onClick={() => setSelectedRepo(name)}
              variant="outline"
            >
              <Text fontSize="lg" fontWeight={700}>
                {name}
              </Text>
            </Button>
          ))}
      </HStack>
      <HStack alignItems="flex-start" gap={8} w="100%">
        <VStack alignItems="flex-end" justifyContent="space-between" w="35%">
          {selectedRepo &&
            metadata.labels[selectedRepo].labels.map((label) => (
              <Button
                key={label}
                colorScheme={selectedLabel === label ? "whatsapp" : "gray"}
                onClick={() => setSelectedLabel(label)}
              >
                <Text>{label}</Text>
              </Button>
            ))}
          {selectedRepo && selectedLabel && (
            <Button colorScheme="messenger" mt={12} onClick={onClick}>
              <Text fontSize={30} fontWeight={700}>
                생성하기
              </Text>
            </Button>
          )}
        </VStack>
        <VStack alignItems="flex-start" justifyContent="space-between" w="65%">
          {issues.length &&
            issues.map((issue) => (
              <Element key={issue}>
                <Text>{issue}</Text>
              </Element>
            ))}
        </VStack>
      </HStack>
    </VStack>
  );
};

const Element = ({ children }) => (
  <HStack
    bgColor="lightyellow"
    border="1px black solid"
    borderRadius="10px"
    gap={0}
    h="auto"
    maxH="100px"
    minH="60px"
    px="5%"
    textAlign="center"
    w="100%"
  >
    {children}
  </HStack>
);
