export default function Footer() {
  return (
    <>
      <footer
        className={`bg-primary dark:bg-primary-dark border-tertiary dark:border-tertiary-dark z-30 flex w-screen flex-col items-center justify-center gap-3 border-t-2 px-5 py-25 transition lg:px-45`}
      >
        <p className="text-heading dark:text-heading-dark text-center text-xl font-semibold">
          Bunvia plays an indispensable role in everyday life.
        </p>
        <p className="text-subtext dark:text-subtext-dark text-center">
          © Bunvia 2025
        </p>
      </footer>
    </>
  );
}
