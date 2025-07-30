// import AppLayout from "@/layout";
import Loading from "@/components/loading";
import PageLoading from "@/components/loading/page-loading";
import ErrorBoundary from "@/app/error";
import { ROUTE_PATH } from "@/lib/route-path";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// layout
const AppLayout = lazy(() => import("../layout"));
// pages
const NotFoundPage = lazy(() => import("../app/not-found"));
const DashboardPage = lazy(() => import("../app/dashboard"));
const ProjectPage = lazy(() => import("../app/projects"));
const ProjectDetailsPage = lazy(() => import("../app/projects/pages/details"));
const TaskPage = lazy(() => import("../app/projects/pages/tasks"));

const AllRoutes = () => {
  return (
    <Routes>
      {/* Layout Wrap */}
      <Route
        element={
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <AppLayout />
            </ErrorBoundary>
          </Suspense>
        }
      >
        <Route
          index
          path={ROUTE_PATH.root}
          element={
            <Suspense fallback={<PageLoading />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_PATH.project.root}
          element={
            <Suspense fallback={<PageLoading />}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_PATH.project.details}
          element={
            <Suspense fallback={<PageLoading />}>
              <ProjectDetailsPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_PATH.project.tasks}
          element={
            <Suspense fallback={<PageLoading />}>
              <TaskPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* End Layout */}
    </Routes>
  );
};

export default AllRoutes;
