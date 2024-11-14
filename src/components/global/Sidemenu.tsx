import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import {
 Sidebar,
 SidebarContent,
 SidebarFooter,
 SidebarGroup,
 SidebarGroupContent,
 SidebarGroupLabel,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
 SidebarTrigger,
} from "../ui/sidebar";
import Link from "next/link";

const items = [
 {
  title: "Home",
  url: "",
  icon: Home,
 },
 {
  title: "Inbox",
  url: "",
  icon: Inbox,
 },
 {
  title: "Calendar",
  url: "",
  icon: Calendar,
 },
 {
  title: "Search",
  url: "",
  icon: Search,
 },
 {
  title: "Settings",
  url: "",
  icon: Settings,
 },
];

const Sidemenu = () => {
 return (
  <Sidebar variant="floating" collapsible="icon">
   <SidebarContent>
    <SidebarGroup>
     <SidebarGroupLabel>Application</SidebarGroupLabel>
     <SidebarGroupContent>
      <SidebarMenu>
       {/* <SidebarTrigger /> */}
       {items.map((item) => (
        <SidebarMenuItem key={item.title}>
         <SidebarMenuButton asChild>
          <Link href={item.url}>
           <item.icon />
           <span>{item.title}</span>
          </Link>
         </SidebarMenuButton>
        </SidebarMenuItem>
       ))}
      </SidebarMenu>
     </SidebarGroupContent>
    </SidebarGroup>
   </SidebarContent>
  </Sidebar>
 );
};
export default Sidemenu;
