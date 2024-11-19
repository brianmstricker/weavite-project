import { Home, Inbox, Calendar, Search, Settings, Lightbulb, Aperture } from "lucide-react";
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
} from "./ui/sidebar";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

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
  <Sidebar variant="floating" collapsible="offcanvas" side="right">
   <SidebarContent>
    <SidebarGroup>
     <SidebarGroupLabel>Your Shopping Cart</SidebarGroupLabel>
     <SidebarGroupContent className="h-full">
      <SidebarMenu className="h-full">
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
       <SidebarMenuItem className="mt-auto -translate-x-0.5 pt-2">
        <SidebarMenuButton asChild>
         <ThemeToggle />
        </SidebarMenuButton>
       </SidebarMenuItem>
      </SidebarMenu>
     </SidebarGroupContent>
    </SidebarGroup>
   </SidebarContent>
  </Sidebar>
 );
};
export default Sidemenu;
