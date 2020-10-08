import React from "react";
import { Formik, Field, Form } from "formik";
import { Flex, Box, Button, Heading, useToast } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../graphQl/mutations/Authentication/login";
import { InputField } from "../components/customInputs/index";
import { SidePanel } from "../components/sidePanel/index";
import styles from "../styles/Register.module.css";
import * as yup from "yup";

export default function login() {
  const [loginUser, { data, error }] = useMutation(LOGIN_USER, {
    errorPolicy: "all"
  });
  const toast = useToast();
  const router = useRouter();

  let schema = yup.object({
    email: yup
      .string()
      .required()
      .email(),
    password: yup
      .string()
      .required()
      .min(6)
  });

  return (
    <Flex flexDirection="row" h="99vh">
      <Flex w="25%" flexDirection="column" bg="#f1cdd7" color="#865c6c">
        <SidePanel page={login} />
      </Flex>

      <Flex w="75%" flexDirection="column" alignItems="center">
        <Box alignSelf="flex-end" mr="10px">
          <p>
            {" "}
            Not a member ? <a href="/register"> Sign Up now </a>
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
            Sign In To NicheShare
          </Heading>

          <Button w="70%" mb="20px" className={styles.googleButton}>
            <img
              src="https://img.icons8.com/ios/50/000000/google-logo.png"
              className={styles.googleIcon}
            />
            Sign In with Google
          </Button>
          <hr className={styles.divider} />
          <Box w="70%">
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, { setFieldError }) => {
                const response = await loginUser({
                  variables: { ...values }
                });
                console.log(response);
                if (response.data) {
                  const { token } = response.data.loginUser;
                  localStorage.setItem("token", token);
                  router.push("/");
                }

                if (response.errors) {
                  const message = response.errors[0].message;
                  toast({
                    position: "top-right",
                    title: "Unsucessful Login",
                    description: `${message}`,
                    status: "warning",
                    duration: 9000,
                    isClosable: true
                  });
                  setFieldError("email");
                  setFieldError("password");
                  
                }
              }}
              validationSchema={schema}
            >
              {({ isSubmitting }) => (
                <Form>
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
                    Sign In
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
