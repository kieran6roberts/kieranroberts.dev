import {
  ReactSVG,
  TailwindSVG,
  GraphqlSVG,
  NextjsSVG,
  JavaScriptSVG,
  AWSLambdaSVG,
  CypressSVG,
  MongoDBSVG,
  GitSVG,
  JestSVG,
  CloudflareSVG,
  AstroSVG,
  HashnodeSVG,
  NodejsSVG,
  FigmaSVG,
  LinearSVG,
  SQLSVG,
} from "@components/icons/index";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@components/base/Tooltip";
import cn from "clsx";

const tech = [
  {
    title: "JavaScript",
    icon: JavaScriptSVG,
  },
  {
    title: "TailwindCSS",
    icon: TailwindSVG,
  },
  {
    title: "GraphQL",
    icon: GraphqlSVG,
  },
  {
    title: "React",
    icon: ReactSVG,
  },
  {
    title: "Next.js",
    icon: NextjsSVG,
    white: true,
  },
  {
    title: "SQL",
    icon: SQLSVG,
  },
  {
    title: "AWS Lambda",
    icon: AWSLambdaSVG,
  },
  {
    title: "MongoDB",
    icon: MongoDBSVG,
  },
  {
    title: "Git",
    icon: GitSVG,
  },
  {
    title: "Jest",
    icon: JestSVG,
  },
  {
    title: "Cloudflare",
    icon: CloudflareSVG,
  },
  {
    title: "Astro",
    icon: AstroSVG,
  },
  {
    title: "Hashnode",
    icon: HashnodeSVG,
  },
  {
    title: "Node.js",
    icon: NodejsSVG,
    white: true,
  },
  {
    title: "Figma",
    icon: FigmaSVG,
  },
  {
    title: "Linear",
    icon: LinearSVG,
    white: true,
  },
  {
    title: "Cypress",
    icon: CypressSVG,
    white: true,
  },
];

export const TechCarousel = () => {
  const techItems = tech.map((tech) => (
    <TooltipProvider key={tech.title}>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <span
            title={tech.title}
            className={cn(
              "inline-block w-[35px] h-[35px] mx-6 rounded-full opacity-15 hover:opacity-80 hover:scale-110 transition-all duration-150 cursor-pointer",
              tech.white && "dark:bg-white/75",
            )}
          >
            <tech.icon />
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          <p>{tech.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ));
  return (
    <div className="group hero-logos before:bg-gradient-to-l from-transparent to-[#fdfdfd] dark:to-[#100114] after:bg-gradient-to-r from-transparent to-[#fdfdfd] dark:to-[#100114] relative whitespace-nowrap z-1 w-full max-w-[900px] mx-auto py-12 overflow-x-hidden">
      <div className="hero-carousel inline-block">{techItems}</div>
      <div className="hero-carousel inline-block">{techItems}</div>
    </div>
  );
};
