import { Braces, Binary, Type, Shield, Clock, Wrench } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { categories, getToolsByCategory } from "@/lib/tools";

const categoryIcons: Record<string, any> = {
  JSON: Braces, Encoders: Binary, Text: Type, Generators: Clock, Security: Shield,
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
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-foreground" />
          {!collapsed && <span className="font-semibold text-sm">DevUtils</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {categories.map(cat => {
          const Icon = categoryIcons[cat];
          const catTools = getToolsByCategory(cat);
          return (
            <SidebarGroup key={cat}>
              <SidebarGroupLabel>
                <Icon className="h-3.5 w-3.5 mr-1.5" />
                {!collapsed && cat}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {catTools.map(tool => (
                    <SidebarMenuItem key={tool.id}>
                      <SidebarMenuButton
                        onClick={() => onSelectTool(tool.id)}
                        isActive={activeTool === tool.id}
                        tooltip={tool.name}
                      >
                        <tool.icon className="h-4 w-4" />
                        {!collapsed && <span>{tool.name}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
