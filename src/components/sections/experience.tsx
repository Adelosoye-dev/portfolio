import { experience } from "@/data/experience";

/**
 * A timeline: horizontal once there is room for it, stacked before that.
 * Same markup either way — only the axis the border and markers sit on
 * changes, so there is no duplicated list.
 */
export function Experience() {
  return (
    <ol className="flex flex-col gap-8 border-l border-white/10 pl-6 lg:flex-row lg:gap-6 lg:border-t lg:border-l-0 lg:pt-8 lg:pl-0">
      {experience.map((role) => (
        <li
          key={`${role.company}-${role.period}`}
          className="relative lg:flex-1"
        >
          <span
            aria-hidden
            className="bg-accent absolute top-1.5 -left-[1.6875rem] size-2 rounded-full lg:top-[-2.3125rem] lg:left-0"
          />
          <p className="text-muted/70 font-mono text-xs lg:text-sm">
            {role.period}
          </p>
          <p className="mt-2 font-medium lg:text-lg">{role.title}</p>
          <p className="text-muted mt-1 text-sm lg:text-base">{role.company}</p>
        </li>
      ))}
    </ol>
  );
}
