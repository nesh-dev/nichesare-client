import React from "react";
import { Formik, Field, Form } from "formik";
import { Flex, Box, Button, Heading, Input } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../graphQl/mutations/Authentication/registration";
import { InputField } from "../components/customInputs/index";
import { SidePanel } from "../components/sidePanel/index";
import { toErrorMap } from "../utils/fieldErrors";
import styles from "../styles/Register.module.css";
import * as yup from 'yup'


export default function register() {

  const [registerUser, {data, error}] = useMutation(REGISTER_USER, {errorPolicy: 'all'});
  const router = useRouter();

  let schema = yup.object({
    name: yup.string().required().min(3), 
    email: yup.string().required().email(), 
    password: yup.string().required().min(8)
  })

  return (
    <Flex flexDirection="row" h="99vh">
      <Flex w="25%" flexDirection="column" bg="#f2d184" color="#866118">
        <SidePanel />
      </Flex>

      <Flex w="75%" flexDirection="column" alignItems="center">
        <Box alignSelf="flex-end" mr="10px">
          <p>
            {" "}
            Already a member ? <a href="/login"> Sign In </a>
          </p>
        </Box>
        <Flex w="50%" flexDirection="column" alignItems="center">
          <Heading
            as="h1"
            size="lg"
            mt="30%"
            alignSelf="flex-start"
            mb="26px"
            ml="15%"
          >
            Sign Up To NicheShare
          </Heading>

          <Button
            w="70%"
            mb="20px"
            className={styles.googleButton}
          >
            <img
              src="https://img.icons8.com/ios/50/000000/google-logo.png"
              className={styles.googleIcon}
            />
            Sign Up with Google
          </Button>
          <hr className={styles.divider} />
          <Box w="70%">
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              onSubmit={async (values, { setFieldError,  setSubmitting, isSubmitting }) => {
              
                  const response = await registerUser({
                    variables: { ...values }
                  });
                  
                if(response.data){
                  const { token } = response.data.registerUser;
                  localStorage.setItem("token", token);
                  router.push("/");
                }
              
                if(response.errors){
                  const message = response.errors[0].message; 
                  if(message.includes("email")){
                    setFieldError("email", message);
                  }
                }
                
              }}
              validationSchema={schema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box>
                    <InputField name="name" label="Name" />
                  </Box>

                  <Box mt="20px">
                    <InputField name="email" label="Email" />
                  </Box>

                  <Box mt="20px">
                    <InputField
                      name="password"
                      label="Password"
                      type="password"
                      size="lg"
                    />
                  </Box>
                  {/* <Box mt="20px">
                    <label>
                      <Field type="checkbox" name="checked" value="done" />
                      Creating an account means you’re okay with our Terms of
                      Service, Privacy Policy, and our default Notification
                      Settings.
                    </label>
                  </Box> */}
                  <Button
                    mt="20px"
                    w="50%"
                    alignSelf="center"
                    mb="20px"
                    type="submit"
                    className={styles.authButton}
                  >
                    Create Account
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
