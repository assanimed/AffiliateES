import "./bootstrap";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";

import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { createTheme, MantineProvider } from "@mantine/core";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

import { NextUIProvider } from "@nextui-org/react";

import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createTheme({
    /** Put your mantine theme override here */
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <NextUIProvider>
                    <MantineProvider theme={theme}>
                        <App {...props} />
                    </MantineProvider>
                </NextUIProvider>
            </Provider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
