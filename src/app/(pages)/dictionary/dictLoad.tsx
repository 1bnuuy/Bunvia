import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <section className="dark:bg-primary-dark grid-background bg-primary h-dvh w-screen overflow-hidden pt-[80px] transition lg:px-30">
      <div className="relative left-1/2 flex h-full max-w-[1440px] -translate-x-1/2 flex-col items-center justify-center gap-8 px-4">
        <div className="bg-secondary dark:bg-secondary-dark border-accent dark:border-accent-dark flex w-full max-w-[450px] min-w-[200px] items-center gap-4 rounded-md border-2 p-2.5 text-2xl">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-accent dark:text-accent-dark pointer-events-none ml-1"
          />
          <input
            placeholder="Search..."
            type="text"
            className="placeholder:text-subtext dark:placeholder:text-subtext-dark text-heading dark:text-heading-dark w-full outline-none"
          />

          <button
            aria-label="add"
            className="text-primary active:bg-accent-hovered dark:active:bg-accent-hovered-dark bg-accent dark:bg-accent-dark hover:bg-accent-hovered dark:hover:bg-accent-hovered-dark cursor-pointer rounded-md px-5 text-2xl select-none"
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}
