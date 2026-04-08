import {
  Binary, Type, Clock, Wrench, Code,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { categories, getToolsByCategory } from "@/lib/tools";

const categoryIcons: Record<string, any> = {
  Text: Type, Encoders: Binary, Developer: Code,
};

interface Props {
  activeTool: string;
  onSelectTool: (id: string) => void;
}

export function AppSidebar({ activeTool, onSelectTool }: Props) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Wrench className="h-5 w-5 text-foreground" aria-hidden="true" />
          {!collapsed && <span className="font-semibold text-sm">DevUtils</span>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Tool categories">
          {categories.map(cat => {
            const Icon = categoryIcons[cat];
            const catTools = getToolsByCategory(cat);
            return (
              <SidebarGroup key={cat}>
                <SidebarGroupLabel>
                  <Icon className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                  {!collapsed && cat}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {catTools.map(tool => (
                      <SidebarMenuItem key={tool.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeTool === tool.id}
                          tooltip={tool.name}
                        >
                          <Link to={tool.path} onClick={() => onSelectTool(tool.id)}>
                            <tool.icon className="h-4 w-4" aria-hidden="true" />
                            {!collapsed && <span>{tool.name}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
