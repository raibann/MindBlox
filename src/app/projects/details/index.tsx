import { useParams } from "react-router";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookType, Layers2, Puzzle } from "lucide-react";

const tabs = [
  {
    name: "Overview",
    icon: BookType,
    value: "pnpm",
    content: "pnpm dlx shadcn@latest add tabs",
  },
  {
    name: "Brandstorm",
    value: "npm",
    icon: Puzzle,
    content: "npx shadcn@latest add tabs",
  },
  {
    name: "Task",
    value: "yarn",
    icon: Layers2,
    content: "npx shadcn@latest add tabs",
  },
];
const ProjectDetails = () => {
  const param = useParams();
  console.log(param);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Project Details" isBack />
      <Tabs
        orientation="vertical"
        defaultValue={tabs[0].value}
        className="flex-1 w-full flex flex-row items-start gap-4 justify-start"
      >
        <TabsList className="shrink-0 grid grid-cols-1 h-auto w-fit gap-1 bg-background rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="py-1.5 cursor-pointer justify-start text-start text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <tab.icon className="size-4" />
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="h-full flex items-center justify-center w-full font-medium text-muted-foreground border-l">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex items-center justify-center h-full"
            >
              {tab.name} Content
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
