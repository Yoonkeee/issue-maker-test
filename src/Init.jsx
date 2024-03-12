import axios from "axios";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { issuesAtom, metadataAtom } from "./store";
import { getIssueLabels, getRepos } from "./api";

export const Init = () => {
  const [titles, setTitles] = useState("");
  const [prefix, setPrefix] = useState("");
  const [techdoc, setTechdoc] = useState("");
  const [issues, setIssues] = useRecoilState(issuesAtom);
  const [metadata, setMetadata] = useRecoilState(metadataAtom);

  useEffect(() => {
    getRepos().then((res) => setMetadata({ repos: res }));
  }, []);

  useEffect(() => {
    if (metadata.repos && metadata.repos.length) {
      const labelPromises = metadata.repos.map((repo) =>
        getIssueLabels(repo.name).then((labels) => ({
          name: repo.name,
          labels,
        })),
      );

      Promise.all(labelPromises).then((results) => {
        const labels = results.reduce(
          (acc, { name, labels }) => ({
            ...acc,
            [name]: {
              labels,
              url: metadata.repos.find((repo) => repo.name === name).url,
            },
          }),
          {},
        );

        setMetadata((prev) => ({
          ...prev,
          labels,
        }));
      });
    }
  }, [metadata.repos]);

  useEffect(() => {
    if (techdoc !== "") {
      setMetadata((prev) => ({
        ...prev,
        techdoc,
      }));
    }
  }, [techdoc]);

  // useEffect(() => {
  //   if (metadata.repos && metadata.repos.length) {
  //     setMetadata((prev) => ({
  //       ...prev,
  //       labels: metadata.repos.reduce(
  //         (acc, repo) => ({
  //           ...acc,
  //           [repo.name]: getIssueLabels(repo.name),
  //         }),
  //         {},
  //       ),
  //     }));
  //   }
  // }, [metadata.repos]);

  // useEffect(() => {
  //   console.log(metadata.labels);
  // }, [metadata.labels]);

  // const repos = {
  //   "clap-web": {
  //     url: "https://github.com/dwhale-dev/clap-web",
  //   },
  // };
  // const [repository, setRepository] = useState('');
  // const [token, setToken] = useState('');
  // const repository = "useRemind_dev_";

  // getRepos().then((res) => console.log(res));
  // const test = async () =>
  //   octokit.rest.issues.create({
  //     owner: "yoonkeee",
  //     repo: "useremind_dev_",
  //     title: "Hello, world!",
  //     body: "I created this issue using Octokit!",
  //   });

  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titles) {
      toast({
        title: "일감을 입력해주세요!",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      const issueTitles = titles
        .split("\n")
        .map((title) => (prefix ? `${prefix} ${title}` : `${title}`));
      setIssues(issueTitles);
      if (techdoc) setMetadata((prev) => ({ ...prev, techdoc }));
      toast({
        title: "Repo와 Label을 설정해주세요!",
        status: "info",
        duration: 4000,
        colorScheme: "green",
        position: "top",
        isClosable: true,
      });
      navigate("/set");
      // setTimeout(() => navigate("/set"), 500);
      // alert("Issue Created Successfully!");
    } catch (error) {
      alert("에러가 났어요... 죄송합니다...");
    }
  };

  return (
    <VStack gap={4} w="500px">
      <FormControl>
        <VStack alignItems="flex-start" gap={4} w="100%">
          <VStack alignItems="flex-start" w="100%">
            <Text fontSize="lg" fontWeight={700} ml={4}>
              PREFIX
            </Text>
            <Input
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="[리뷰등급 자동계산]"
              type="text"
            />
          </VStack>
          <VStack alignItems="flex-start" w="100%">
            <Text fontSize="lg" fontWeight={700} ml={4}>
              일감들
            </Text>
            <Textarea
              minH="300px"
              onChange={(e) => setTitles(e.target.value)}
              placeholder="Issue Titles"
              required
              type="text"
              value={titles}
            />
          </VStack>
          <VStack alignItems="flex-start" w="100%">
            <Text fontSize="lg" fontWeight={700} ml={4}>
              테크닥 링크
            </Text>
            <Input
              onChange={(e) => setTechdoc(e.target.value)}
              placeholder="https://www.notion.so/myclap/...."
              required
              type="text"
              value={techdoc}
            />
          </VStack>
          <Button
            gap={2}
            my="50px"
            onClick={handleSubmit}
            type="submit"
            w="100%"
          >
            <FaGithub />
            <Text>Repo, Label 설정</Text>
          </Button>
        </VStack>
      </FormControl>
    </VStack>
  );
};
