import React from "react";
import { Box, Button, Heading, Input } from "@chakra-ui/core";
import styles from "./sidepanel.module.css";


export function SidePanel(props) {
    const { page } = props; 
  return (
    <Box className={styles.header}>
      <Heading as="h1" className={styles.lobster}>
        NicheShare
      </Heading>

      <Heading as="h1" mt="100px" w="80%" mt="20%">
        Connect with Like Minded Individuals. Share Your Hobbies.
      </Heading>
      <Box mt="50%">
        <img src="/podcast.jpg" alt="art image" className={styles.artImage} />
      </Box>
    </Box>
  );
}
