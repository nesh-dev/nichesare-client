import React from 'react'; 
import { SidePanel } from "../components/sidePanel/index";
import { Flex, Box, Button, Heading, Input } from "@chakra-ui/core";
import * as yup from 'yup'


export default function login() {
    return (
        <Flex flexDirection="row" h="99vh">
        <Flex w="25%" flexDirection="column" bg="#f2d184" color="#866118">
          <SidePanel />
        </Flex>
        </Flex>
    )
}

