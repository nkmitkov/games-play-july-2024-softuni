/*
Note

Error boundaries do not catch errors for:

Event handlers (learn more)
Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
Server side rendering
Errors thrown in the error boundary itself (rather than its children)
*/

import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasError: false,
        };
    };

    static getDerivedStateFromError(err) {
        console.log("getDerivedStateFromError");
        return {
            hasError: true,
        };
    };

    componentDidCatch(error, errorInfo) {
        console.log("componentDidCatch");
        //TODO: Logging
    };

    render() {
        if (this.state.hasError) {
            return <h1>404</h1>
        }

        return this.props.children;
    };
};