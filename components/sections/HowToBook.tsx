import { howToBook } from "@/data/site";
import { slug } from "@/lib/slug";

// "How to book a boat trip in Gokarna" as numbered steps (a real <ol>), shown above the booking form.
export function HowToBook() {
  const id = slug(howToBook.title);
  return (
    <div data-reveal className="mb-10">
      <h3 id={id} className="text-h3">
        {howToBook.title}
      </h3>
      <p className="mt-2 max-w-3xl text-muted">{howToBook.intro}</p>
      <ol aria-labelledby={id} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {howToBook.steps.map((step, index) => (
          <li key={step} className="flex gap-3 rounded-card bg-white p-4 ring-1 ring-line">
            <span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-semibold text-white">
              {index + 1}
            </span>
            <span className="pt-1">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
