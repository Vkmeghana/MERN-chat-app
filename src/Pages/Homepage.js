import React, { useEffect } from 'react'
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs, } from "@chakra-ui/react";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        

        if (userInfo) {
          history.push('/chats');
        }
    }, [history]);


  
  return (
    <Container maxW={"2xl"} centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        p={2}
        bg={"white"}
        w={"80%"}
        m={"40px 0 15px 0"}
        borderRadius={"1g"}
        borderWidth={"1 px"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"} color={"black"} align={"center"}>Talk-A-Tive</Text>
      </Box>
      <Box bg="white" w="80%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}> Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
