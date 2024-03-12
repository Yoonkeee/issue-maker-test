import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Button, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { issuesAtom, metadataAtom } from "./store";

export const Issues = () => {
  const [issues, setIssues] = useRecoilState(issuesAtom);
  const [metadata, setMetadata] = useRecoilState(metadataAtom);
  const toast = useToast();
  const navigate = useNavigate();
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
  }, []);

  return (
    <VStack w="100%">
      <HStack
        borderBottom="5px black solid"
        gap={8}
        h="100px"
        justifyContent="center"
        mb="50px"
        w="100%"
      >
        <Button
          key={metadata.selectedRepo}
          colorScheme="telegram"
          variant="outline"
        >
          <Text fontSize="lg" fontWeight={700}>
            {metadata.selectedRepo}
          </Text>
        </Button>
        <Button key={metadata.selectedLabel} colorScheme="whatsapp">
          <Text>{metadata.selectedLabel}</Text>
        </Button>
      </HStack>
      <HStack alignItems="flex-start" gap={8} w="100%">
        <VStack alignItems="flex-start" justifyContent="space-between" w="100%">
          {issues.length &&
            issues.map((issue) => (
              <Element
                key={issue}
                label={metadata.selectedLabel}
                repo={metadata.selectedRepo}
                techdoc={metadata.techdoc}
                title={issue}
                url={metadata.url}
              />
            ))}
        </VStack>
      </HStack>
    </VStack>
  );
};

const Element = ({ title, repo, url, label, techdoc }) => {
  const [isClicked, setIsClicked] = useState(false);
  // TODO: 일감 추가
  // TODO: assignee 추가
  // TODO: milestone 추가
  const template = repo === "clap-web" ? "&template=01-NEW-ISSUE.yaml" : "";
  const link =
    repo === "clap-web" ? `&issue-link=${techdoc}` : `&body=${techdoc}`;
  const targetUrl = `${url}/issues/new?title=${title}&labels=${label}${template}${link}`;
  const onClick = () => {
    window.open(targetUrl, "", "menubar=1");
    setIsClicked(true);
  };
  return (
    <HStack w="100%">
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
        w="90%"
      >
        <Text textAlign="left">{title}</Text>
      </HStack>
      <Button colorScheme={isClicked ? "green" : "gray"} onClick={onClick}>
        생성
      </Button>
    </HStack>
  );
};
