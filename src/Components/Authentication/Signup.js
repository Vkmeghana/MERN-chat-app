import  { useState } from "react";
import { VStack } from '@chakra-ui/layout';
import { FormControl ,FormLabel} from '@chakra-ui/form-control';
import React from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';
import { useHistory } from "react-router-dom";
import axios from "axios";


const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false)
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);

    const submitHandler = async() => {
        setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    };

    const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat Application");
      data.append("cloud_name", "ddat6je53");
      fetch("https://api.cloudinary.com/v1_1/ddat6je53/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

    
  return (
    <VStack spacing={"5px"} color="black">
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)}
            />
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter Your email'
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input
                    type={show ? "text" : "password"}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
                <Input
                    type={show ? "text" : "password"}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/*"
                placeholder='Enter Your picture'
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>
        <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={picLoading} //for showing loading on the button
        >
            Signup
        </Button>
          
    </VStack>
);
};

export default Signup
