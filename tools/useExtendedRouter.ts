import { useEffect, useState } from "react";
import { useRouter, useNavigationContainerRef } from "expo-router";
export default function useExtendedRouter() 
{
  
    const [isNavigationReady, setIsNavigationReady] = useState(false);
    const router = useRouter();
    const navigationContainerRef = useNavigationContainerRef();
  
    useEffect(() => {
    const sub = navigationContainerRef.addListener("state", () => {
      setIsNavigationReady(true);
    });
    return () => {
      if (sub) {
        sub();
      }
    };
    }, [navigationContainerRef]);
  
    return { isReady: isNavigationReady, ...router };
}