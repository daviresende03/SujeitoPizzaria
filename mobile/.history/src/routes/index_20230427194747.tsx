import React from "react";
import { View } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes(){
    const isAuthenticated = true;
    const loading = false;

    return (
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}
export default Routes;