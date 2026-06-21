import { createRouter, createWebHistory } from "vue-router";
import ResearchHome from "../views/ResearchHome.vue";
import ProjectsView from "../views/ProjectsView.vue";
import PapersView from "../views/PapersView.vue";
import KnowledgeView from "../views/KnowledgeView.vue";
import AssistantView from "../views/AssistantView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/workspace" },
    { path: "/workspace", name: "workspace", component: ResearchHome },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/papers", name: "papers", component: PapersView },
    { path: "/knowledge", name: "knowledge", component: KnowledgeView },
    { path: "/assistant", name: "assistant", component: AssistantView },
  ],
});

export default router;
