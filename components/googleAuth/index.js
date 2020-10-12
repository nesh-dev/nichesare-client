import React from "react";
import { useGoogleLogin } from "react-google-login";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";

import { GOOGLE_AUTH  } from "../../graphQl/mutations/Authentication/googleAuth";
import { Button } from "@chakra-ui/core";
import styles from "./googleAuth.module.css";


export function GoogleLoginButton(props) {
  const { buttonText } = props
  const [ authGoogle, {data} ] = useMutation(GOOGLE_AUTH);
  const router = useRouter();
  const onSuccess = async (response) => {
    
    if(response){
      const { wc: access_token  } = response;
      const loginResponse = await authGoogle({variables: { accessToken: access_token.access_token }})

      if(loginResponse.data){
        console.log(loginResponse.data, 'KKKKKK')
        const { token } = loginResponse.data.authGoogle
        localStorage.setItem("token", token)
        router.push("/");
      }

      if(loginResponse.errors){
        
      }

    }
  };


  const onFailure = response => {
    console.log('login failed',response)
  }

  const  clientId= '648104197138-ge4r77g1tr6lbdfv6gk2mdf9admdcmvb.apps.googleusercontent.com'

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId
  });

  return (
    <>
      <Button  w="70%" mb="20px" className={styles.googleButton} onClick={signIn}>
        <img
          src="https://img.icons8.com/ios/50/000000/google-logo.png"
          className={styles.googleIcon}
        />
        {buttonText}
      </Button>
    </>
  );
}
