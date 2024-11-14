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
     {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
     <SidebarGroupContent>
      <SidebarMenu>
       <SidebarMenuItem className="mb-10">
        <SidebarMenuButton asChild variant="outline" className="hover:bg-background">
         <Link href="/">
          <Aperture className="!size-5 -translate-x-0.5" />
          <span className="text-xl">FastBuy</span>
         </Link>
        </SidebarMenuButton>
       </SidebarMenuItem>
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
