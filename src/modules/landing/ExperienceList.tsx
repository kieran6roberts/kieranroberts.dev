import { Button } from '@components/base/Button';
import { DownloadCircleSVG } from '@components/icons';
import { education, experience as experienceList } from '@consts/index';
import type { Experience as ExperienceType } from '@consts/index';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@components/base/Tabs';
import { Badge } from '@components/base/Badge';

const ExperienceCard = ({ experience }: { experience: ExperienceType }) => {
  return (
    <article className="flex flex-col justify-center gap-4 py-8 w-full pb-8">
      <div>
        <span className="w-12 md:w-20 block">
          <experience.logo />
        </span>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xl xl:text-2xl text-zinc-700 dark:text-zinc-300">
            {experience.company}
          </span>
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-3xl xl:text-4xl font-medium text-zinc-700 dark:text-zinc-300">
              {experience.title}
            </h2>
            <Badge>{experience.type}</Badge>
          </div>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {experience.location} | <time>{experience.date}</time>
          </span>
          <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
          <ul className="list-disc space-y-4 p-4 list-outside text-sm md:text-base text-zinc-600 dark:text-zinc-300">
            {experience.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
          <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {experience.image && (
          <div className="flex justify-start w-full h-[300px]">
            <img
              src={experience.image}
              alt={`${experience.company} highlight`}
              width={650}
              height={300}
              loading="lazy"
              className="rounded-md object-cover object-top shadow-xl"
            />
          </div>
        )}

        {experience.company === 'Hashnode' ? (
          <span className="text-base text-zinc-500 dark:text-zinc-400">
            Check out my CV for more details.
          </span>
        ) : null}
      </div>
    </article>
  );
};

export const ExperienceList = () => {
  return (
    <Tabs defaultValue="experience" className="w-full max-w-[1000px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>

      <TabsContent value="experience">
        {experienceList.map((experience) => (
          <div className="flex flex-col items-start" key={experience.company}>
            <ExperienceCard experience={experience} />
            <Button
              asLink
              href="/kieran-roberts-CV.pdf"
              target="_blank"
              download
              endIcon={
                <span className="block text-l dark:text-d w-5 h-5">
                  <DownloadCircleSVG />
                </span>
              }
            >
              Download CV
            </Button>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="education">
        {education.map((education) => (
          <div className="flex flex-col items-end" key={education.company}>
            <ExperienceCard experience={education} />
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};
