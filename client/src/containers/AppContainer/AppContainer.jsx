import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";

import { AppPage } from "../../components/application/AppPage";
import { useFetch } from "../../hooks/use_fetch";
import { fetchJSON } from "../../utils/fetchers";
// modal
const AuthModalContainer = lazy(() =>
    import("../AuthModalContainer/AuthModalContainer").then(({ AuthModalContainer }) => ({
        default: AuthModalContainer
    }))
);
const NewPostModalContainer = lazy(() =>
    import("../NewPostModalContainer/NewPostModalContainer").then(({ NewPostModalContainer }) => ({
        default: NewPostModalContainer
    }))
);
// container
const NotFoundContainer = lazy(() =>
    import("../NotFoundContainer/NotFoundContainer").then(({ NotFoundContainer }) => ({ default: NotFoundContainer }))
);
const PostContainer = lazy(() =>
    import("../PostContainer/PostContainer").then(({ PostContainer }) => ({ default: PostContainer }))
);
const TermContainer = lazy(() =>
    import("../TermContainer/TermContainer").then(({ TermContainer }) => ({ default: TermContainer }))
);
const TimelineContainer = lazy(() =>
    import("../TimelineContainer/TimelineContainer").then(({ TimelineContainer }) => ({ default: TimelineContainer }))
);
const UserProfileContainer = lazy(() =>
    import("../UserProfileContainer/UserProfileContainer").then(({ UserProfileContainer }) => ({
        default: UserProfileContainer
    }))
);

/** @type {React.VFC} */
const AppContainer = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [activeUser, setActiveUser] = React.useState(null);
    const { data, isLoading } = useFetch("/api/v1/me", fetchJSON);
    React.useEffect(() => {
        setActiveUser(data);
    }, [data]);

    const [modalType, setModalType] = React.useState("none");
    const handleRequestOpenAuthModal = React.useCallback(() => setModalType("auth"), []);
    const handleRequestOpenPostModal = React.useCallback(() => setModalType("post"), []);
    const handleRequestCloseModal = React.useCallback(() => setModalType("none"), []);

    if (isLoading) {
        return (
            <Helmet>
                <title>読込中 - CAwitter</title>
            </Helmet>
        );
    }

    return (
        <>
            <AppPage
                activeUser={activeUser}
                onRequestOpenAuthModal={handleRequestOpenAuthModal}
                onRequestOpenPostModal={handleRequestOpenPostModal}
            >
                <Routes>
                    <Route
                        element={
                            <Suspense fallback={<></>}>
                                <TimelineContainer />
                            </Suspense>
                        }
                        path="/"
                    />
                    <Route
                        element={
                            <Suspense fallback={<></>}>
                                <UserProfileContainer />
                            </Suspense>
                        }
                        path="/users/:username"
                    />
                    <Route
                        element={
                            <Suspense fallback={<></>}>
                                <PostContainer />
                            </Suspense>
                        }
                        path="/posts/:postId"
                    />
                    <Route
                        element={
                            <Suspense fallback={<></>}>
                                <TermContainer />
                            </Suspense>
                        }
                        path="/terms"
                    />
                    <Route
                        element={
                            <Suspense fallback={<></>}>
                                <NotFoundContainer />
                            </Suspense>
                        }
                        path="*"
                    />
                </Routes>
            </AppPage>

            <Suspense fallback={<></>}>
                {modalType === "auth" ? (
                    <AuthModalContainer
                        onRequestCloseModal={handleRequestCloseModal}
                        onUpdateActiveUser={setActiveUser}
                    />
                ) : null}
                {modalType === "post" ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
            </Suspense>
        </>
    );
};

export { AppContainer };
