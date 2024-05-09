import AuthProvider, { AuthContext } from '../contexts/authContext';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import useExtendedRouter from '../tools/useExtendedRouter';

const HomePage = () => {
    return (
        <AuthProvider>
            <RenderApp/>
        </AuthProvider>
    )
}

export default HomePage;

function RenderApp(): JSX.Element {
    const router = useExtendedRouter()
    const {isAuthenticated, checkAuthorize} = useContext(AuthContext)
    let isLoading = true

    async function load() {
        if(!router.isReady || !isLoading) return
        await checkAuthorize()
        isLoading = false;
        router.replace('login')
        if(isAuthenticated) return router.replace('rent/map')
    }
    
    useEffect(() => {
        load()
    }, [router, isAuthenticated])
    
    return (
        <View>
        </View>
    )
}