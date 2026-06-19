import { createApp } from "vue";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Layout,
  List,
  Menu,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import App from "./App.vue";

const app = createApp(App);

Object.entries({
  AAvatar: Avatar,
  AAvatarGroup: Avatar.Group,
  ABadge: Badge,
  AButton: Button,
  ACard: Card,
  ACheckbox: Checkbox,
  ACol: Col,
  AConfigProvider: ConfigProvider,
  ALayout: Layout,
  ALayoutContent: Layout.Content,
  ALayoutHeader: Layout.Header,
  AList: List,
  AListItem: List.Item,
  AListItemMeta: List.Item.Meta,
  AMenu: Menu,
  ARow: Row,
  ASpace: Space,
  AStatistic: Statistic,
  ATag: Tag,
  ATypography: Typography,
  ATypographyText: Typography.Text,
  ATypographyTitle: Typography.Title,
  ATypographyParagraph: Typography.Paragraph,
}).forEach(([name, component]) => app.component(name, component));

app.mount("#app");
