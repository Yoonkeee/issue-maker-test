import axios from "axios";
import { useState } from "react";
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
  VStack,
} from "@chakra-ui/react";

export const GithubTest = () => {
  const [titles, setTitles] = useState("");
  const [prefix, setPrefix] = useState("");
  const [techdoc, setTechdoc] = useState("");
  const repos = {
    "clap-web": {
      url: "https://github.com/dwhale-dev/clap-web",
    },
  };
  // const [repository, setRepository] = useState('');
  // const [token, setToken] = useState('');
  // const repository = "useRemind_dev_";

  const octokit = new Octokit({
    auth: process.env["github-token"],
  });

  // await octokit.request('GET /repos/{owner}/{repo}', {
  //   owner: 'OWNER',
  //   repo: 'REPO',
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28'
  //   }
  // })

  // const getRepos = async () =>
  //   octokit.request("GET /user/repos?visibility=private", {
  //     headers: {
  //       "X-GitHub-Api-Version": "2022-11-28",
  //     },
  //   });

  // const test = async () =>
  //   octokit.rest.issues.create({
  //     owner: "yoonkeee",
  //     repo: "useremind_dev_",
  //     title: "Hello, world!",
  //     body: "I created this issue using Octokit!",
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(await getRepos());
    // return;

    try {
      const issueTitles = titles
        .split("\n")
        .map((title) => `${prefix}${prefix ? " " : ""}${title}`);

      console.log(issueTitles);

      // console.log(e.target.title.split("\n"));
      // console.log(await test());
      // await axios.post(url, data, { headers });
      alert("Issue Created Successfully!");
    } catch (error) {
      console.error("Error creating issue:", error);
      alert("Error creating issue. See console for more information.");
    }
  };

  return (
    <VStack gap={4} w="500px">
      <FormControl>
        <FormLabel>PREFIX</FormLabel>
        <Input
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="[리뷰등급 자동계산]"
          type="text"
        />
        <FormLabel>일감들</FormLabel>
        <Textarea
          onChange={(e) => setTitles(e.target.value)}
          placeholder="Issue Titles"
          required
          type="text"
          value={titles}
        />
        <FormLabel>테크닥 링크</FormLabel>
        <Input
          onChange={(e) => setTechdoc(e.target.value)}
          placeholder="https://www.notion.so/myclap/...."
          required
          type="text"
          value={techdoc}
        />
        <Button my="50px" onClick={handleSubmit} type="submit" w="100%">
          Create Issues
        </Button>
      </FormControl>
    </VStack>
  );
};
