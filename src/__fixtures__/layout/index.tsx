import React, { memo, Suspense } from "react"
import Navigator from "../navigator"
import { Route } from "react-router-dom"
import { authRoute, routes } from "./routeConfig"


function Layout() {


    return (
        <div className="m-auto w-screen h-screen bg-gray-100">
            <Navigator />
            <main className="pt-12 h-full m-auto" style={{ maxWidth: 1366 }}>
                {Object.values(routes).map((route, idx) => (
                    <Route
                        key={idx}
                        exact={true}
                        path={route.path}
                    >
                        <route.component />
                    </Route>
                ))}
                <Route
                    path={authRoute.path}
                    exact={true}
                >
                    <authRoute.component />
                </Route>
            </main>
        </div>
    )
}

export default memo(function () {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <Layout />
        </Suspense>
    )
})

