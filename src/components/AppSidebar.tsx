import {
  Binary, Type, Clock, Code,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { categories, getToolsByCategory } from "@/lib/tools";
import { SITE_NAME } from "@/lib/brand";

const categoryIcons: Record<string, any> = {
  Text: Type, Encoders: Binary, Technical: Code,
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
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0" aria-label={`${SITE_NAME} home`}>
          <img
            src="/logo-mark.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0"
            decoding="async"
          />
          {!collapsed && <span className="font-semibold text-sm truncate">{SITE_NAME}</span>}
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
